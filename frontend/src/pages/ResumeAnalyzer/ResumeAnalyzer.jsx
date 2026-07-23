import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeResume } from "../../services/resumeService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ResumeScoreTrend from "../../components/ResumeScoreTrend";

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 60%, #f5f0ff 100%)",
    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px 32px",
    background: "rgba(255,255,255,0.85)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(0,0,0,0.06)",
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navLogo: {
    fontSize: "1.25rem",
    fontWeight: 800,
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  navName: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: "#374151",
  },
  logoutBtn: {
    padding: "8px 16px",
    borderRadius: "8px",
    border: "1px solid #e5e7eb",
    background: "white",
    color: "#6b7280",
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.2s",
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "32px 24px",
  },
  pageHeader: {
    marginBottom: "32px",
  },
  pageTitle: {
    fontSize: "1.875rem",
    fontWeight: 800,
    color: "#111827",
    letterSpacing: "-0.5px",
    marginBottom: "8px",
  },
  pageSubtitle: {
    fontSize: "0.95rem",
    color: "#6b7280",
    fontWeight: 400,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "28px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 1px 12px rgba(0,0,0,0.06)",
  },
  cardTitle: {
    fontSize: "1rem",
    fontWeight: 700,
    color: "#111827",
    marginBottom: "6px",
  },
  cardSubtitle: {
    fontSize: "0.8rem",
    color: "#9ca3af",
    marginBottom: "20px",
  },
  // Upload area
  uploadZone: {
    border: "2px dashed #c7d2fe",
    borderRadius: "12px",
    padding: "40px 20px",
    textAlign: "center",
    cursor: "pointer",
    background: "rgba(99,102,241,0.02)",
    transition: "all 0.2s",
  },
  uploadZoneHover: {
    background: "rgba(99,102,241,0.05)",
    borderColor: "#6366f1",
  },
  uploadIcon: {
    width: "60px",
    height: "60px",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    borderRadius: "16px",
    margin: "0 auto 16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
  },
  uploadText: {
    fontWeight: 700,
    color: "#111827",
    fontSize: "0.9rem",
    marginBottom: "4px",
  },
  uploadHint: {
    fontSize: "0.75rem",
    color: "#9ca3af",
    marginBottom: "16px",
  },
  chooseBtn: {
    padding: "10px 28px",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: 700,
    fontSize: "0.875rem",
    cursor: "pointer",
    transition: "all 0.2s",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
  },
  analyzeBtn: {
    marginTop: "16px",
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #6366f1, #3b82f6)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: 700,
    fontSize: "0.9rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.2s",
  },
  analyzeBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  errorMsg: {
    marginTop: "12px",
    padding: "10px 14px",
    background: "#fef2f2",
    borderRadius: "8px",
    color: "#dc2626",
    fontSize: "0.82rem",
    fontWeight: 500,
    border: "1px solid #fecaca",
  },
  successPill: {
    marginTop: "12px",
    padding: "8px 14px",
    background: "#f0fdf4",
    borderRadius: "8px",
    color: "#16a34a",
    fontSize: "0.82rem",
    fontWeight: 600,
    border: "1px solid #bbf7d0",
    display: "flex",
    alignItems: "center",
    gap: "6px",
  },
  // Feedback items
  feedbackItem: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    marginBottom: "10px",
  },
  feedbackIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
    fontWeight: "bold",
  },
  feedbackContent: {
    flex: 1,
  },
  feedbackHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "4px",
  },
  feedbackTitle: {
    fontSize: "0.85rem",
    fontWeight: 700,
    color: "#111827",
  },
  feedbackBadge: {
    padding: "2px 10px",
    borderRadius: "999px",
    fontSize: "0.65rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  feedbackDesc: {
    fontSize: "0.78rem",
    color: "#6b7280",
    lineHeight: 1.5,
  },
  viewReportBtn: {
    marginTop: "16px",
    width: "100%",
    padding: "12px",
    background: "transparent",
    border: "2px solid #6366f1",
    borderRadius: "10px",
    color: "#6366f1",
    fontWeight: 700,
    fontSize: "0.875rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "all 0.2s",
  },
  // Score card
  scoreCircle: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    position: "relative",
    margin: "0 auto 20px",
  },
  scoreNum: {
    fontSize: "2.25rem",
    fontWeight: 800,
    color: "#6366f1",
    lineHeight: 1,
  },
  scoreDenom: {
    fontSize: "0.7rem",
    color: "#9ca3af",
    fontWeight: 600,
  },
  scoreHeading: {
    fontWeight: 700,
    color: "#6366f1",
    fontSize: "0.9rem",
    marginBottom: "4px",
    textAlign: "center",
  },
  scoreDesc: {
    fontSize: "0.78rem",
    color: "#6b7280",
    textAlign: "center",
    lineHeight: 1.5,
    marginBottom: "24px",
  },
  progressRow: {
    marginBottom: "14px",
  },
  progressLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.78rem",
    fontWeight: 600,
    color: "#374151",
    marginBottom: "6px",
  },
  progressBar: {
    height: "8px",
    background: "#e5e7eb",
    borderRadius: "999px",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: "999px",
    background: "linear-gradient(90deg, #6366f1, #3b82f6)",
    transition: "width 0.8s ease",
  },
  // Skills
  skillsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  skillTag: {
    padding: "5px 14px",
    background: "rgba(99,102,241,0.08)",
    borderRadius: "999px",
    color: "#6366f1",
    fontSize: "0.75rem",
    fontWeight: 700,
    border: "1px solid rgba(99,102,241,0.15)",
  },
  // Resume preview
  previewBox: {
    height: "200px",
    background: "#f9fafb",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    overflow: "hidden",
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  previewBtns: {
    display: "flex",
    gap: "10px",
  },
  previewBtn: {
    flex: 1,
    padding: "10px",
    border: "1px solid #e5e7eb",
    borderRadius: "8px",
    background: "white",
    color: "#374151",
    fontSize: "0.78rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "all 0.2s",
  },
  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 999,
    background: "rgba(0,0,0,0.4)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px",
  },
  modalCard: {
    background: "white",
    borderRadius: "16px",
    padding: "28px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
};

