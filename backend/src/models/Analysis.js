const mongoose = require("mongoose");

const analysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    resume: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Resume",
    },
    jobDescription: {
      type: String,
      default: "",
    },

    // ─── Core Scores ──────────────────────────────────────────────
    score: { type: Number, default: 0 },
    contentScore: { type: Number, default: 0 },
    structureScore: { type: Number, default: 0 },
    skillsScore: { type: Number, default: 0 },
    atsScore: { type: Number, default: 0 },

    // ─── Text Summaries ───────────────────────────────────────────
    summary: { type: String, default: "" },
    finalRecommendation: { type: String, default: "" },

    // ─── Array Fields ─────────────────────────────────────────────
    strengths: { type: [String], default: [] },
    improvements: { type: [String], default: [] },
    atsTips: { type: [String], default: [] },
    missingKeywords: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    optimizationSuggestions: { type: [String], default: [] },

    // ─── Enhanced Data ────────────────────────────────────────────
    skillCategories: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    keywordAnalysis: {
      type: [
        {
          keyword: String,
          found: Boolean,
          occurrences: Number,
          importance: String,
          recommendation: String,
        },
      ],
      default: [],
    },
    enhancedBullets: {
      type: [
        {
          original: String,
          improved: String,
        },
      ],
      default: [],
    },
    recruiterFeedback: {
      type: {
        firstImpression: String,
        hiringRecommendation: String,
        interviewReadiness: String,
        overallVerdict: String,
      },
      default: {},
    },

    // ─── Fallback for any extra AI data ───────────────────────────
    results: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  }
);

const Analysis = mongoose.model("Analysis", analysisSchema);

module.exports = Analysis;
