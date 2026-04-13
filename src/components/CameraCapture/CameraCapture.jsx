import { useEffect } from 'react'
import './CameraCapture.css'
import { useCamera } from '../../hooks/useCamera.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function CameraCapture({ onCapture, onClose }) {
  const { t } = useLanguage()
  const { videoRef, error, isReady, startCamera, stopCamera, capture } = useCamera(t.camera)

  useEffect(() => {
    startCamera()
    return () => stopCamera()
  }, [startCamera, stopCamera])

  async function handleCapture() {
    const result = await capture()
    if (result) {
      stopCamera()
      onCapture(result.blob, result.previewUrl)
    }
  }

  return (
    <div className="camera-capture" role="dialog" aria-modal="true" aria-label={t.camera.title}>
      <div className="camera-capture__modal">
        <div className="camera-capture__header">
          <h2 className="camera-capture__title">{t.camera.title}</h2>
          <button
            className="camera-capture__close"
            onClick={() => { stopCamera(); onClose() }}
            type="button"
            aria-label={t.camera.close}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="camera-capture__body">
          {error ? (
            <div className="camera-capture__error">
              <p className="camera-capture__error-text">{error}</p>
            </div>
          ) : (
            <>
              <video ref={videoRef} className="camera-capture__video" autoPlay playsInline muted />

              {/* Dark cutout overlay — SVG with transparent oval hole */}
              <svg
                className="camera-capture__overlay"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <mask id="oval-mask">
                    <rect width="100" height="100" fill="white" />
                    <ellipse cx="50" cy="48" rx="28" ry="36" fill="black" />
                  </mask>
                </defs>
                <rect width="100" height="100" fill="rgba(0,0,0,0.55)" mask="url(#oval-mask)" />
                {/* Oval border */}
                <ellipse
                  cx="50" cy="48" rx="28" ry="36"
                  fill="none"
                  stroke="rgba(255,255,255,0.85)"
                  strokeWidth="0.6"
                  strokeDasharray="3 1.5"
                />
              </svg>

              {/* Alignment hint */}
              <p className="camera-capture__hint" aria-live="polite">
                Align your face inside the oval
              </p>
            </>
          )}
        </div>

        <div className="camera-capture__footer">
          <button
            className="camera-capture__shutter"
            onClick={handleCapture}
            disabled={!isReady || !!error}
            type="button"
            aria-label={t.camera.capture}
          />
        </div>
      </div>
    </div>
  )
}
