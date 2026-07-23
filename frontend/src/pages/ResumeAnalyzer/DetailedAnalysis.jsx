import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnalysisById } from "../../services/resumeService";
import { useAuth } from "../../context/AuthContext";
import ResumeScoreTrend from "../../components/ResumeScoreTrend";

// ─── Design Tokens ─────────────────────────────────────────────────────────────
const T = {
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
  gradPrimary: "linear-gradient(135deg, #6366f1 0%, #3b82f6 100%)",
  gradPage: "linear-gradient(135deg, #f0f4ff 0%, #fafafa 55%, #f5f0ff 100%)",
  shadowSm: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
  radius2xl: "20px",
  radiusXl: "14px",
  radiusLg: "10px",
  radiusFull: "9999px",
};

// ─── Base Styles ───────────────────────────────────────────────────────────────
const s = {
  page: {
    minHeight: "100vh",
    background: T.gradPage,
    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
    color: T.slate800,
  },
  navbar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "0 40px", height: "64px",
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(16px)",
    borderBottom: `1px solid ${T.slate200}`,
    position: "sticky", top: 0, zIndex: 100,
  },
  navLogo: {
    fontSize: "1.2rem", fontWeight: 800,
    background: T.gradPrimary,
    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
    letterSpacing: "-0.5px",
  },
  container: { maxWidth: "1400px", margin: "0 auto" },
  card: {
    background: T.white,
    borderRadius: T.radius2xl,
    padding: "20px 24px",
    border: `1px solid ${T.slate200}`,
    boxShadow: T.shadowSm,
    marginBottom: "16px",
    pageBreakInside: "avoid",
    transition: "box-shadow 0.2s",
  },
  cardTitle: {
    fontSize: "1.05rem", fontWeight: 700, color: T.slate900,
    marginBottom: "12px", display: "flex", alignItems: "center", gap: "10px",
    letterSpacing: "-0.2px",
  },
  cardSubtext: { fontSize: "0.85rem", color: T.slate500, lineHeight: 1.65 },
  badge: {
    display: "inline-flex", alignItems: "center",
    padding: "4px 12px", borderRadius: T.radiusFull,
    fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.4px", textTransform: "uppercase",
  },
  btn: {
    padding: "11px 22px", borderRadius: T.radiusLg, fontWeight: 700, fontSize: "0.85rem",
    cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "7px",
    transition: "all 0.15s", border: "none", height: "44px",
  },
  progressBar: { height: "10px", background: T.slate100, borderRadius: T.radiusFull, overflow: "hidden" },
  progressFill: { height: "100%", borderRadius: T.radiusFull, background: T.gradPrimary, transition: "width 1s cubic-bezier(0.4,0,0.2,1)" },
  chip: {
    display: "inline-flex", alignItems: "center",
    padding: "6px 16px", borderRadius: T.radiusFull,
    fontSize: "0.78rem", fontWeight: 600,
    marginRight: "8px", marginBottom: "8px",
  },
  listItem: {
    display: "flex", alignItems: "flex-start", gap: "10px",
    marginBottom: "8px", fontSize: "0.875rem", color: T.slate700, lineHeight: 1.5,
  },
  dot: { width: "6px", height: "6px", borderRadius: "50%", marginTop: "6px", flexShrink: 0 },
  skeleton: {
    background: `linear-gradient(90deg, ${T.slate100} 25%, ${T.slate200} 50%, ${T.slate100} 75%)`,
    backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite",
    borderRadius: T.radius2xl,
  },
  table: { width: "100%", borderCollapse: "collapse", fontSize: "0.83rem" },
  th: {
    textAlign: "left", padding: "10px 12px",
    borderBottom: `2px solid ${T.slate200}`,
    color: T.slate400, fontWeight: 700, fontSize: "0.68rem",
    textTransform: "uppercase", letterSpacing: "0.7px",
  },
  td: { padding: "8px 12px", borderBottom: `1px solid ${T.slate100}`, color: T.slate700, verticalAlign: "middle" },
};

