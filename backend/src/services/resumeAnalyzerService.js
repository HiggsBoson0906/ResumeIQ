const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Only use models confirmed to work with this API key
const MODELS = [
  "gemini-2.5-flash-lite",
  "gemini-2.5-flash",
];

const PROMPT_TEMPLATE = (resumeText) => `
You are an expert ATS Resume Analyzer and career coach.

Analyze the following resume carefully and return ONLY valid JSON — no markdown, no explanation, no code fences.

The JSON must follow this exact schema:
{
  "score": 75,
  "summary": "Executive summary of the resume evaluation covering quality, readability, and ATS compatibility",
  "contentScore": 70,
  "structureScore": 80,
  "skillsScore": 75,
  "atsScore": 65,
  "strengths": ["Strength 1", "Strength 2", "Strength 3"],
  "improvements": ["Improvement 1", "Improvement 2", "Improvement 3"],
  "atsTips": ["Tip 1", "Tip 2", "Tip 3"],
  "missingKeywords": ["keyword1", "keyword2"],
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "finalRecommendation": "Recruiter recommendation advice paragraph",
  "optimizationSuggestions": [
    "Detailed suggestion 1 explaining how to improve a specific section",
    "Detailed suggestion 2",
    "Detailed suggestion 3"
  ],
  "skillCategories": {
    "Programming Languages": ["JavaScript", "Python"],
    "Frameworks": ["React", "Node.js"],
    "Databases": ["MongoDB", "PostgreSQL"],
    "Cloud & DevOps": ["AWS", "Docker"],
    "Tools": ["Git", "VS Code"],
    "Soft Skills": ["Leadership", "Communication"]
  },
  "keywordAnalysis": [
    { "keyword": "React", "found": true, "occurrences": 3, "importance": "High", "recommendation": "Well represented" },
    { "keyword": "Docker", "found": false, "occurrences": 0, "importance": "Medium", "recommendation": "Consider adding if relevant" }
  ],
  "enhancedBullets": [
    { "original": "Worked on web application", "improved": "Architected and deployed a full-stack web application serving 10K+ daily users using React and Node.js" },
    { "original": "Managed team", "improved": "Led a cross-functional team of 5 engineers, delivering 3 product releases ahead of schedule" }
  ],
  "recruiterFeedback": {
    "firstImpression": "The resume presents a strong technical profile...",
    "hiringRecommendation": "Recommend for technical interview...",
    "interviewReadiness": "Candidate appears well-prepared...",
    "overallVerdict": "Strong candidate with room for improvement in..."
  }
}

Rules:
- All scores must be numbers between 0 and 100.
- "skillCategories" must categorize ALL detected skills into the categories shown above. Only include categories that have skills.
- "keywordAnalysis" must include 8-15 important industry keywords, whether found or not.
- "enhancedBullets" must pick 2-4 weak bullet points from the resume and rewrite them with quantified achievements.
- "optimizationSuggestions" must provide 3-5 actionable, specific suggestions.
- "recruiterFeedback" must contain all 4 fields with detailed paragraphs.
- Return ONLY the JSON object. No explanation text before or after.

Resume:

${resumeText}
`;

const analyzeResumeWithAI = async (resumeText) => {
  let lastError;

  for (const model of MODELS) {
    try {
      console.log(`Trying model: ${model}`);
      const response = await ai.models.generateContent({
        model,
        contents: PROMPT_TEMPLATE(resumeText),
      });
      const text = response.text;
      if (!text) throw new Error("Empty response from AI");
      console.log(`Success with model: ${model}`);
      return text;
    } catch (err) {
      const msg = err.message || "";
      console.warn(`Model ${model} failed: ${msg.substring(0, 120)}`);
      lastError = err;

      // Only retry next model for transient/availability errors
      const isTransient =
        msg.includes("503") ||
        msg.includes("UNAVAILABLE") ||
        msg.includes("overloaded") ||
        msg.includes("500");

      if (!isTransient) {
        // For quota/rate limit errors, still try next model
        const isRateLimit =
          msg.includes("429") ||
          msg.includes("quota") ||
          msg.includes("RESOURCE_EXHAUSTED") ||
          msg.includes("rate");

        if (!isRateLimit) throw err; // only hard-fail on auth/parse errors
      }
    }
  }

  throw lastError;
};

module.exports = {
  analyzeResumeWithAI,
};
