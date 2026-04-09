import { useState } from 'react'
import './App.css'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext.jsx'
import UploadZone from './components/UploadZone/UploadZone.jsx'
import CameraCapture from './components/CameraCapture/CameraCapture.jsx'
import FacePreview from './components/FacePreview/FacePreview.jsx'
import AnalysisResult from './components/AnalysisResult/AnalysisResult.jsx'
import FaceScanningAnimation from './components/FaceScanningAnimation/FaceScanningAnimation.jsx'
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
  const [step, setStep] = useState('upload')
  const [imageFile, setImageFile] = useState(null)
  const [imageUrl, setImageUrl] = useState(null)
  const [showCamera, setShowCamera] = useState(false)

  const { loading, error, result, analyze, reset } = useAnalysis({ setStep })

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
    <div className="app">
      <header className="app__header">
        <div className="app__header-inner">
          <div className="app__logo" aria-hidden="true" />
          <div className="app__header-titles">
            <h1 className="app__title">{t.app.title}</h1>
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

      <main className="app__main">
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

        {step === 'result' && result && (
          <AnalysisResult
            result={result}
            onNewAnalysis={handleNewAnalysis}
          />
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
