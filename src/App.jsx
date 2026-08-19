import { useEffect, useState } from 'react'
import './App.css'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext.jsx'
import UploadZone from './components/UploadZone/UploadZone.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import CameraCapture from './components/CameraCapture/CameraCapture.jsx'
import FacePreview from './components/FacePreview/FacePreview.jsx'
import SkinAnalysisDashboard from './components/SkinAnalysisDashboard/SkinAnalysisDashboard.jsx'
import FaceScanningAnimation from './components/FaceScanningAnimation/FaceScanningAnimation.jsx'
import AnalysisJobLoading from './components/AnalysisJobLoading/AnalysisJobLoading.jsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import AnalysisHistory from './components/AnalysisHistory/AnalysisHistory.jsx'
import './components/ErrorBoundary/ErrorBoundary.css'
import { useAnalysis } from './hooks/useAnalysis.js'
import { clearSession, getCurrentUser, hasSession } from './services/api.js'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'fr', label: 'FR' },
  { code: 'zh', label: '中文' },
  { code: 'tw', label: '繁中' },
  { code: 'tr', label: 'TR' },
]

function routeFromPathname(pathname) {
  if (pathname === '/upload') return { step: 'upload' }
  if (pathname === '/history') return { step: 'history' }
  const detailMatch = pathname.match(/^\/analyze\/([^/]+)$/)
  if (detailMatch) {
    return { step: 'loading-result', analysisId: decodeURIComponent(detailMatch[1]) }
  }
  return { step: 'landing' }
}

