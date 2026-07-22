import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <>
      <div className="ambient"></div>

      <main className="login-main">
        <div className="auth-card">
          <div className="auth-eyebrow">Welcome back</div>
          <h1 className="metal">Log in</h1>
          <p className="auth-sub">Pick up where your resume left off.</p>

          <form onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" type="email" placeholder="you@example.com" required />
            </div>

            <div className="field">
              <label htmlFor="password">Password</label>
              <input id="password" type="password" placeholder="••••••••" required />
            </div>

            <div className="row-between">
              <label className="checkbox">
                <input type="checkbox" />
                Remember me
              </label>
              <a href="#">Forgot password?</a>
            </div>

            <button className="submit-btn" type="submit">Log in</button>
          </form>

          <p className="switch-text">
            Don't have an account? <a href="/register">Sign up</a>
          </p>
        </div>
      </main>
    </>
  );
};

export default Login;
