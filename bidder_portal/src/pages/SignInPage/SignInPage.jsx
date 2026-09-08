import React, { useState } from "react";
import "./SignInPage.css";
import hijraLogo from "../../assets/Hijra_logo.png";

function SignInPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Execute email sign-up authentication logic
    console.log("Submitting registration:", formData);
  };

  const handleGoogleSignUp = () => {};

  return (
    <div className="page-container">
      <header className="page-header">
        <div className="logo-container">
          <img src={hijraLogo} alt="Hijra Bank Logo" className="brand-logo" />
        </div>
        <nav className="auth-nav">
          <span className="auth-text">Already have an account?</span>
          <a href="/login" className="login-link">
            &rarr; Log in
          </a>
        </nav>
      </header>

      {/* Main Content*/}
      <main className="content-wrapper">
        <div className="signUpCard">
          <div className="icon-badge" aria-hidden="true">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#555"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          <h2>Create your account</h2>
          <p className="subtitle">
            Get started with Hijra Bank's bidder portal in minutes.
          </p>

          {/* Third-Party Authentication Actions */}
          <div className="oauth-container">
            <button
              type="button"
              className="btn-oauth"
              onClick={handleGoogleSignUp}
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Sign up with Google
            </button>
          </div>

          <div className="divider" role="separator">
            <span>Or</span>
          </div>

          {/* Registration Form */}
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="fullName" className="sr-only">
                Full name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Full name"
                required
                value={formData.fullName}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
            <div className="input-group">
              <label htmlFor="companyName" className="sr-only">
                Company name
              </label>
              <input
                id="companyName"
                name="companyName"
                type="text"
                placeholder="Company name"
                required
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>
            <div className="input-group">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password" className="sr-only">
                Create password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Create password"
                required
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
            </div>

            <button type="submit" className="btn-submit">
              Sign up
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default SignInPage;