// ─── Score Circle (SVG) ───────────────────────────────────────────────────────
function ScoreCircle({ score, size = 160, color }) {
  const r = (size - 24) / 2;
  const circ = 2 * Math.PI * r;
  const dash = circ - ((score ?? 0) / 100) * circ;
  return (
    <div style={{ position: "relative", width: size, height: size, margin: "0 auto 8px" }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={T.slate100} strokeWidth="14" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth="14"
          strokeDasharray={circ} strokeDashoffset={dash} strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)" }} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: "2.8rem", fontWeight: 800, color, lineHeight: 1, letterSpacing: "-2px" }}>{score ?? 0}</span>
        <span style={{ fontSize: "0.78rem", color: T.slate400, fontWeight: 600, marginTop: "2px" }}>/100</span>
      </div>
    </div>
  );
}

// ─── Score Mini Card ──────────────────────────────────────────────────────────
function ScoreMiniCard({ label, score, emoji }) {
  const pct = score ?? 0;
  return (
    <div style={{ ...s.card, marginBottom: 0, padding: "24px 20px", textAlign: "center" }}>
      <div style={{ fontSize: "1.6rem", marginBottom: "10px" }}>{emoji}</div>
      <div style={{ fontSize: "0.72rem", color: T.slate400, fontWeight: 700, marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.6px" }}>{label}</div>
      <div style={{ fontSize: "1.75rem", fontWeight: 800, color: T.indigo, marginBottom: "14px", letterSpacing: "-1px" }}>{pct}</div>
      <div style={s.progressBar}>
        <div style={{ ...s.progressFill, width: `${pct}%` }} />
      </div>
    </div>
  );
}

// ─── Skeleton Loader ──────────────────────────────────────────────────────────
function SkeletonLoader() {
  return (
    <div style={s.page}>
      <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
      <div style={{ height: "64px", background: "rgba(255,255,255,0.9)", borderBottom: `1px solid ${T.slate200}` }} />
      <div style={s.container}>
        <div style={{ ...s.skeleton, height: "72px", marginBottom: "28px" }} />
        <div style={{ ...s.skeleton, height: "220px", marginBottom: "24px" }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "16px", marginBottom: "24px" }}>
          {[1,2,3,4].map(i => <div key={i} style={{ ...s.skeleton, height: "140px" }} />)}
        </div>
        <div style={{ ...s.skeleton, height: "180px", marginBottom: "24px" }} />
        <div style={{ ...s.skeleton, height: "180px" }} />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
function DetailedAnalysis() {
  const { analysisId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const res = await getAnalysisById(analysisId);
        if (res.success) {
          setAnalysis(res.analysis);
        } else {
          setError(res.message || "Failed to load analysis.");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Analysis not found.");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, [analysisId]);

  if (loading) return <SkeletonLoader />;

  if (error || !analysis) {
    return (
      <div style={s.page}>
        <style>{`@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
        <div style={{ ...s.container, textAlign: "center", paddingTop: "120px" }}>
          <div style={{ fontSize: "4rem", marginBottom: "20px" }}>😕</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: T.slate900, marginBottom: "10px", letterSpacing: "-0.5px" }}>
            {error || "Analysis not found"}
          </h2>
          <p style={{ color: T.slate500, marginBottom: "32px", lineHeight: 1.7 }}>
            The analysis may have been deleted or the link is incorrect.
          </p>
          <button onClick={() => navigate("/resume-analyzer")}
            style={{ ...s.btn, background: T.gradPrimary, color: T.white }}>
            ← Back to Resume Analyzer
          </button>
        </div>
      </div>
    );
  }

  // ── Derived values ──
  const scoreColor = analysis.score >= 80 ? T.green : analysis.score >= 60 ? T.amber : T.red;
  const scoreLabel = analysis.score >= 80 ? "Excellent" : analysis.score >= 60 ? "Good" : analysis.score >= 40 ? "Moderate" : "Poor";
  const scoreDescription = analysis.score >= 80
    ? "Your resume is highly optimised for ATS systems and recruiters."
    : analysis.score >= 60
    ? "Your resume has solid ATS compatibility with room for improvement."
    : "Your resume needs significant optimisation for ATS systems.";
  const analysisDate = new Date(analysis.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  const skills = (() => {
    if (!analysis.skills || analysis.skills.length === 0) return [];
    if (Array.isArray(analysis.skills)) return analysis.skills;
    return String(analysis.skills).split(",").map(s => s.trim()).filter(Boolean);
  })();

  const matchedKeywords = (analysis.keywordAnalysis || []).filter(k => k.found);
  const missingFromAnalysis = (analysis.keywordAnalysis || []).filter(k => !k.found);
  const matchPct = analysis.keywordAnalysis?.length > 0
    ? Math.round((matchedKeywords.length / analysis.keywordAnalysis.length) * 100) : 0;
  const matchColor = matchPct >= 70 ? "linear-gradient(90deg, #16a34a, #22c55e)"
    : matchPct >= 40 ? "linear-gradient(90deg, #d97706, #f59e0b)"
    : "linear-gradient(90deg, #dc2626, #ef4444)";

  return (
    <div style={s.page}>
      <style>{`
        @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
        .da-card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.09) !important; }
        .da-btn-secondary:hover { background: ${T.slate50} !important; border-color: ${T.slate400} !important; }
        .da-btn-primary:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(99,102,241,0.35); }
        @media print {
          @page { margin: 10mm; size: A4 portrait; }
          body { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          .no-print { display: none !important; }
        }
        tr:hover td { background: ${T.slate50}; }
        .da-container {
          padding: 24px 24px 40px !important;
        }
        @media (max-width: 768px) {
          .da-container {
            padding: 20px 16px 30px !important;
          }
        }
        @media (max-width: 480px) {
          .da-container {
            padding: 16px 16px 24px !important;
          }
        }
      `}</style>

      {/* ── Navbar ── */}
      <nav style={s.navbar} className="no-print">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", maxWidth: "1400px", margin: "0 auto" }}>
          <div style={s.navLogo}>ResumeIQ ✦</div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <button
              className="da-btn-secondary"
              onClick={() => navigate("/resume-analyzer")}
              style={{ ...s.btn, background: T.white, border: `1px solid ${T.slate200}`, color: T.slate700 }}
            >
              ← Back
            </button>
            <button
              className="da-btn-primary"
              onClick={() => window.print()}
              style={{ ...s.btn, background: T.gradPrimary, color: T.white, boxShadow: "0 2px 8px rgba(99,102,241,0.25)" }}
            >
              ⬇️ Download PDF
            </button>
          </div>
        </div>
      </nav>

      <div className="da-container" style={s.container}>

        {/* ── 1. Header Card ── */}
        <div className="da-card" style={{ ...s.card, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
          <div>
            <div style={{ ...s.navLogo, fontSize: "1rem", marginBottom: "6px" }}>ResumeIQ</div>
            <h1 style={{ fontSize: "1.6rem", fontWeight: 800, color: T.slate900, letterSpacing: "-0.5px", marginBottom: "6px" }}>
              Resume Analysis Report
            </h1>
            {user?.fullName && (
              <p style={{ fontSize: "0.875rem", color: T.slate500 }}>
                Candidate: <strong style={{ color: T.slate700 }}>{user.fullName}</strong>
              </p>
            )}
            <p style={{ fontSize: "0.78rem", color: T.slate400, marginTop: "4px" }}>{analysisDate}</p>
          </div>
          <div style={{
            ...s.badge,
            background: scoreColor + "18",
            color: scoreColor,
            border: `1px solid ${scoreColor}30`,
            fontSize: "0.82rem",
            padding: "10px 22px",
          }}>
            ATS Score: <strong style={{ fontSize: "1.1rem", marginLeft: "4px" }}>{analysis.score}</strong>/100
          </div>
        </div>

        {/* ── 2. Overall ATS Score ── */}
        <div className="da-card" style={{ ...s.card, textAlign: "center" }}>
          <h2 style={{ ...s.cardTitle, justifyContent: "center", fontSize: "1.1rem", marginBottom: "8px" }}>🎯 Overall ATS Score</h2>
          <ScoreCircle score={analysis.score} size={150} color={scoreColor} />
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "8px 20px", borderRadius: T.radiusFull,
            background: scoreColor + "14", border: `1px solid ${scoreColor}28`,
            marginBottom: "8px",
          }}>
            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: scoreColor, display: "inline-block" }} />
            <span style={{ fontWeight: 700, color: scoreColor, fontSize: "0.9rem" }}>{scoreLabel} ATS Compatibility</span>
          </div>
          <p style={{ ...s.cardSubtext, maxWidth: "480px", margin: "0 auto" }}>{scoreDescription}</p>
        </div>

        {/* ── 3. Executive Summary ── */}
        <div className="da-card" style={s.card}>
          <h2 style={s.cardTitle}>📝 Executive Summary</h2>
          <p style={{
            ...s.cardSubtext,
            background: T.slate50,
            border: `1px solid ${T.slate200}`,
            padding: "18px 20px",
            borderRadius: T.radiusXl,
            fontSize: "0.875rem",
            lineHeight: 1.8,
          }}>
            {analysis.summary || "No summary available."}
          </p>
        </div>

        {/* ── 4. Section Scores ── */}
        <div className="da-card" style={s.card}>
          <h2 style={s.cardTitle}>📊 Section-wise Scores</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "16px" }}>
            <ScoreMiniCard label="Content" score={analysis.contentScore || 0} emoji="📄" />
            <ScoreMiniCard label="Structure" score={analysis.structureScore || 0} emoji="🏗️" />
            <ScoreMiniCard label="Skills" score={analysis.skillsScore || 0} emoji="⚡" />
            <ScoreMiniCard label="ATS Match" score={analysis.atsScore || 0} emoji="🤖" />
          </div>
        </div>

        {/* ── 5. Strengths ── */}
        <div className="da-card" style={{ ...s.card, borderLeft: `4px solid ${T.green}` }}>
          <h2 style={s.cardTitle}>
            <span style={{ ...s.badge, background: "#f0fdf4", color: T.green, border: "1px solid #bbf7d0" }}>✓</span>
            Resume Strengths
          </h2>
          {(analysis.strengths || []).length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {analysis.strengths.map((item, i) => (
                <div key={i} style={s.listItem}>
                  <div style={{ ...s.dot, background: T.green }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : <p style={s.cardSubtext}>No strengths identified.</p>}
        </div>

        {/* ── 6. Areas for Improvement ── */}
        <div className="da-card" style={{ ...s.card, borderLeft: `4px solid ${T.amber}` }}>
          <h2 style={s.cardTitle}>
            <span style={{ ...s.badge, background: "#fffbeb", color: T.amber, border: "1px solid #fde68a" }}>⚠</span>
            Areas for Improvement
          </h2>
          {(analysis.improvements || []).length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {analysis.improvements.map((item, i) => (
                <div key={i} style={s.listItem}>
                  <div style={{ ...s.dot, background: T.amber }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          ) : <p style={s.cardSubtext}>No improvements identified.</p>}
        </div>

        {/* ── 7. Missing Keywords ── */}
        <div className="da-card" style={s.card}>
          <h2 style={s.cardTitle}>🔍 Missing Keywords</h2>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {(analysis.missingKeywords || []).length > 0 ? analysis.missingKeywords.map((kw, i) => (
              <span key={i} style={{ ...s.chip, background: "#fef2f2", color: T.red, border: "1px solid #fecaca" }}>{kw}</span>
            )) : <p style={s.cardSubtext}>No missing keywords detected.</p>}
          </div>
        </div>

        {/* ── 8. Skills Detected ── */}
        <div className="da-card" style={s.card}>
          <h2 style={s.cardTitle}>🎯 Skills Detected</h2>
          {analysis.skillCategories && Object.keys(analysis.skillCategories).length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {Object.entries(analysis.skillCategories).map(([category, categorySkills]) => (
                <div key={category}>
                  <p style={{ fontSize: "0.68rem", fontWeight: 700, color: T.slate400, marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.7px" }}>
                    {category}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {(Array.isArray(categorySkills) ? categorySkills : []).map((skill, i) => (
                      <span key={i} style={{ ...s.chip, background: "rgba(99,102,241,0.08)", color: T.indigo, border: "1px solid rgba(99,102,241,0.15)" }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {skills.length > 0 ? skills.map((skill, i) => (
                <span key={i} style={{ ...s.chip, background: "#f0fdf4", color: T.green, border: "1px solid #bbf7d0" }}>{skill}</span>
              )) : <p style={s.cardSubtext}>No skills detected.</p>}
            </div>
          )}
        </div>

        {/* ── 9. Skills Gap Analysis ── */}
        {analysis.keywordAnalysis && analysis.keywordAnalysis.length > 0 && (
          <div className="da-card" style={s.card}>
            <h2 style={s.cardTitle}>⚖️ Skills Gap Analysis</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px", marginBottom: "16px" }}>
              {[
                { label: "Matched", value: matchedKeywords.length, bg: "#f0fdf4", color: T.green },
                { label: "Missing", value: missingFromAnalysis.length, bg: "#fef2f2", color: T.red },
                { label: "Match Rate", value: `${matchPct}%`, bg: "rgba(99,102,241,0.07)", color: T.indigo },
              ].map(item => (
                <div key={item.label} style={{ padding: "12px 12px", background: item.bg, borderRadius: T.radiusXl, textAlign: "center" }}>
                  <div style={{ fontSize: "1.75rem", fontWeight: 800, color: item.color, letterSpacing: "-1px", marginBottom: "4px" }}>{item.value}</div>
                  <div style={{ fontSize: "0.72rem", color: T.slate500, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px" }}>{item.label}</div>
                </div>
              ))}
            </div>
            <div style={s.progressBar}>
              <div style={{ ...s.progressFill, width: `${matchPct}%`, background: matchColor }} />
            </div>
          </div>
        )}

        {/* ── 10. Keyword Match Breakdown ── */}
        {analysis.keywordAnalysis && analysis.keywordAnalysis.length > 0 && (
          <div className="da-card" style={{ ...s.card, overflowX: "auto" }}>
            <h2 style={s.cardTitle}>📋 Keyword Match Breakdown</h2>
            <table style={s.table}>
              <thead>
                <tr style={{ background: T.slate50 }}>
                  <th style={s.th}>Keyword</th>
                  <th style={s.th}>Found?</th>
                  <th style={s.th}>Count</th>
                  <th style={s.th}>Importance</th>
                  <th style={s.th}>Recommendation</th>
                </tr>
              </thead>
              <tbody>
                {analysis.keywordAnalysis.map((kw, i) => (
                  <tr key={i}>
                    <td style={{ ...s.td, fontWeight: 600, color: T.slate800 }}>{kw.keyword}</td>
                    <td style={s.td}>
                      <span style={{
                        ...s.badge,
                        background: kw.found ? "#f0fdf4" : "#fef2f2",
                        color: kw.found ? T.green : T.red,
                        border: `1px solid ${kw.found ? "#bbf7d0" : "#fecaca"}`,
                      }}>
                        {kw.found ? "Yes ✓" : "No ✗"}
                      </span>
                    </td>
                    <td style={{ ...s.td, fontWeight: 700, color: T.indigo }}>{kw.occurrences ?? 0}</td>
                    <td style={s.td}>
                      <span style={{
                        ...s.badge,
                        background: kw.importance === "High" ? "#fef2f2" : kw.importance === "Medium" ? "#fffbeb" : T.slate100,
                        color: kw.importance === "High" ? T.red : kw.importance === "Medium" ? T.amber : T.slate500,
                        border: `1px solid ${kw.importance === "High" ? "#fecaca" : kw.importance === "Medium" ? "#fde68a" : T.slate200}`,
                      }}>
                        {kw.importance || "Low"}
                      </span>
                    </td>
                    <td style={{ ...s.td, fontSize: "0.8rem", color: T.slate500 }}>{kw.recommendation || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ── 11. Optimization Suggestions ── */}
        {(analysis.optimizationSuggestions || []).length > 0 && (
          <div className="da-card" style={{ ...s.card, borderLeft: `4px solid ${T.indigo}` }}>
            <h2 style={s.cardTitle}>🚀 Resume Optimization Suggestions</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {analysis.optimizationSuggestions.map((suggestion, i) => (
                <div key={i} style={s.listItem}>
                  <div style={{ ...s.dot, background: T.indigo }} />
                  <span>{suggestion}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 12. Enhanced Bullet Points ── */}
        {(analysis.enhancedBullets || []).length > 0 && (
          <div className="da-card" style={s.card}>
            <h2 style={s.cardTitle}>✍️ Enhanced Resume Bullet Points</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {analysis.enhancedBullets.map((bullet, i) => (
                <div key={i} style={{ padding: "14px 16px", background: T.slate50, borderRadius: T.radiusXl, border: `1px solid ${T.slate200}` }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                    <span style={{ ...s.badge, background: "#fef2f2", color: T.red, border: "1px solid #fecaca" }}>Original</span>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: T.slate500, marginBottom: "10px", fontStyle: "italic", lineHeight: 1.6 }}>{bullet.original}</p>
                  <div style={{ textAlign: "center", margin: "2px 0", fontSize: "1.2rem", color: T.indigo }}>↓</div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", marginTop: "8px" }}>
                    <span style={{ ...s.badge, background: "#f0fdf4", color: T.green, border: "1px solid #bbf7d0" }}>Improved</span>
                  </div>
                  <p style={{ fontSize: "0.875rem", color: T.slate800, fontWeight: 500, lineHeight: 1.6 }}>{bullet.improved}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 13. ATS Tips ── */}
        <div className="da-card" style={{ ...s.card, borderLeft: `4px solid ${T.blue}` }}>
          <h2 style={s.cardTitle}>
            <span style={{ ...s.badge, background: "#eff6ff", color: T.blue, border: "1px solid #bfdbfe" }}>💡</span>
            ATS Optimization Tips
          </h2>
          {(analysis.atsTips || []).length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
              {analysis.atsTips.map((tip, i) => (
                <div key={i} style={s.listItem}>
                  <div style={{ ...s.dot, background: T.blue }} />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          ) : <p style={s.cardSubtext}>No ATS tips available.</p>}
        </div>

        {/* ── 14. Recruiter Feedback ── */}
        {analysis.recruiterFeedback && Object.keys(analysis.recruiterFeedback).length > 0 && (
          <div className="da-card" style={s.card}>
            <h2 style={s.cardTitle}>👔 Recruiter Feedback</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "12px" }}>
              {[
                { label: "First Impression", emoji: "👁️", value: analysis.recruiterFeedback.firstImpression, accent: T.indigo },
                { label: "Hiring Recommendation", emoji: "📋", value: analysis.recruiterFeedback.hiringRecommendation, accent: T.green },
                { label: "Interview Readiness", emoji: "🎤", value: analysis.recruiterFeedback.interviewReadiness, accent: T.blue },
                { label: "Overall Verdict", emoji: "⚖️", value: analysis.recruiterFeedback.overallVerdict, accent: T.amber },
              ].filter(item => item.value).map((item, i) => (
                <div key={i} style={{
                  padding: "14px 16px",
                  background: T.slate50,
                  borderRadius: T.radiusXl,
                  border: `1px solid ${T.slate200}`,
                  borderTop: `3px solid ${item.accent}`,
                }}>
                  <p style={{ fontSize: "0.72rem", fontWeight: 700, color: item.accent, marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    <span>{item.emoji}</span> {item.label}
                  </p>
                  <p style={{ fontSize: "0.83rem", color: T.slate700, lineHeight: 1.65 }}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 15. Final Recommendation ── */}
        {analysis.finalRecommendation && (
          <div className="da-card" style={{ ...s.card, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: T.gradPrimary }} />
            <h2 style={{ ...s.cardTitle, paddingLeft: "14px" }}>💬 Recruiter Recommendation</h2>
            <p style={{ ...s.cardSubtext, fontStyle: "italic", paddingLeft: "14px", fontWeight: 500, fontSize: "0.9rem", lineHeight: 1.8, color: T.slate700 }}>
              "{analysis.finalRecommendation}"
            </p>
          </div>
        )}

        {/* ── 16. Resume Score Trend ── */}
        <div style={{ marginTop: "0px" }}>
          <ResumeScoreTrend />
        </div>

        {/* ── Footer ── */}
        <div style={{ textAlign: "center", padding: "24px 0 8px", borderTop: `1px solid ${T.slate200}`, marginTop: "12px" }}>
          <p style={{ fontSize: "0.78rem", color: T.slate400 }}>Generated by ResumeIQ AI ATS Resume Analyzer · {analysisDate}</p>
          <p style={{ fontSize: "0.66rem", color: T.slate200, marginTop: "4px" }}>v1.0</p>
        </div>

      </div>
    </div>
  );
}

export default DetailedAnalysis;
