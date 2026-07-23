import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function ScanSimulator() {
  const [step, setStep] = useState(0); // 0: Idle/Start, 1: Scanning, 2: Insights, 3: Completed
  const [score, setScore] = useState(35);
  const [bulletText, setBulletText] = useState("Original: Managed server configurations and deployments.");

  // Loop the simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  // Update score and bullet text based on current step
  useEffect(() => {
    if (step === 0) {
      setScore(35);
      setBulletText("Original: Managed server configurations and deployments.");
    } else if (step === 1) {
      // Animate score from 35 to 84
      let start = 35;
      const end = 84;
      const duration = 2000;
      const intervalTime = 30;
      const steps = duration / intervalTime;
      const increment = (end - start) / steps;

      const scoreTimer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setScore(end);
          clearInterval(scoreTimer);
        } else {
          setScore(Math.floor(start));
        }
      }, intervalTime);

      return () => clearInterval(scoreTimer);
    } else if (step === 2) {
      setScore(84);
      setBulletText("Optimizing...");
      const t = setTimeout(() => {
        setBulletText("AI Optimized: Orchestrated 15+ AWS cloud environments using Terraform, reducing deployment cycles by 40%.");
      }, 1000);
      return () => clearTimeout(t);
    } else if (step === 3) {
      setScore(88);
    }
  }, [step]);

  // SVG circular path for score ring
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div style={{
      maxWidth: "1080px",
      width: "100%",
      background: "rgba(255, 255, 255, 0.7)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.4)",
      borderRadius: "24px",
      padding: "24px",
      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.04), inset 0 1px 0 rgba(255, 255, 255, 0.6)",
      marginTop: "40px",
      display: "grid",
      gridTemplateColumns: "1.2fr 1fr",
      gap: "24px",
      textAlign: "left",
      overflow: "hidden",
      position: "relative",
    }} className="scan-simulator">
      <style>{`
        @media (max-width: 640px) {
          .scan-simulator {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 16px !important;
          }
        }
      `}</style>

      {/* Left Column: Mock Resume Scanner */}
      <div style={{
        background: "#ffffff",
        border: "1px solid #e2e8f0",
        borderRadius: "16px",
        padding: "20px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.01)",
        overflow: "hidden"
      }}>
        {/* Scanning laser line */}
        {step === 1 && (
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, transparent, #6366f1, #3b82f6, transparent)",
              boxShadow: "0 0 12px #6366f1, 0 0 4px #3b82f6",
              zIndex: 10,
              pointerEvents: "none"
            }}
          />
        )}

        <div style={{ display: "flex", alignItems: "center", gap: "10px", borderBottom: "1px solid #f1f5f9", paddingBottom: "10px" }}>
          <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px" }}>👤</div>
          <div>
            <div style={{ width: "90px", height: "10px", background: "#334155", borderRadius: "4px", marginBottom: "4px" }} />
            <div style={{ width: "130px", height: "6px", background: "#94a3b8", borderRadius: "3px" }} />
          </div>
        </div>

        {/* Experience sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", position: "relative" }}>
          <div style={{ width: "80px", height: "8px", background: "#cbd5e1", borderRadius: "4px", fontWeight: "bold" }} />
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1" }} />
            <div style={{ width: "80%", height: "6px", background: "#e2e8f0", borderRadius: "3px" }} />
          </div>
          <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1" }} />
            <div style={{ width: "90%", height: "6px", background: "#e2e8f0", borderRadius: "3px" }} />
          </div>

          {/* Underlined/Highlighted keyword gap */}
          <div style={{ display: "flex", gap: "6px", alignItems: "flex-start", marginTop: "4px" }}>
            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#6366f1", marginTop: "5px" }} />
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: "10px", color: "#64748b", lineHeight: 1.4 }}>
                Responsible for managing infrastructure. Missing:{" "}
                <motion.span
                  animate={{
                    background: step >= 2 ? "rgba(220, 38, 38, 0.15)" : "transparent",
                    color: step >= 2 ? "#dc2626" : "#64748b",
                    padding: step >= 2 ? "1px 4px" : "0px",
                    borderRadius: "3px"
                  }}
                  style={{ fontWeight: "600", transition: "all 0.3s" }}
                >
                  Terraform
                </motion.span>
                ,{" "}
                <motion.span
                  animate={{
                    background: step >= 2 ? "rgba(220, 38, 38, 0.15)" : "transparent",
                    color: step >= 2 ? "#dc2626" : "#64748b",
                    padding: step >= 2 ? "1px 4px" : "0px",
                    borderRadius: "3px"
                  }}
                  style={{ fontWeight: "600", transition: "all 0.3s" }}
                >
                  Kubernetes
                </motion.span>
              </span>
            </div>
          </div>
        </div>

        {/* Live Bullet Optimization box */}
        <div style={{
          marginTop: "auto",
          background: "#fafafa",
          border: "1px dashed #cbd5e1",
          borderRadius: "8px",
          padding: "10px",
          fontSize: "0.75rem",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
          minHeight: "72px"
        }}>
          <div style={{ fontWeight: "bold", fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "#6366f1" }}>Bullet Optimizer</div>
          <AnimatePresence mode="wait">
            <motion.p
              key={bulletText}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              style={{
                margin: 0,
                color: bulletText.startsWith("AI Optimized") ? "#16a34a" : bulletText.startsWith("Optimizing") ? "#d97706" : "#475569",
                fontWeight: bulletText.startsWith("AI Optimized") ? "600" : "500",
                lineHeight: 1.4
              }}
            >
              {bulletText}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>

      {/* Right Column: Scan Stats Panel */}
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "4px 0" }}>
        {/* Status Badge */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px", padding: "5px 12px", borderRadius: "999px", background: step === 0 ? "#f1f5f9" : step === 1 ? "rgba(59, 130, 246, 0.1)" : "rgba(22, 163, 74, 0.1)", border: "1px solid rgba(0,0,0,0.03)" }}>
            <span style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: step === 0 ? "#64748b" : step === 1 ? "#3b82f6" : "#16a34a",
              display: "inline-block",
              boxShadow: step === 1 ? "0 0 8px #3b82f6" : "none"
            }} />
            <span style={{ fontSize: "0.68rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", color: step === 0 ? "#64748b" : step === 1 ? "#3b82f6" : "#16a34a" }}>
              {step === 0 ? "Ready to Scan" : step === 1 ? "Analyzing Resume..." : step === 2 ? "Generating Insights" : "Analysis Completed"}
            </span>
          </div>

          <h3 style={{ fontSize: "1.15rem", fontWeight: "800", color: "#0f172a", marginTop: "14px", marginBottom: "4px", letterSpacing: "-0.3px" }}>ATS Evaluation</h3>
          <p style={{ fontSize: "0.78rem", color: "#64748b", margin: 0, lineHeight: 1.4 }}>Simulating real-time parsing, scoring, and keyword check.</p>
        </div>

        {/* ATS Score Ring Center */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px", margin: "16px 0" }}>
          <div style={{ position: "relative", width: "90px", height: "90px" }}>
            <svg width="90" height="90" viewBox="0 0 90 90" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="45" cy="45" r={radius} fill="none" stroke="#f1f5f9" strokeWidth="6" />
              <motion.circle cx="45" cy="45" r={radius} fill="none"
                stroke={score >= 80 ? "#16a34a" : score >= 60 ? "#d97706" : "#dc2626"}
                strokeWidth="6"
                strokeDasharray={circumference}
                animate={{ strokeDashoffset }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "1.45rem", fontWeight: "800", color: "#0f172a", letterSpacing: "-1px", lineHeight: 1 }}>{score}</span>
              <span style={{ fontSize: "0.6rem", color: "#94a3b8", fontWeight: "600" }}>Score</span>
            </div>
          </div>

          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: "bold", color: "#334155" }}>Compatibility Rate</div>
            <div style={{ fontSize: "0.72rem", color: score >= 80 ? "#16a34a" : "#dc2626", fontWeight: "600", marginTop: "2px" }}>
              {score >= 80 ? "✓ Interview Ready" : "✗ Needs Optimisation"}
            </div>
          </div>
        </div>

        {/* Live Detected Keywords */}
        <div>
          <div style={{ fontSize: "0.68rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px", color: "#94a3b8", marginBottom: "8px" }}>Detected Keywords</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            <span style={{ padding: "4px 8px", background: "rgba(22, 163, 74, 0.08)", color: "#16a34a", border: "1px solid rgba(22,163,74,0.15)", borderRadius: "6px", fontSize: "0.68rem", fontWeight: "600" }}>Python</span>
            <span style={{ padding: "4px 8px", background: "rgba(22, 163, 74, 0.08)", color: "#16a34a", border: "1px solid rgba(22,163,74,0.15)", borderRadius: "6px", fontSize: "0.68rem", fontWeight: "600" }}>AWS</span>
            <AnimatePresence>
              {step >= 2 && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  style={{ padding: "4px 8px", background: "rgba(99, 102, 241, 0.08)", color: "#6366f1", border: "1px solid rgba(99,102,241,0.15)", borderRadius: "6px", fontSize: "0.68rem", fontWeight: "600" }}
                >
                  Terraform
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScanSimulator;
