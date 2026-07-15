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
        <div className="landing-page__eyebrow">
          {t.landing?.eyebrow ?? 'AI-powered cosmetic guidance'}
        </div>

        <h2 className="landing-page__title">
          {t.landing?.title ?? 'Understand your skin tone before choosing your makeup.'}
        </h2>

        <p className="landing-page__description">
          {t.landing?.description ??
            'Lumière analyzes facial regions, estimates skin tone, highlights visible skin indicators, and recommends makeup products using a privacy-conscious academic prototype workflow.'}
        </p>

        <div className="landing-page__steps">
          <div className="landing-page__step">
            <span>1</span>
            <p>{t.landing?.step1 ?? 'Upload or capture a face photo.'}</p>
          </div>
          <div className="landing-page__step">
            <span>2</span>
            <p>{t.landing?.step2 ?? 'Review tone, region, and condition indicators.'}</p>
          </div>
          <div className="landing-page__step">
            <span>3</span>
            <p>{t.landing?.step3 ?? 'Get cosmetic recommendations with clear limitations.'}</p>
          </div>
        </div>

        <div className="landing-page__trust">
          <p>{t.landing?.nonDiagnostic ?? 'Non-diagnostic'}</p>
          <p>{t.landing?.privacyNotice ?? 'Photo processed for analysis only'}</p>
          <p>{t.landing?.educationalUse ?? 'Built for educational prototype use'}</p>
        </div>
      </div>

      <div className="landing-page__card">
        <div className="landing-page__card-header">
          <h3>{t.landing?.welcomeBack ?? 'Welcome back'}</h3>
          <p>
            {t.landing?.signInSubtitle ??
              'Sign in to continue, or use guest mode for a quick analysis.'}
          </p>
        </div>

        <form className="landing-page__form" onSubmit={handleSubmit}>
          <label>
            {t.landing?.emailLabel ?? 'Email'}
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>

          <label>
            {t.landing?.passwordLabel ?? 'Password'}
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>

          <button className="landing-page__btn landing-page__btn--primary" type="submit">
            {t.landing?.signInBtn ?? 'Sign in'}
          </button>
        </form>

        <button
          className="landing-page__btn landing-page__btn--secondary"
          type="button"
          onClick={onContinue}
        >
          {t.landing?.guestBtn ?? 'Continue as guest'}
        </button>

        <p className="landing-page__note">
          {t.landing?.authNotice ??
            'Login is prepared for the user-profile workflow. Authentication can be connected when the backend is ready.'}
        </p>
      </div>
    </section>
  )
}