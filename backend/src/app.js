const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

// CORS - allow frontend origin
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// Health Check
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ResumeIQ API is running",
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

module.exports = app;
