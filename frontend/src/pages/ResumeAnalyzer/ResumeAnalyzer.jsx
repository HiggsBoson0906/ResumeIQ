import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { analyzeResume } from "../../services/resumeService";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ResumeScoreTrend from "../../components/ResumeScoreTrend";

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const T = {
  // Colors
  indigo: "#6366f1",
  blue: "#3b82f6",
  green: "#16a34a",
  amber: "#d97706",
  red: "#dc2626",
  slate900: "#0f172a",
  slate800: "#1e293b",
  slate700: "#334155",
  slate500: "#64748b",
  slate400: "#94a3b8",
  slate200: "#e2e8f0",
  slate100: "#f1f5f9",
  slate50: "#f8fafc",
  white: "#ffffff",
  // Gradients
  gradPrimary: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
  gradPage: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 55%, #f5f0ff 100%)",
  // Shadows
  shadowSm: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  shadowMd: "0 4px 16px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)",
  shadowLg: "0 20px 60px rgba(0,0,0,0.18)",
  // Border radius
  radius2xl: "20px",
  radiusXl: "14px",
  radiusLg: "10px",
  radiusMd: "8px",
  radiusFull: "9999px",
};

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = {
  page: {
    minHeight: "100vh",
    background: T.gradPage,
    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    color: T.slate800,
  },
  navbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 40px",
    height: "64px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(16px)",
    borderBottom: `1px solid ${T.slate200}`,
    position: "sticky",
    top: 0,
    zIndex: 100,
  },
  navLogo: {
    fontSize: "1.2rem",
    fontWeight: 800,
    background: T.gradPrimary,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    letterSpacing: "-0.5px",
  },
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  navName: {
    fontSize: "0.875rem",
    fontWeight: 600,
    color: T.slate700,
  },
  logoutBtn: {
    padding: "8px 16px",
    borderRadius: T.radiusLg,
    border: `1px solid ${T.slate200}`,
    background: T.white,
    color: T.slate500,
    fontSize: "0.8rem",
    fontWeight: 600,
    cursor: "pointer",
    transition: "all 0.15s",
  },
  container: {
    maxWidth: "1400px",
    margin: "0 auto",
    // Base padding overridden by media queries in CSS
  },
  // Page header
  pageHeader: {
    marginBottom: "24px",
    paddingBottom: "20px",
    borderBottom: `1px solid ${T.slate200}`,
  },
  pageBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 12px",
    borderRadius: T.radiusFull,
    background: "rgba(99,102,241,0.08)",
    border: "1px solid rgba(99,102,241,0.2)",
    color: T.indigo,
    fontSize: "0.72rem",
    fontWeight: 700,
    letterSpacing: "0.5px",
    textTransform: "uppercase",
    marginBottom: "10px",
  },
  pageTitle: {
    fontSize: "2.25rem",
    fontWeight: 800,
    color: T.slate900,
    letterSpacing: "-0.75px",
    lineHeight: 1.15,
    marginBottom: "8px",
  },
  pageSubtitle: {
    fontSize: "1.05rem",
    color: T.slate500,
    fontWeight: 400,
    lineHeight: 1.6,
    maxWidth: "520px",
  },
  // Grid layout
  grid: {
    display: "grid",
    gap: "20px",
  },
  leftCol: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  rightCol: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  // Card
  card: {
    background: T.white,
    borderRadius: T.radius2xl,
    padding: "20px 24px",
    border: `1px solid ${T.slate200}`,
    boxShadow: T.shadowSm,
    transition: "box-shadow 0.2s",
  },
  cardHeader: {
    marginBottom: "4px",
  },
  cardTitle: {
    fontSize: "1.125rem",
    fontWeight: 700,
    color: T.slate900,
    marginBottom: "4px",
    letterSpacing: "-0.2px",
  },
  cardSubtitle: {
    fontSize: "0.875rem",
    color: T.slate400,
    fontWeight: 400,
    marginBottom: "16px",
    lineHeight: 1.4,
  },
  // Upload zone
  uploadZone: {
    border: "2px dashed #c7d2fe",
    borderRadius: T.radiusXl,
    padding: "28px 20px",
    textAlign: "center",
    cursor: "pointer",
    background: "rgba(99,102,241,0.02)",
    transition: "all 0.2s",
  },
  uploadIcon: {
    width: "48px",
    height: "48px",
    background: T.gradPrimary,
    borderRadius: "14px",
    margin: "0 auto 12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    boxShadow: "0 4px 12px rgba(99,102,241,0.2)",
  },
  uploadText: {
    fontWeight: 700,
    color: T.slate800,
    fontSize: "1.05rem",
    marginBottom: "4px",
    letterSpacing: "-0.2px",
  },
  uploadHint: {
    fontSize: "0.85rem",
    color: T.slate400,
    marginBottom: "14px",
    lineHeight: 1.4,
  },
  chooseBtn: {
    padding: "9px 24px",
    background: T.gradPrimary,
    color: T.white,
    border: "none",
    borderRadius: T.radiusLg,
    fontWeight: 700,
    fontSize: "0.875rem",
    cursor: "pointer",
    transition: "all 0.15s",
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    boxShadow: "0 2px 6px rgba(99,102,241,0.15)",
  },
  analyzeBtn: {
    marginTop: "16px",
    width: "100%",
    padding: "12px",
    height: "48px",
    background: T.gradPrimary,
    color: T.white,
    border: "none",
    borderRadius: T.radiusXl,
    fontWeight: 700,
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.15s",
    boxShadow: "0 2px 8px rgba(99,102,241,0.2)",
    letterSpacing: "-0.2px",
  },
  analyzeBtnDisabled: {
    opacity: 0.6,
    cursor: "not-allowed",
  },
  errorMsg: {
    marginTop: "12px",
    padding: "10px 14px",
    background: "#fef2f2",
    borderRadius: T.radiusLg,
    color: T.red,
    fontSize: "0.82rem",
    fontWeight: 500,
    border: "1px solid #fecaca",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  successPill: {
    marginTop: "12px",
    padding: "8px 14px",
    background: "#f0fdf4",
    borderRadius: T.radiusLg,
    color: T.green,
    fontSize: "0.82rem",
    fontWeight: 600,
    border: "1px solid #bbf7d0",
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  // Feedback items
  feedbackItem: {
    padding: "12px 14px",
    borderRadius: T.radiusXl,
    border: `1px solid ${T.slate200}`,
    display: "flex",
    gap: "12px",
    alignItems: "flex-start",
    marginBottom: "8px",
    transition: "border-color 0.15s",
  },
  feedbackIcon: {
    width: "36px",
    height: "36px",
    borderRadius: T.radiusLg,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    flexShrink: 0,
  },
  feedbackContent: {
    flex: 1,
    minWidth: 0,
  },
  feedbackHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "4px",
    gap: "8px",
  },
  feedbackTitle: {
    fontSize: "0.95rem",
    fontWeight: 700,
    color: T.slate800,
    letterSpacing: "-0.1px",
  },
  feedbackBadge: {
    padding: "2px 8px",
    borderRadius: T.radiusFull,
    fontSize: "0.68rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    whiteSpace: "nowrap",
  },
  feedbackDesc: {
    fontSize: "0.875rem",
    color: T.slate500,
    lineHeight: 1.5,
  },
  viewReportBtn: {
    marginTop: "16px",
    width: "100%",
    padding: "12px",
    height: "46px",
    background: "transparent",
    border: `2px solid ${T.indigo}`,
    borderRadius: T.radiusXl,
    color: T.indigo,
    fontWeight: 700,
    fontSize: "0.95rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    transition: "all 0.15s",
    letterSpacing: "-0.1px",
  },
  // Score card
  scoreNum: {
    fontSize: "2.5rem",
    fontWeight: 800,
    color: T.indigo,
    lineHeight: 1,
    letterSpacing: "-1px",
  },
  scoreDenom: {
    fontSize: "0.78rem",
    color: T.slate400,
    fontWeight: 600,
  },
  scoreHeading: {
    fontWeight: 700,
    color: T.indigo,
    fontSize: "1.125rem",
    marginBottom: "4px",
    textAlign: "center",
    letterSpacing: "-0.2px",
  },
  scoreDesc: {
    fontSize: "0.875rem",
    color: T.slate500,
    textAlign: "center",
    lineHeight: 1.5,
    marginBottom: "20px",
  },
  progressRow: {
    marginBottom: "12px",
  },
  progressLabel: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "0.875rem",
    fontWeight: 600,
    color: T.slate700,
    marginBottom: "6px",
  },
  progressBar: {
    height: "10px",
    background: T.slate100,
    borderRadius: T.radiusFull,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: T.radiusFull,
    background: T.gradPrimary,
    transition: "width 1s cubic-bezier(0.4,0,0.2,1)",
  },
  // Skills
  skillsWrap: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  skillTag: {
    padding: "6px 14px",
    background: "rgba(99,102,241,0.08)",
    borderRadius: T.radiusFull,
    color: T.indigo,
    fontSize: "0.85rem",
    fontWeight: 600,
    border: "1px solid rgba(99,102,241,0.15)",
    letterSpacing: "-0.1px",
  },
  // Resume preview
  previewBox: {
    height: "200px",
    background: T.slate50,
    borderRadius: T.radiusXl,
    border: `1px solid ${T.slate200}`,
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
    height: "40px",
    border: `1px solid ${T.slate200}`,
    borderRadius: T.radiusLg,
    background: T.white,
    color: T.slate700,
    fontSize: "0.875rem",
    fontWeight: 600,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    transition: "all 0.15s",
  },
  // Modal
  modalOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 999,
    background: "rgba(15,23,42,0.45)",
    backdropFilter: "blur(6px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  modalCard: {
    background: T.white,
    borderRadius: T.radius2xl,
    padding: "32px",
    width: "100%",
    maxWidth: "440px",
    boxShadow: T.shadowLg,
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
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
          <div>
            <div style={{ fontSize: "1.5rem", marginBottom: "4px" }}>⚠️</div>
            <h3 style={{ fontWeight: 700, fontSize: "1.05rem", color: T.slate900, letterSpacing: "-0.2px" }}>Action Required</h3>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "20px", color: T.slate400, lineHeight: 1, padding: "2px" }}>✕</button>
        </div>
        <p style={{ fontSize: "0.875rem", color: T.slate500, marginBottom: "28px", lineHeight: 1.7 }}>{message}</p>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ ...styles.analyzeBtn, width: "auto", padding: "11px 28px", marginTop: 0, height: "auto" }}>
            Got it
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
      width: "18px",
      height: "18px",
      border: "2.5px solid rgba(255,255,255,0.35)",
      borderTopColor: "white",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
      flexShrink: 0,
    }} />
  );
}

