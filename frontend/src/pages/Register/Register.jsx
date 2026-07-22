import React from 'react';
import './Register.css';

const Register = () => {
  return (
    <>
      <div className="ambient"></div>

      <main className="register-main">
        <div className="auth-card">
          <div className="auth-eyebrow">Get started</div>
          <h1 className="metal">Create account</h1>
          <p className="auth-sub">Score your first resume in under a minute.</p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" type="text" placeholder="Jane Doe" required />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="••••••••" required />
            </div>

            <div className="field">
              <label htmlFor="confirm">Confirm password</label>
              <input id="confirm" type="password" placeholder="••••••••" required />
            </div>

            <label className="checkbox" style={{ fontSize: '0.85rem', color: 'var(--dim)' }}>
              <input type="checkbox" required />
              I agree to the Terms and Privacy Policy
            </label>

            <button className="submit-btn" type="submit">Create account</button>
          </form>

          <p className="switch-text">
            Already have an account? <a href="/login">Log in</a>
          </p>
        </div>
      </main>
    </>
  );
};

export default Register;
