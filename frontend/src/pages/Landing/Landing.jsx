import React from 'react';
import './Landing.css';
import TextType from '../../components/TextType';
import { motion } from 'framer-motion';
import ScanSimulator from '../../components/ScanSimulator';
import BlurText from '../../components/BlurText';
import TargetCursor from '../../components/TargetCursor';

const Landing = () => {
  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
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
            <a href="#faq">FAQ</a>
          </li>
        </ul>
        <div className="nav-right">
          <motion.a 
            className="nav-login" 
            href="/login"
            whileHover={{ color: "var(--glow-violet)" }}
          >
            Login
          </motion.a>
          <motion.a 
            className="nav-cta" 
            href="/register"
            whileHover={{ scale: 1.05, boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)" }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.a>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero">
        <div className="hero-container">
          <motion.div
            className="eyebrow"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Introducing ResumeIQ
          </motion.div>

          <motion.h1
            className="metal"
            style={{ fontWeight: 900 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            See what the
            <br />
            machines see.
          </motion.h1>

          <motion.p
            className="sub"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your resume, scored, gapped, and rewritten — before an ATS ever gets the chance to reject it.
          </motion.p>

          <motion.a
            className="cta"
            href="/login"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(99, 102, 241, 0.4)" }}
            whileTap={{ scale: 0.98 }}
          >
            Analyze your resume
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <ScanSimulator />
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <motion.section
        id="story"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
      >
        <BlurText
          text="Most resumes are never read by a person. They're filtered, scored, and ranked by software, first."
          delay={40}
          className="statement"
          animateBy="words"
          direction="bottom"
        />
      </motion.section>

      {/* How it Works Section */}
      <motion.section
        id="how-it-works"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
      >
        <div className="eyebrow">How it works</div>
        <h2 className="metal">One score. Total clarity.</h2>
        <p className="sub">
          Paste your resume and the job description. ResumeIQ compares them line by line and returns a compatibility
          score with exactly what's missing.
        </p>
      </motion.section>

      {/* Features Section */}
      <motion.section
        id="features"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
      >
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
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        id="faq"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
      >
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
      </motion.section>

      {/* Closing Section */}
      <motion.section
        id="closing"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUpVariants}
      >
        <TextType
          as="p"
          className="statement"
          style={{ minHeight: '80px' }}
          text={['Your experience was never the problem.', 'The formatting was.']}
          textColors={['#000000', '#000000']}
          typingSpeed={60}
          deletingSpeed={40}
          pauseDuration={2000}
          loop={true}
          showCursor={true}
          cursorCharacter="|"
          cursorClassName="text-indigo-500 font-light"
          startOnVisible={true}
        />
        <motion.a
          className="cta"
          style={{ marginTop: '40px' }}
          href="/login"
          whileHover={{ scale: 1.05, boxShadow: "0 8px 30px rgba(99, 102, 241, 0.4)" }}
          whileTap={{ scale: 0.98 }}
        >
          Try ResumeIQ
        </motion.a>
      </motion.section>

      <footer>© 2026 ResumeIQ. Built with React, Node.js, Express, PostgreSQL & Gemini API.</footer>
      <TargetCursor 
        targetSelector="a, button, summary, .cursor-target" 
        cursorColor="#111827" 
        cursorColorOnTarget="#6366f1" 
      />
    </>
  );
};

export default Landing;