function AppInner() {
  const { lang, setLang, t } = useLanguage()
  const [step, setStep] = useState(() => routeFromPathname(window.location.pathname).step)
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [showCamera, setShowCamera] = useState(false)
  const [user, setUser] = useState(null)

  const { loading, error, result, jobStatus, analyze, reset, showResult, resumeAnalysis } = useAnalysis({
    setStep,
    onJobAccepted: (job) => {
      window.history.pushState({}, '', `/analyze/${encodeURIComponent(job.id)}`)
    },
  })

  useEffect(() => {
    let active = true

    async function restoreRoute() {
      const route = routeFromPathname(window.location.pathname)
      const protectedRoute = route.step === 'history'

      if (!hasSession()) {
        if (protectedRoute) {
          window.history.replaceState({}, '', '/')
          setStep('landing')
        } else if (route.step === 'loading-result') {
          setUser(null)
          resumeAnalysis(route.analysisId).catch(() => {})
        } else {
          setStep(route.step)
        }
        return
      }

      let currentUser
      try {
        currentUser = await getCurrentUser()
      } catch {
        if (!active) return
        clearSession()
        setUser(null)
        if (route.step === 'loading-result') {
          resumeAnalysis(route.analysisId).catch(() => {})
        } else {
          window.history.replaceState({}, '', '/')
          setStep('landing')
        }
        return
      }

      if (!active) return
      setUser(currentUser)

      if (route.step === 'landing') {
        window.history.replaceState({}, '', '/upload')
        setStep('upload')
      } else if (route.step === 'loading-result') {
        resumeAnalysis(route.analysisId).catch(() => {})
      } else {
        setStep(route.step)
      }
    }

    const handlePopState = () => restoreRoute()
    window.addEventListener('popstate', handlePopState)
    restoreRoute()

    return () => {
      active = false
      window.removeEventListener('popstate', handlePopState)
    }
  }, [])

  function navigateTo(nextStep, pathname, { replace = false } = {}) {
    window.history[replace ? 'replaceState' : 'pushState']({}, '', pathname)
    setStep(nextStep)
  }

  function handleContinueToUpload() {
    navigateTo('upload', '/upload')
  }

  function handleAuthenticated(authenticatedUser) {
    setUser(authenticatedUser)
    navigateTo('upload', '/upload')
  }

  function handleLogout() {
    clearSession()
    setUser(null)
    setImageFile(null)
    setImageUrl(null)
    reset()
    navigateTo('landing', '/', { replace: true })
  }

  function handleImageSelected(file, previewUrl) {
    setImageFile(file)
    setImageUrl(previewUrl)
    setStep('preview')
  }

  function handleCapture(blob, previewUrl) {
    const file = new File([blob], 'capture.jpg', { type: 'image/jpeg' })
    setImageFile(file)
    setImageUrl(previewUrl)
    setShowCamera(false)
    setStep('preview')
  }

  function handleRetry() {
    navigateTo('upload', '/upload')
    setImageFile(null)
    setImageUrl(null)
    reset()
  }

  function handleNewAnalysis() {
    navigateTo('upload', '/upload')
    setImageFile(null)
    setImageUrl(null)
    reset()
  }

  function handleOpenHistory() {
    navigateTo('history', '/history')
  }

  function handleSelectHistory(analysis) {
    window.history.pushState({}, '', `/analyze/${encodeURIComponent(analysis.id)}`)
    showResult(analysis)
  }

  return (
    <div className={`app${step === 'result' ? ' app--dashboard-mode' : ''}`}>
      <header className="app__header">
        <div className="app__header-inner">
          <img src="/logo.svg" className="app__logo" alt="Lumière Logo" />
          <div className="app__header-titles">
            <h1 className="app__title">Lumière</h1>
            <p className="app__subtitle">{t.app.subtitle}</p>
          </div>
          <div className="app__lang-switcher">
            {LANGUAGES.map(({ code, label }) => (
              <button
                key={code}
                className={`app__lang-btn${lang === code ? ' app__lang-btn--active' : ''}`}
                onClick={() => setLang(code)}
                type="button"
                aria-label={`Switch to ${label}`}
              >
                {label}
              </button>
            ))}
          </div>
          {user && (
            <div className="app__account">
              <span>{user.first_name || user.username}</span>
              <button type="button" onClick={handleOpenHistory}>
                {t.landing?.historyBtn ?? 'History'}
              </button>
              <button type="button" onClick={handleLogout}>
                {t.landing?.logoutBtn ?? 'Log out'}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Use full-bleed layout modifier when showing the dashboard */}
<main
  className={`app__main${step === 'result' ? ' app__main--dashboard' : ''}${step === 'landing' ? ' app__main--landing' : ''}`}
>
  {step === 'landing' && (
  <LandingPage
    onContinue={handleContinueToUpload}
    onAuthenticated={handleAuthenticated}
  />
)}
  
          {step === 'upload' && (
          <UploadZone
            onImageSelected={handleImageSelected}
            onOpenCamera={() => setShowCamera(true)}
          />
        )}

        {step === 'preview' && (
          <FacePreview
            imageUrl={imageUrl}
            onAnalyze={() => analyze(imageFile)}
            onChangePhoto={handleRetry}
          />
        )}

        {step === 'history' && user && (
          <AnalysisHistory
            onSelect={handleSelectHistory}
            onNewAnalysis={handleNewAnalysis}
          />
        )}

        {step === 'loading-result' && (
          <AnalysisJobLoading status={jobStatus} />
        )}

        {step === 'analyzing' && (
          imageUrl
            ? <FaceScanningAnimation imageUrl={imageUrl} status={jobStatus} />
            : <AnalysisJobLoading status={jobStatus} />
        )}

        {/* Dashboard replaces the old flat AnalysisResult layout */}
        {step === 'result' && result && (
          <ErrorBoundary onReset={handleNewAnalysis}>
            <SkinAnalysisDashboard
              result={result}
              imageUrl={imageUrl}
              onNewAnalysis={handleNewAnalysis}
            />
          </ErrorBoundary>
        )}

        {error && step !== 'analyzing' && (
          <div className="app__error">
            <p className="app__error-message">{error}</p>
            <button className="app__error-retry" onClick={handleRetry}>
              {t.errors.tryAgain}
            </button>
          </div>
        )}
      </main>

      {showCamera && (
        <CameraCapture
          onCapture={handleCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppInner />
    </LanguageProvider>
  )
}