// ─── Score Circle ─────────────────────────────────────────────────────────────
function ScoreCircle({ score }) {
  const pct = score ?? 0;
  const r = 56;
  const circ = 2 * Math.PI * r;
  const dash = circ - (pct / 100) * circ;
  return (
    <div style={{ position: "relative", width: "140px", height: "140px", margin: "0 auto 20px" }}>
      <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="70" cy="70" r={r} fill="none" stroke={T.slate100} strokeWidth="12" />
        <circle
          cx="70" cy="70" r={r} fill="none"
          stroke="url(#scoreGrad)" strokeWidth="12"
          strokeDasharray={circ}
          strokeDashoffset={dash}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
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

// ─── Section Divider ──────────────────────────────────────────────────────────
function SectionLabel({ text }) {
  return (
    <div style={{ fontSize: "0.65rem", fontWeight: 700, color: T.slate400, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" }}>
      {text}
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
  const [analysisId, setAnalysisId] = useState(null);

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
        if (response.analysisId) setAnalysisId(response.analysisId);
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
      badgeColor: T.green, badgeBg: "#f0fdf4",
      iconBg: "#f0fdf4", iconColor: T.green,
      desc: analysis?.strengths?.length > 0 ? analysis.strengths.join(" • ") : (analysis ? "None identified." : "Upload a resume to see strengths."),
    },
    {
      emoji: "⚠️", label: "Improvements", badge: "Moderate",
      badgeColor: T.amber, badgeBg: "#fffbeb",
      iconBg: "#fffbeb", iconColor: T.amber,
      desc: analysis?.improvements?.length > 0 ? analysis.improvements.join(" • ") : (analysis ? "None identified." : "Upload a resume to see improvements."),
    },
    {
      emoji: "ℹ️", label: "ATS Tips", badge: "Important",
      badgeColor: T.blue, badgeBg: "#eff6ff",
      iconBg: "#eff6ff", iconColor: T.blue,
      desc: analysis?.atsTips?.length > 0 ? analysis.atsTips.join(" • ") : (analysis ? "None identified." : "Upload a resume to see ATS tips."),
    },
    {
      emoji: "💡", label: "Missing Keywords", badge: analysis?.missingKeywords ? `${analysis.missingKeywords.length} found` : "0 found",
      badgeColor: T.indigo, badgeBg: "#f5f3ff",
      iconBg: "#f5f3ff", iconColor: T.indigo,
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
    gridTemplateColumns: isSmall ? "1fr" : "minmax(0, 7fr) minmax(0, 5fr)",
  };

  return (
    <div style={styles.page}>
      {/* Global keyframes */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .ra-upload-zone:hover { background: rgba(99,102,241,0.05) !important; border-color: #6366f1 !important; }
        .ra-analyze-btn:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 6px 24px rgba(99,102,241,0.4); }
        .ra-view-report-btn:hover { background: rgba(99,102,241,0.07) !important; transform: translateY(-1px); }
        .ra-logout-btn:hover { background: ${T.slate100} !important; color: ${T.slate700} !important; }
        .ra-preview-btn:hover:not(:disabled) { background: ${T.slate50} !important; border-color: ${T.slate400} !important; }
        .ra-preview-btn:disabled { opacity: 0.4; cursor: not-allowed; }
        .ra-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.09); }
        .ra-container {
          padding: 24px 24px 40px !important;
        }
        @media (max-width: 768px) {
          .ra-container {
            padding: 20px 16px 30px !important;
          }
        }
        @media (max-width: 480px) {
          .ra-container {
            padding: 16px 16px 24px !important;
          }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav style={styles.navbar}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={styles.navLogo}>ResumeIQ ✦</div>
          <div style={styles.navRight}>
            {user && (
              <span style={styles.navName}>
                <span style={{ marginRight: "6px" }}>👋</span>
                {user.fullName || user.name}
              </span>
            )}
            <button className="ra-logout-btn" onClick={logout} style={styles.logoutBtn}>Log out</button>
          </div>
        </div>
      </nav>

      {/* ── Main ── */}
      <div className="ra-container" style={styles.container}>

        {/* Page Header */}
        <div style={styles.pageHeader}>
          <div style={styles.pageBadge}>✦ AI-Powered</div>
          <h1 style={styles.pageTitle}>Resume Analyzer</h1>
          <p style={styles.pageSubtitle}>
            Get instant AI-powered feedback to strengthen your resume and maximise your shortlisting chances.
          </p>
        </div>

        {/* Main Grid */}
        <div style={gridStyle}>

          {/* ── LEFT COLUMN ── */}
          <div style={styles.leftCol}>

            {/* Upload Card */}
            <div className="ra-card" style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Upload Your Resume</h2>
                <p style={styles.cardSubtitle}>PDF format only · Max 5MB</p>
              </div>

              <div
                className="ra-upload-zone"
                style={{
                  ...styles.uploadZone,
                  borderColor: dragging ? T.indigo : "#c7d2fe",
                  background: dragging ? "rgba(99,102,241,0.05)" : "rgba(99,102,241,0.02)",
                }}
                onClick={() => fileInputRef.current.click()}
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
              >
                <input type="file" accept="application/pdf" ref={fileInputRef} onChange={handleFileChange} style={{ display: "none" }} />
                <div style={styles.uploadIcon}>
                  <span>☁️</span>
                </div>
                <p style={styles.uploadText}>{file ? file.name : "Drag & drop or click to upload"}</p>
                <p style={styles.uploadHint}>Supports text-based PDF files up to 5MB</p>
                <button
                  style={styles.chooseBtn}
                  onClick={(e) => { e.stopPropagation(); fileInputRef.current.click(); }}
                >
                  {file ? "📂 Change File" : "📂 Choose File"}
                </button>
              </div>

              {error && (
                <div style={styles.errorMsg}>
                  <span>❌</span> {error}
                </div>
              )}

              {file && !error && (
                <div style={styles.successPill}>
                  <span>✅</span>
                  <span style={{ fontWeight: 500 }}>{file.name}</span>
                  <span style={{ color: "#86efac" }}>selected</span>
                </div>
              )}

              {file && (
                <button
                  className="ra-analyze-btn"
                  style={{ ...styles.analyzeBtn, ...(loading ? styles.analyzeBtnDisabled : {}) }}
                  onClick={handleUpload}
                  disabled={loading}
                >
                  {loading ? <><Spinner /> Analyzing your resume…</> : "🔍 Analyze Resume"}
                </button>
              )}
            </div>

            {/* Detailed Feedback Card */}
            <div className="ra-card" style={styles.card}>
              <div style={styles.cardHeader}>
                <h2 style={styles.cardTitle}>Detailed Feedback</h2>
                <p style={styles.cardSubtitle}>AI-generated insights from your resume</p>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {feedbackItems.map((item, i) => (
                  <div key={i} style={styles.feedbackItem}>
                    <div style={{ ...styles.feedbackIcon, background: item.iconBg }}>
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
              </div>

              {analysis && analysisId && (
                <button
                  className="ra-view-report-btn"
                  style={styles.viewReportBtn}
                  onClick={() => navigate(`/resume-analyzer/report/${analysisId}`)}
                >
                  📄 View Detailed Analysis →
                </button>
              )}
            </div>
          </div>

          {/* ── RIGHT COLUMN ── */}
          <div style={styles.rightCol}>

            {/* Score Card */}
            <div className="ra-card" style={styles.card}>
              <div style={{ ...styles.cardHeader, textAlign: "center" }}>
                <h2 style={{ ...styles.cardTitle, textAlign: "center" }}>Resume Score</h2>
                <p style={{ ...styles.cardSubtitle, marginBottom: "24px", textAlign: "center" }}>Overall quality assessment</p>
              </div>

              <ScoreCircle score={analysis?.score} />

              <p style={styles.scoreHeading}>{analysis ? getHeading(analysis.score) : "Not Analyzed Yet"}</p>
              <p style={styles.scoreDesc}>
                {analysis
                  ? "Your resume has been analyzed. Review the feedback below."
                  : "Upload a resume to see your score and detailed feedback."}
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {progressItems.map(({ label, value }) => (
                  <div key={label}>
                    <div style={styles.progressLabel}>
                      <span>{label}</span>
                      <span style={{ color: T.indigo, fontWeight: 700 }}>{value}</span>
                    </div>
                    <div style={styles.progressBar}>
                      <div style={{ ...styles.progressFill, width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Preview Card */}
            <div className="ra-card" style={styles.card}>
              <h2 style={{ ...styles.cardTitle, marginBottom: "16px" }}>Resume Preview</h2>
              <div style={styles.previewBox}>
                {previewUrl ? (
                  <iframe
                    src={`${previewUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    title="Resume Preview"
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                ) : (
                  <div style={{ textAlign: "center", color: T.slate400 }}>
                    <div style={{ fontSize: "52px", marginBottom: "10px", opacity: 0.5 }}>📄</div>
                    <p style={{ fontSize: "0.82rem", fontWeight: 600, color: T.slate400 }}>No file selected</p>
                  </div>
                )}
              </div>
              <div style={styles.previewBtns}>
                <button
                  className="ra-preview-btn"
                  style={styles.previewBtn}
                  disabled={!previewUrl}
                  onClick={() => previewUrl && window.open(previewUrl, "_blank")}
                >
                  🔗 View Full
                </button>
                <button
                  className="ra-preview-btn"
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
            <div className="ra-card" style={styles.card}>
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
        <div style={{ marginTop: "24px" }}>
          <ResumeScoreTrend />
        </div>
      </div>

      {showAlert && (
        <AlertModal message={alertMessage} onClose={() => setShowAlert(false)} />
      )}
    </div>
  );
}

export default ResumeAnalyzer;
