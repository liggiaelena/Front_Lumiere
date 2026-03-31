import { useEffect } from 'react'
import './CameraCapture.css'
import { useCamera } from '../../hooks/useCamera.js'

export default function CameraCapture({ onCapture, onClose }) {
  const { videoRef, error, isReady, startCamera, stopCamera, capture } = useCamera()

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
    <div className="camera-capture" role="dialog" aria-modal="true" aria-label="Camera">
      <div className="camera-capture__modal">
        <div className="camera-capture__header">
          <h2 className="camera-capture__title">Take a photo</h2>
          <button
            className="camera-capture__close"
            onClick={() => { stopCamera(); onClose() }}
            type="button"
            aria-label="Close camera"
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
              <video
                ref={videoRef}
                className="camera-capture__video"
                autoPlay
                playsInline
                muted
              />
              <div className="camera-capture__guide" aria-hidden="true">
                <div className="camera-capture__guide-oval" />
              </div>
            </>
          )}
        </div>

        <div className="camera-capture__footer">
          <button
            className="camera-capture__shutter"
            onClick={handleCapture}
            disabled={!isReady || !!error}
            type="button"
            aria-label="Capture photo"
          />
        </div>
      </div>
    </div>
  )
}