// ─── Alert Modal ───────────────────────────────────────────────────────────────
function AlertModal({ message, onClose }) {
  useEffect(() => {
    const fn = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div style={styles.modalOverlay} onClick={onClose}>
      <div style={styles.modalCard} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#111827" }}>⚠️ Action Required</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "18px", color: "#9ca3af" }}>✕</button>
        </div>
        <p style={{ fontSize: "0.875rem", color: "#6b7280", marginBottom: "24px", lineHeight: 1.6 }}>{message}</p>
        <div style={{ textAlign: "right" }}>
          <button onClick={onClose} style={{ ...styles.analyzeBtn, width: "auto", padding: "10px 24px", marginTop: 0 }}>
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Spinner ──────────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <span style={{
      display: "inline-block",
      width: "16px",
      height: "16px",
      border: "2px solid rgba(255,255,255,0.4)",
      borderTopColor: "white",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
    }} />
  );
}

// ─── Score Circle ─────────────────────────────────────────────────────────────
function ScoreCircle({ score }) {
  const pct = score ?? 0;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = circ - (pct / 100) * circ;
  return (
    <div style={{ position: "relative", width: "130px", height: "130px", margin: "0 auto 16px" }}>
      <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="65" cy="65" r={r} fill="none" stroke="#e5e7eb" strokeWidth="10" />
        <circle
          cx="65" cy="65" r={r} fill="none"
          stroke="url(#grad)" strokeWidth="10"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={styles.scoreNum}>{pct}</span>
        <span style={styles.scoreDenom}>/100</span>
      </div>
    </div>
  );
}

// ─── ResumeAnalyzer ───────────────────────────────────────────────────────────
function ResumeAnalyzer() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [isSmall, setIsSmall] = useState(window.innerWidth < 900);

  useEffect(() => {
    const fn = () => setIsSmall(window.innerWidth < 900);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  const handleFile = (f) => {
    if (f && f.type === "application/pdf") {
      setFile(f);
      setPreviewUrl(URL.createObjectURL(f));
      setError(null);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleFileChange = (e) => handleFile(e.target.files[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleUpload = async (e) => {
    if (e) e.stopPropagation();
    if (!file) { setError("Please select a resume first."); return; }
    setLoading(true);
    setError(null);
    const formData = new FormData();
    formData.append("resume", file);
    try {
      const response = await analyzeResume(formData);
      if (response.success) {
        setAnalysis(response.analysis);
        toast.success("Resume analyzed successfully!");
      } else {
        setError(response.message || "Failed to analyze resume.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getHeading = (s) => {
    if (s >= 90) return "Excellent! 🎉";
    if (s >= 75) return "Great Job! 👍";
    if (s >= 60) return "Good Progress! 📈";
    return "Needs Work 🔧";
  };

  const feedbackItems = [
    {
      emoji: "✅", label: "Strengths", badge: "Good",
      badgeColor: "#16a34a", badgeBg: "#f0fdf4",
      iconBg: "#f0fdf4", iconColor: "#16a34a",
      desc: analysis?.strengths?.length > 0 ? analysis.strengths.join(" • ") : (analysis ? "None identified." : "Upload a resume to see strengths."),
    },
    {
      emoji: "⚠️", label: "Improvements", badge: "Moderate",
      badgeColor: "#d97706", badgeBg: "#fffbeb",
      iconBg: "#fffbeb", iconColor: "#d97706",
      desc: analysis?.improvements?.length > 0 ? analysis.improvements.join(" • ") : (analysis ? "None identified." : "Upload a resume to see improvements."),
    },
    {
      emoji: "ℹ️", label: "ATS Tips", badge: "Important",
      badgeColor: "#2563eb", badgeBg: "#eff6ff",
      iconBg: "#eff6ff", iconColor: "#2563eb",
      desc: analysis?.atsTips?.length > 0 ? analysis.atsTips.join(" • ") : (analysis ? "None identified." : "Upload a resume to see ATS tips."),
    },
    {
      emoji: "💡", label: "Missing Keywords", badge: analysis?.missingKeywords ? `${analysis.missingKeywords.length} found` : "0 found",
      badgeColor: "#6366f1", badgeBg: "#f5f3ff",
      iconBg: "#f5f3ff", iconColor: "#6366f1",
      desc: analysis?.missingKeywords?.length > 0 ? `Consider adding: ${analysis.missingKeywords.join(", ")}` : (analysis ? "No missing keywords." : "Upload a resume to check keywords."),
    },
  ];

  const progressItems = [
    { label: "Content", value: analysis?.contentScore ?? 0 },
    { label: "Structure", value: analysis?.structureScore ?? 0 },
    { label: "Skills", value: analysis?.skillsScore ?? 0 },
    { label: "ATS Optimization", value: analysis?.atsScore ?? 0 },
  ];

  const skills = (() => {
    if (!analysis) return ["Upload resume to see skills"];
    if (!analysis.skills || analysis.skills.length === 0) return ["None detected"];
    if (Array.isArray(analysis.skills)) return analysis.skills;
    return String(analysis.skills).split(",").map(s => s.trim()).filter(Boolean);
  })();

  const gridStyle = {
    ...styles.grid,
    gridTemplateColumns: isSmall ? "1fr" : "7fr 5fr",
  };

  return (
    <div style={styles.page}>
      {/* Inject keyframes */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .upload-zone:hover { background: rgba(99,102,241,0.05) !important; border-color: #6366f1 !important; }
        .analyze-btn:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(99,102,241,0.35); }
        .view-report-btn:hover { background: rgba(99,102,241,0.06) !important; }
        .logout-btn:hover { background: #f9fafb !important; color: #374151 !important; }
        .preview-btn:hover:not(:disabled) { background: #f9fafb !important; border-color: #d1d5db !important; }
        .preview-btn:disabled { opacity: 0.4; cursor: not-allowed; }
      `}</style>

      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLogo}>ResumeIQ ✦</div>
        <div style={styles.navRight}>
          {user && <span style={styles.navName}>👋 {user.fullName || user.name}</span>}
          <button className="logout-btn" onClick={logout} style={styles.logoutBtn}>Log out</button>
        </div>
      </nav>

      {/* Main Content */}
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitle}>📄 Resume Analyzer</h1>
          <p style={styles.pageSubtitle}>Get AI-powered feedback to improve your resume and increase your chances of getting shortlisted.</p>
        </div>

        {/* Grid */}
        <div style={gridStyle}>
          {/* ── LEFT COLUMN ── */}
          <div style={styles.leftCol}>
            {/* Upload Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Upload Your Resume</h2>
              <p style={styles.cardSubtitle}>PDF format only • Max 5MB</p>

              <div
                className="upload-zone"
                style={{
                  ...styles.uploadZone,
                  borderColor: dragging ? "#6366f1" : "#c7d2fe",
                  background: dragging ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.02)",
                }}
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
              >
                <input type="file" accept="application/pdf" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
                <div style={styles.uploadIcon}>
                  <span style={{ fontSize: "24px" }}>☁️</span>
                </div>
                <p style={styles.uploadText}>{file ? file.name : "Drag & drop or click to upload"}</p>
                <p style={styles.uploadHint}>Supports PDF files up to 5MB</p>
                <button style={styles.chooseBtn} onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}>
                  {file ? "📂 Change File" : "📂 Choose File"}
                </button>
              </div>

              {error && <div style={styles.errorMsg}>❌ {error}</div>}

              {file && !error && (
                <div style={styles.successPill}>
                  ✅ <span>{file.name} selected</span>
                </div>
              )}

              {file && (
                <button
                  className="analyze-btn"
                  style={{ ...styles.analyzeBtn, ...(loading ? styles.analyzeBtnDisabled : {}) }}
                  onClick={handleUpload}
                  disabled={loading}
                >
                  {loading ? <><Spinner /> Analyzing your resume...</> : "🔍 Analyze Resume"}
                </button>
              )}
            </div>

            {/* Detailed Feedback Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Detailed Feedback</h2>
              <p style={styles.cardSubtitle}>AI-generated insights from your resume</p>

              {feedbackItems.map((item, i) => (
                <div key={i} style={styles.feedbackItem}>
                  <div style={{ ...styles.feedbackIcon, background: item.iconBg, color: item.iconColor }}>
                    {item.emoji}
                  </div>
                  <div style={styles.feedbackContent}>
                    <div style={styles.feedbackHeader}>
                      <span style={styles.feedbackTitle}>{item.label}</span>
                      <span style={{ ...styles.feedbackBadge, background: item.badgeBg, color: item.badgeColor }}>
                        {item.badge}
                      </span>
                    </div>
                    <p style={styles.feedbackDesc}>{item.desc}</p>
                  </div>
                </div>
              ))}

              <button
                className="view-report-btn"
                style={styles.viewReportBtn}
                onClick={() => {
                  if (analysis) {
                    navigate("/resume/report", { state: { analysis } });
                  } else {
                    setAlertMessage("Please upload and analyze a resume first to view the full report.");
                    setShowAlert(true);
                  }
                }}
              >
                View Full Analysis Report →
              </button>
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={styles.rightCol}>
            {/* Score Card */}
            <div style={styles.card}>
              <h2 style={{ ...styles.cardTitle, marginBottom: "4px" }}>Resume Score</h2>
              <p style={styles.cardSubtitle}>Overall quality assessment</p>

              <ScoreCircle score={analysis?.score} />

              <p style={styles.scoreHeading}>{analysis ? getHeading(analysis.score) : "Not Analyzed Yet"}</p>
              <p style={styles.scoreDesc}>
                {analysis
                  ? "Your resume has been analyzed. Review the feedback to improve your score."
                  : "Upload a resume to see your score and get detailed feedback."}
              </p>

              {progressItems.map(({ label, value }) => (
                <div key={label} style={styles.progressRow}>
                  <div style={styles.progressLabel}>
                    <span>{label}</span>
                    <span style={{ color: "#9ca3af" }}>{value}/100</span>
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progressFill, width: `${value}%` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Preview Card */}
            <div style={styles.card}>
              <h2 style={{ ...styles.cardTitle, marginBottom: "16px" }}>Resume Preview</h2>
              <div style={styles.previewBox}>
                {previewUrl ? (
                  <iframe
                    src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    title="Resume Preview"
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                ) : (
                  <div style={{ textAlign: "center", color: "#d1d5db" }}>
                    <div style={{ fontSize: "48px", marginBottom: "8px" }}>📄</div>
                    <p style={{ fontSize: "0.8rem", fontWeight: 600 }}>No file selected</p>
                  </div>
                )}
              </div>
              <div style={styles.previewBtns}>
                <button
                  className="preview-btn"
                  style={styles.previewBtn}
                  disabled={!previewUrl}
                  onClick={() => previewUrl && window.open(previewUrl, "_blank")}
                >
                  🔗 View Full
                </button>
                <button
                  className="preview-btn"
                  style={styles.previewBtn}
                  disabled={!previewUrl}
                  onClick={() => {
                    if (previewUrl) {
                      const a = document.createElement("a");
                      a.href = previewUrl;
                      a.download = file?.name || "resume.pdf";
                      a.click();
                    }
                  }}
                >
                  ⬇️ Download
                </button>
              </div>
            </div>

            {/* Skills Card */}
            <div style={styles.card}>
              <h2 style={{ ...styles.cardTitle, marginBottom: "16px" }}>Top Skills Detected</h2>
              <div style={styles.skillsWrap}>
                {skills.map((skill, i) => (
                  <span key={i} style={styles.skillTag}>{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Resume Score Trend */}
        <ResumeScoreTrend />
      </div>

      {showAlert && (
        <AlertModal message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
    </div>
  );
}

export default ResumeAnalyzer;
