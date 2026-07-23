const pdfParse = require("pdf-parse");
const { analyzeResumeWithAI } = require("../services/resumeAnalyzerService");
const Resume = require("../models/Resume");
const Analysis = require("../models/Analysis");

const analyzeResume = async (req, res) => {
  try {
    // Check if file exists
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF file",
      });
    }

    // Extract text from PDF using pdf-parse v1 API
    let resumeText = "";
    try {
      const pdfData = await pdfParse(req.file.buffer);
      resumeText = pdfData.text || "";
    } catch (pdfErr) {
      console.error("PDF parse error:", pdfErr.message);
      return res.status(400).json({
        success: false,
        message: "Could not read the PDF. Please ensure it is a valid, text-based PDF.",
      });
    }

    if (!resumeText || resumeText.trim().length < 20) {
      return res.status(400).json({
        success: false,
        message: "The PDF appears to be empty or image-only. Please use a text-based PDF.",
      });
    }

    // Call AI service with retry logic
    const aiResponse = await analyzeResumeWithAI(resumeText);

    // Clean and parse JSON
    const cleanedResponse = aiResponse
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let analysis;
    try {
      analysis = JSON.parse(cleanedResponse);
    } catch (parseErr) {
      console.error("AI returned non-JSON:", cleanedResponse.substring(0, 200));
      return res.status(500).json({
        success: false,
        message: "AI returned an unexpected format. Please try again.",
      });
    }

    // Save to Resume model (for score trend chart)
    const savedResume = await Resume.create({
      user: req.user._id,
      score: analysis.score || 0,
      contentScore: analysis.contentScore || 0,
      structureScore: analysis.structureScore || 0,
      skillsScore: analysis.skillsScore || 0,
      atsScore: analysis.atsScore || 0,
    });

    // Save full analysis to Analysis model
    const savedAnalysis = await Analysis.create({
      user: req.user._id,
      resume: savedResume._id,
      score: analysis.score || 0,
      contentScore: analysis.contentScore || 0,
      structureScore: analysis.structureScore || 0,
      skillsScore: analysis.skillsScore || 0,
      atsScore: analysis.atsScore || 0,
      summary: analysis.summary || "",
      finalRecommendation: analysis.finalRecommendation || "",
      strengths: analysis.strengths || [],
      improvements: analysis.improvements || [],
      atsTips: analysis.atsTips || [],
      missingKeywords: analysis.missingKeywords || [],
      skills: analysis.skills || [],
      optimizationSuggestions: analysis.optimizationSuggestions || [],
      skillCategories: analysis.skillCategories || {},
      keywordAnalysis: analysis.keywordAnalysis || [],
      enhancedBullets: analysis.enhancedBullets || [],
      recruiterFeedback: analysis.recruiterFeedback || {},
      results: analysis,
    });

    res.status(200).json({
      success: true,
      analysis,
      analysisId: savedAnalysis._id,
    });
  } catch (error) {
    console.error("analyzeResume error:", error.message);
    const msg = error.message || "";
    let message = "An error occurred while analyzing the resume. Please try again.";
    if (msg.includes("UNAVAILABLE") || msg.includes("503") || msg.includes("overloaded")) {
      message = "The AI service is temporarily overloaded. Please wait a moment and try again.";
    } else if (msg.includes("RESOURCE_EXHAUSTED") || msg.includes("429") || msg.includes("quota")) {
      message = "AI service quota exceeded. Please try again in a few minutes.";
    } else if (msg.includes("401") || msg.includes("403") || msg.includes("PERMISSION_DENIED") || msg.includes("API_KEY")) {
      message = "AI service authentication failed. Please check the API key configuration.";
    }
    res.status(500).json({
      success: false,
      message,
    });
  }
};

const getAnalysisById = async (req, res) => {
  try {
    const analysis = await Analysis.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!analysis) {
      return res.status(404).json({
        success: false,
        message: "Analysis not found.",
      });
    }

    res.status(200).json({
      success: true,
      analysis,
    });
  } catch (error) {
    console.error("getAnalysisById error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch analysis.",
    });
  }
};

const getResumeHistory = async (req, res) => {
  try {
    // Sort ascending (oldest first) so the chart goes left to right over time
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: 1 });
    
    let totalScore = 0;
    const history = resumes.map(r => {
      totalScore += r.score || 0;
      return {
        id: r._id,
        score: r.score || 0,
        createdAt: r.createdAt
      };
    });

    const averageScore = history.length > 0 ? Math.round(totalScore / history.length) : 0;

    res.status(200).json({
      success: true,
      history,
      averageScore
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeResume,
  getAnalysisById,
  getResumeHistory,
};
