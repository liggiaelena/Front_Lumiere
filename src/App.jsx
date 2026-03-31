import { useState } from 'react'
import './App.css'
import UploadZone from './components/UploadZone/UploadZone.jsx'
import CameraCapture from './components/CameraCapture/CameraCapture.jsx'
import FacePreview from './components/FacePreview/FacePreview.jsx'
import AnalysisResult from './components/AnalysisResult/AnalysisResult.jsx'
import LoadingSpinner from './components/LoadingSpinner/LoadingSpinner.jsx'
import { useAnalysis } from './hooks/useAnalysis.js'

export default function App() {
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

  function handleAnalyze() {
    analyze(imageFile)
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
          <div>
            <h1 className="app__title">Skin Analyzer</h1>
            <p className="app__subtitle">Análise inteligente do seu tom de pele</p>
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
            onAnalyze={handleAnalyze}
            onChangePhoto={handleRetry}
          />
        )}

        {step === 'analyzing' && (
          <LoadingSpinner message="Analisando sua pele..." />
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
              Tentar novamente
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
