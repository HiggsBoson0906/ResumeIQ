import React, { useEffect } from 'react';
import './Landing.css';

const Landing = () => {
  useEffect(() => {
    // Intersection Observer for the word-by-word reveal
    const wordObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const words = entry.target.querySelectorAll('.reveal-word');
            words.forEach((w, i) => {
              setTimeout(() => w.classList.add('in'), i * 70);
            });
            wordObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );

    document.querySelectorAll('[data-reveal]').forEach((el) => wordObserver.observe(el));

    // Intersection Observer for features fade-in
    const featureObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            featureObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    document.querySelectorAll('.feature').forEach((el) => featureObserver.observe(el));

    // Cleanup observers on unmount
    return () => {
      wordObserver.disconnect();
      featureObserver.disconnect();
    };
  }, []);

  // Helper function to render text word-by-word for the reveal animation
  const renderRevealWords = (text, isDim = false) => {
    return text.split(/\s+/).map((word, index) => (
      <span key={`${word}-${index}`} className={`reveal-word ${isDim ? 'dim' : ''}`}>
        {word}&nbsp;
      </span>
    ));
  };

  return (
    <>
      <div className="ambient">
        <span></span>
      </div>

      <nav className="navbar">
        <div className="nav-logo metal">ResumeIQ</div>
        <ul className="nav-links">
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#how-it-works">How it Works</a>
          </li>
          <li>
            <a href="#pricing">Pricing</a>
          </li>
          <li>
            <a href="#faq">FAQ</a>
          </li>
        </ul>
        <div className="nav-right">
          <a className="nav-login" href="/login">
            Login
          </a>
          <a className="nav-cta" href="/register">
            Get Started
          </a>
        </div>
      </nav>

      <section id="hero">
        <div className="eyebrow">Introducing ResumeIQ</div>
        <h1 className="metal">
          See what the
          <br />
          machines see.
        </h1>
        <p className="sub">
          Your resume, scored, gapped, and rewritten — before an ATS ever gets the chance to reject it.
        </p>
        <a className="cta" href="#story">
          Analyze your resume
        </a>
      </section>

      <section id="story">
        <p className="statement" data-reveal="true">
          <span className="reveal-line">
            {renderRevealWords('Most resumes are never read by a person.')}
          </span>
          <span className="reveal-line">
            {renderRevealWords("They're")}
            {renderRevealWords('filtered, scored, and ranked', true)}
          </span>
          <span className="reveal-line">
            {renderRevealWords('by software, first.')}
          </span>
        </p>
      </section>

      <section id="how-it-works">
        <div className="eyebrow">How it works</div>
        <h2 className="metal">One score. Total clarity.</h2>
        <p className="sub">
          Paste your resume and the job description. ResumeIQ compares them line by line and returns a compatibility
          score with exactly what's missing.
        </p>
      </section>

      <section id="features">
        <div className="eyebrow">Capabilities</div>
        <h2 className="metal">Built for the ATS era.</h2>

        <div className="features">
          <div className="feature">
            <h3>Keyword matching</h3>
            <p>
              Surfaces the exact terms from the job description your resume is missing — the ones the ATS is scanning for
              first.
            </p>
          </div>
          <div className="feature">
            <h3>Skills-gap analysis</h3>
            <p>Compares your experience against the role's requirements and shows precisely where the gaps are.</p>
          </div>
          <div className="feature">
            <h3>Optimization tips</h3>
            <p>Actionable, specific suggestions to raise your compatibility score — not generic resume advice.</p>
          </div>
          <div className="feature">
            <h3>AI bullet rewrites</h3>
            <p>
              Turns flat, duplicate descriptions into sharp, achievement-driven bullet points, powered by the Gemini API.
            </p>
          </div>
        </div>
      </section>

      <section id="pricing">
        <div className="eyebrow">Pricing</div>
        <h2 className="metal">Simple, either way.</h2>
        <p className="sub">Start free. Upgrade only when you're applying at scale.</p>

        <div className="pricing-card">
          <div className="eyebrow" style={{ marginBottom: 0 }}>
            Pro
          </div>
          <div className="price">
            $9<span>/month</span>
          </div>
          <ul className="pricing-list">
            <li>Unlimited resume scans</li>
            <li>Full skills-gap breakdown</li>
            <li>AI-generated bullet rewrites</li>
            <li>Unlimited job description comparisons</li>
          </ul>
          <a className="cta" href="/register">
            Get Started
          </a>
        </div>
      </section>

      <section id="faq">
        <div className="eyebrow">FAQ</div>
        <h2 className="metal">Good to know.</h2>

        <div className="faq-list">
          <details className="faq-item">
            <summary>How is my compatibility score calculated?</summary>
            <p>
              ResumeIQ compares the keywords, skills, and experience in your resume against the job description, then weighs
              each match to produce a single score.
            </p>
          </details>
          <details className="faq-item">
            <summary>Does it store my resume or job descriptions?</summary>
            <p>
              Only what's needed to generate your results. You can delete your data at any time from your account settings.
            </p>
          </details>
          <details className="faq-item">
            <summary>Which file formats are supported?</summary>
            <p>
              You can paste text directly, or upload a PDF or Word document — ResumeIQ extracts the content automatically.
            </p>
          </details>
          <details className="faq-item">
            <summary>Can I cancel anytime?</summary>
            <p>
              Yes. Pro is billed monthly with no long-term commitment, and you can cancel from your dashboard in one click.
            </p>
          </details>
        </div>
      </section>

      <section id="closing">
        <p className="statement" data-reveal="true">
          <span className="reveal-line">{renderRevealWords('Your experience was never the problem.')}</span>
          <span className="reveal-line">
            {renderRevealWords('The')}
            {renderRevealWords('formatting was.', true)}
          </span>
        </p>
        <a className="cta" style={{ marginTop: '40px' }} href="#hero">
          Try ResumeIQ
        </a>
      </section>

      <footer>© 2026 ResumeIQ. Built with React, Node.js, Express, PostgreSQL & Gemini API.</footer>
    </>
  );
};

export default Landing;
