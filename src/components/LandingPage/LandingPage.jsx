import { useState } from 'react'
import './LandingPage.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { login, register } from '../../services/api.js'

function getErrorMessage(error) {
  const detail = error.response?.data?.detail
  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg).join(' ')
  }
  return typeof detail === 'string' ? detail : 'Unable to connect. Please try again.'
}

export default function LandingPage({ onContinue, onAuthenticated }) {
  const { t } = useLanguage()
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    if (mode === 'register' && password !== confirmPassword) {
      setError(t.landing?.passwordMismatch ?? 'Passwords do not match.')
      return
    }
    setLoading(true)
    try {
      const user =
        mode === 'login'
          ? await login({ email, password })
          : await register({ username, email, password })
      onAuthenticated(user)
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setLoading(false)
    }
  }

  function switchMode(nextMode) {
    setMode(nextMode)
    setError('')
    setPassword('')
    setConfirmPassword('')
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
          <div className="landing-page__auth-tabs" role="tablist">
            <button
              type="button"
              className={mode === 'login' ? 'is-active' : ''}
              onClick={() => switchMode('login')}
            >
              {t.landing?.signInBtn ?? 'Sign in'}
            </button>
            <button
              type="button"
              className={mode === 'register' ? 'is-active' : ''}
              onClick={() => switchMode('register')}
            >
              {t.landing?.signUpBtn ?? 'Sign up'}
            </button>
          </div>
          <h3>
            {mode === 'login'
              ? t.landing?.welcomeBack ?? 'Welcome back'
              : t.landing?.createAccount ?? 'Create your account'}
          </h3>
          <p>
            {mode === 'login'
              ? t.landing?.signInSubtitle ??
                'Sign in to continue, or use guest mode for a quick analysis.'
              : t.landing?.signUpSubtitle ?? 'Create an account to start your skin analysis.'}
          </p>
        </div>

        <form className="landing-page__form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <label>
              {t.landing?.usernameLabel ?? 'Username'}
              <input
                type="text"
                autoComplete="username"
                minLength="3"
                maxLength="50"
                pattern="[A-Za-z0-9_.-]+"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
            </label>
          )}
          <label>
            {t.landing?.emailLabel ?? 'Email'}
            <input
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            {t.landing?.passwordLabel ?? 'Password'}
            <input
              type="password"
              autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              minLength="8"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {mode === 'register' && (
            <label>
              {t.landing?.confirmPasswordLabel ?? 'Confirm password'}
              <input
                type="password"
                autoComplete="new-password"
                minLength="8"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </label>
          )}

          {error && <p className="landing-page__error" role="alert">{error}</p>}

          <button
            className="landing-page__btn landing-page__btn--primary"
            type="submit"
            disabled={loading}
          >
            {loading
              ? t.landing?.submitting ?? 'Please wait…'
              : mode === 'login'
                ? t.landing?.signInBtn ?? 'Sign in'
                : t.landing?.signUpBtn ?? 'Sign up'}
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
          {t.landing?.passwordHint ??
            'Passwords must contain at least 8 characters, including a letter and a number.'}
        </p>
      </div>
    </section>
  )
}
