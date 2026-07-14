import { useState } from 'react'
import './LandingPage.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function LandingPage({ onContinue }) {
  const { t } = useLanguage()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onContinue()
  }

  return (
    <section className="landing-page">
      <div className="landing-page__hero">
        <div className="landing-page__eyebrow">AI-powered cosmetic guidance</div>

        <h2 className="landing-page__title">
          Understand your skin tone before choosing your makeup.
        </h2>

        <p className="landing-page__description">
          Lumière analyzes facial regions, estimates skin tone, highlights visible skin indicators,
          and recommends makeup products using a privacy-conscious academic prototype workflow.
        </p>

        <div className="landing-page__steps">
          <div className="landing-page__step">
            <span>1</span>
            <p>Upload or capture a face photo.</p>
          </div>
          <div className="landing-page__step">
            <span>2</span>
            <p>Review tone, region, and condition indicators.</p>
          </div>
          <div className="landing-page__step">
            <span>3</span>
            <p>Get cosmetic recommendations with clear limitations.</p>
          </div>
        </div>

        <div className="landing-page__trust">
          <p>Non-diagnostic</p>
          <p>Photo processed for analysis only</p>
          <p>Built for educational prototype use</p>
        </div>
      </div>

      <div className="landing-page__card">
        <div className="landing-page__card-header">
          <h3>Welcome back</h3>
          <p>Sign in to continue, or use guest mode for a quick analysis.</p>
        </div>

        <form className="landing-page__form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button className="landing-page__btn landing-page__btn--primary" type="submit">
            Sign in
          </button>
        </form>

        <button
          className="landing-page__btn landing-page__btn--secondary"
          type="button"
          onClick={onContinue}
        >
          Continue as guest
        </button>

        <p className="landing-page__note">
          Login is prepared for the user-profile workflow. Authentication can be connected when the backend is ready.
        </p>
      </div>
    </section>
  )
}