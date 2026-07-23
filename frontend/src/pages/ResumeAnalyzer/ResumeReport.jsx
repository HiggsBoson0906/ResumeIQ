import { useLocation, useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";

function ResumeReport() {
  const location = useLocation();
  const navigate = useNavigate();
  const analysis = location.state?.analysis;

  if (!analysis) {
    return (
      <div className="min-h-screen bg-surface w-full">
        <div className="p-8 flex flex-col items-center justify-center min-h-[60vh]">
          <span className="material-symbols-outlined text-6xl text-on-surface-variant mb-4">error</span>
          <h2 className="text-xl font-bold text-on-surface mb-2">No analysis available.</h2>
          <p className="text-on-surface-variant mb-6">Please analyze your resume first.</p>
          <button 
            onClick={() => navigate('/resume-analyzer')}
            className="px-6 py-2 bg-primary text-white font-bold rounded-lg hover:shadow-lg transition-all"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const downloadReport = () => {
    const doc = new jsPDF();
    let yPos = 20;
    
    const addText = (text, size = 12, isBold = false) => {
      doc.setFontSize(size);
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      
      const lines = doc.splitTextToSize(String(text), 170);
      lines.forEach(line => {
        if (yPos > 280) {
          doc.addPage();
          yPos = 20;
        }
        doc.text(line, 20, yPos);
        yPos += size * 0.5;
      });
      yPos += 5;
    };

    addText("Resume Analysis Report", 22, true);
    yPos += 5;

    addText(`Overall Score: ${analysis.score || 0}/100`, 16, true);
    
    addText("Executive Summary", 14, true);
    addText(analysis.summary || "No summary available.", 11);

    addText("Section Scores", 14, true);
    addText(`Content Score: ${analysis.contentScore || 0}/100`, 11);
    addText(`Structure Score: ${analysis.structureScore || 0}/100`, 11);
    addText(`Skills Score: ${analysis.skillsScore || 0}/100`, 11);
    addText(`ATS Score: ${analysis.atsScore || 0}/100`, 11);
    
    addText("Strengths", 14, true);
    (analysis.strengths || []).forEach(s => addText(`• ${s}`, 11));

    addText("Improvements", 14, true);
    (analysis.improvements || []).forEach(i => addText(`• ${i}`, 11));

    addText("ATS Tips", 14, true);
    (analysis.atsTips || []).forEach(t => addText(`• ${t}`, 11));

    addText("Missing Keywords", 14, true);
    addText((analysis.missingKeywords || []).join(", ") || "None", 11);

    addText("Skills Detected", 14, true);
    let skillsList = ["No skills detected."];
    if (analysis.skills) {
      if (Array.isArray(analysis.skills) && analysis.skills.length > 0) skillsList = analysis.skills;
      else if (typeof analysis.skills === 'string') skillsList = analysis.skills.split(',').map(s => s.trim()).filter(Boolean);
    }
    addText(skillsList.join(", "), 11);

    addText("Recruiter Recommendation", 14, true);
    addText(analysis.finalRecommendation || "No recommendation available.", 11);

    doc.save("Resume-Analysis-Report.pdf");
  };

  const getSkillsList = () => {
    if (!analysis.skills) return [];
    if (Array.isArray(analysis.skills) && analysis.skills.length > 0) return analysis.skills;
    if (typeof analysis.skills === 'string') return analysis.skills.split(',').map(s => s.trim()).filter(Boolean);
    return [];
  };
  const skills = getSkillsList();

  return (
    <div className="min-h-screen bg-surface w-full">
      <div className="p-4 md:p-8 max-w-4xl mx-auto space-y-8 pb-20">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-6 rounded-xl border border-outline-variant custom-shadow gap-4">
          <div>
            <h1 className="text-2xl font-bold text-on-surface">Resume Analysis Report</h1>
            <p className="text-sm text-on-surface-variant mt-1">Review your detailed feedback below.</p>
          </div>
          <button 
            onClick={downloadReport}
            className="flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-white font-bold rounded-lg hover:shadow-lg transition-all w-full sm:w-auto active:scale-95 duration-100"
          >
            <span className="material-symbols-outlined text-sm">download</span> Download Report
          </button>
        </div>

        <div className="bg-white p-8 rounded-xl border border-outline-variant custom-shadow flex flex-col sm:flex-row items-center gap-8 text-center sm:text-left">
          <div 
            className="relative w-32 h-32 circular-progress rounded-full flex items-center justify-center border-8 border-primary-container shrink-0"
            style={{ "--progress-score": analysis.score || 0 }}
          >
            <div className="text-center">
              <span className="block text-4xl font-extrabold text-on-surface">{analysis.score || 0}</span>
              <span className="text-xs font-bold text-on-surface-variant">/100</span>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-on-surface">Overall Score</h2>
            <p className="text-on-surface-variant mt-2 text-sm leading-relaxed max-w-lg">
              This score reflects the overall strength of your resume based on content, structure, skills, and ATS compatibility.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant custom-shadow">
          <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">summarize</span>
            Executive Summary
          </h3>
          <p className="text-on-surface-variant text-sm leading-relaxed bg-surface-container-low p-4 rounded-lg">
            {analysis.summary || "No summary available."}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-outline-variant custom-shadow">
          <h3 className="text-lg font-bold text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">bar_chart</span>
            Section Scores
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              ["Content Score", analysis.contentScore || 0],
              ["Structure Score", analysis.structureScore || 0],
              ["Skills Score", analysis.skillsScore || 0],
              ["ATS Score", analysis.atsScore || 0]
            ].map(([label, score]) => (
              <div key={label} className="space-y-2">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-on-surface">{label}</span>
                  <span className="text-primary">{score}/100</span>
                </div>
                <div className="h-2.5 bg-secondary-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary-container rounded-full" style={{ width: `${score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-emerald-50 p-6 rounded-xl border border-emerald-100 custom-shadow">
            <h3 className="text-lg font-bold text-emerald-800 flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span> Strengths
            </h3>
            <ul className="space-y-3">
              {(analysis.strengths && analysis.strengths.length > 0) ? analysis.strengths.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-emerald-900">
                  <span className="material-symbols-outlined text-emerald-500 text-sm mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>fiber_manual_record</span>
                  {item}
                </li>
              )) : <li className="text-sm text-emerald-900/70 italic">No strengths found.</li>}
            </ul>
          </div>

          <div className="bg-orange-50 p-6 rounded-xl border border-orange-100 custom-shadow">
            <h3 className="text-lg font-bold text-orange-800 flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span> Improvements
            </h3>
            <ul className="space-y-3">
              {(analysis.improvements && analysis.improvements.length > 0) ? analysis.improvements.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-orange-900">
                  <span className="material-symbols-outlined text-orange-500 text-sm mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>fiber_manual_record</span>
                  {item}
                </li>
              )) : <li className="text-sm text-orange-900/70 italic">No improvements found.</li>}
            </ul>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 custom-shadow">
          <h3 className="text-lg font-bold text-blue-800 flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>info</span> ATS Tips
          </h3>
          <ul className="space-y-3">
            {(analysis.atsTips && analysis.atsTips.length > 0) ? analysis.atsTips.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-blue-900">
                <span className="material-symbols-outlined text-blue-500 text-sm mt-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                {item}
              </li>
            )) : <li className="text-sm text-blue-900/70 italic">No ATS tips found.</li>}
          </ul>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border border-outline-variant custom-shadow">
            <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-error">playlist_remove</span>
              Missing Keywords
            </h3>
            <div className="flex flex-wrap gap-2">
              {(analysis.missingKeywords && analysis.missingKeywords.length > 0) ? analysis.missingKeywords.map((kw, i) => (
                <span key={i} className="px-3 py-1 bg-error-container/50 text-error rounded-full text-xs font-bold border border-error/20">
                  {kw}
                </span>
              )) : <span className="text-sm text-on-surface-variant italic">No missing keywords.</span>}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-outline-variant custom-shadow">
            <h3 className="text-lg font-bold text-on-surface mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">stars</span>
              Skills Detected
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.length > 0 ? skills.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-primary-container/20 text-primary rounded-full text-xs font-bold border border-primary/20">
                  {skill}
                </span>
              )) : <span className="text-sm text-on-surface-variant italic">No skills detected.</span>}
            </div>
          </div>
        </div>

        <div className="bg-surface-container-highest p-6 rounded-xl border border-outline-variant custom-shadow">
          <h3 className="text-lg font-bold text-on-surface mb-3 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>person_check</span>
            Recruiter Recommendation
          </h3>
          <div className="flex gap-4 items-start">
            <span className="material-symbols-outlined text-4xl text-primary/50">format_quote</span>
            <p className="text-on-surface-variant text-base leading-relaxed italic mt-1 font-medium">
              {analysis.finalRecommendation || "No recommendation available."}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ResumeReport;
