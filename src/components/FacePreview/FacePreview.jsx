import { useState } from 'react'
import './FacePreview.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function FacePreview({ imageUrl, onAnalyze, onChangePhoto }) {
  const { t } = useLanguage()
  const [consented, setConsented] = useState(false)
  const [showConsentError, setShowConsentError] = useState(false)

  function handleAnalyze() {
    if (!consented) {
      setShowConsentError(true)
      return
    }
    onAnalyze()
  }

  return (
    <div className="face-preview">
      <div className="face-preview__layout">
        <div className="face-preview__image-wrap">
          <img src={imageUrl} alt="Selected photo for analysis" className="face-preview__image" />
        </div>

        <div className="face-preview__info">
          <div>
            <h2 className="face-preview__title">{t.preview.title}</h2>
            <ul className="face-preview__checklist">
              {t.preview.checklist.map((item) => (
                <li key={item} className="face-preview__checklist-item">
                  <svg className="face-preview__check-icon" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="face-preview__consent">
            <label className="face-preview__consent-label">
              <input
                type="checkbox"
                className="face-preview__consent-checkbox"
                checked={consented}
                onChange={(e) => {
                  setConsented(e.target.checked)
                  if (e.target.checked) setShowConsentError(false)
                }}
              />
              <span>{t.preview.consentLabel}</span>
            </label>
            {showConsentError && (
              <p className="face-preview__consent-error" role="alert">
                {t.preview.consentRequired}
              </p>
            )}
          </div>

          <div className="face-preview__actions">
            <button
              className={`face-preview__btn face-preview__btn--primary${!consented ? ' face-preview__btn--disabled' : ''}`}
              onClick={handleAnalyze}
              type="button"
              aria-disabled={!consented}
            >
              {t.preview.analyze}
            </button>
            <button className="face-preview__btn face-preview__btn--ghost" onClick={onChangePhoto} type="button">
              {t.preview.changePhoto}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
