const express = require("express");
const router = express.Router();

const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const { analyzeResume, getAnalysisById, getResumeHistory } = require("../controllers/resumeController");

router.post("/analyze", protect, upload.single("resume"), analyzeResume);
router.get("/history", protect, getResumeHistory);
router.get("/analysis/:id", protect, getAnalysisById);

module.exports = router;
