import { useState } from 'react'
import './App.css'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext.jsx'
import UploadZone from './components/UploadZone/UploadZone.jsx'
import LandingPage from './components/LandingPage/LandingPage.jsx'
import CameraCapture from './components/CameraCapture/CameraCapture.jsx'
import FacePreview from './components/FacePreview/FacePreview.jsx'
import SkinAnalysisDashboard from './components/SkinAnalysisDashboard/SkinAnalysisDashboard.jsx'
import FaceScanningAnimation from './components/FaceScanningAnimation/FaceScanningAnimation.jsx'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.jsx'
import './components/ErrorBoundary/ErrorBoundary.css'
import { useAnalysis } from './hooks/useAnalysis.js'

const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'pt', label: 'PT' },
  { code: 'fr', label: 'FR' },
  { code: 'zh', label: '中文' },
  { code: 'tw', label: '繁中' },
  { code: 'tr', label: 'TR' },
]

function AppInner() {
  const { lang, setLang, t } = useLanguage()
  const [step, setStep] = useState('landing')
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [showCamera, setShowCamera] = useState(false)

  const { loading, error, result, analyze, reset } = useAnalysis({ setStep })

  function handleContinueToUpload() {
  setStep('upload')
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
    setStep('upload')
    setImageFile(null)
    setImageUrl(null)
    reset()
  }

  function handleNewAnalysis() {
    setStep('upload')
    setImageFile(null)
    setImageUrl(null)
    reset()
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
        </div>
      </header>

      {/* Use full-bleed layout modifier when showing the dashboard */}
<main
  className={`app__main${step === 'result' ? ' app__main--dashboard' : ''}${step === 'landing' ? ' app__main--landing' : ''}`}
>
  {step === 'landing' && (
  <LandingPage onContinue={handleContinueToUpload} />
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

        {step === 'analyzing' && imageUrl && (
          <FaceScanningAnimation imageUrl={imageUrl} />
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
