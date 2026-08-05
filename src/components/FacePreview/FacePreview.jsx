import { useState, useEffect, useRef } from 'react'
import './FacePreview.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function FacePreview({ imageUrl, onAnalyze, onChangePhoto }) {
  const { t, lang } = useLanguage()
  const [consented, setConsented] = useState(false)
  const [showConsentError, setShowConsentError] = useState(false)
  const [hasReadGdpr, setHasReadGdpr] = useState(false)
  const [showGdprModal, setShowGdprModal] = useState(false)
  const gdprContainerRef = useRef(null)

  const handleGdprScroll = (e) => {
    const target = e.target;
    // 預留 2 像素的容錯空間，確保不論在哪個裝置上都能順利解鎖
    const isBottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <= 2;
    if (isBottom) {
      setHasReadGdpr(true);
    }
  };

  useEffect(() => {
    function checkScrollable() {
      const target = gdprContainerRef.current
      if (target) {
        // If content height is less than or equal to container height + 2, it means
        // there is no scrollbar (the content is short and fully visible).
        // In that case, we should automatically set hasReadGdpr to true.
        const isScrollable = target.scrollHeight > target.clientHeight + 2
        if (!isScrollable) {
          setHasReadGdpr(true)
        } else {
          // If it is scrollable, check if user is already at the bottom
          const isAtBottom = Math.abs(target.scrollHeight - target.scrollTop - target.clientHeight) <= 2
          setHasReadGdpr(isAtBottom)
        }
      }
    }

    // Run check immediately on mount and when text changes
    checkScrollable()

    // Also check after a short layout rendering delay
    const timer = setTimeout(checkScrollable, 150)
    return () => clearTimeout(timer)
  }, [t, showGdprModal])

  function handleAnalyze() {
    if (!hasReadGdpr || !consented) {
      setShowConsentError(true)
      return
    }
    onAnalyze()
  }

  const detailedTermsText = {
    en: 'Detailed Terms',
    tw: '詳細條款',
    zh: '详细条款',
    pt: 'Termos Detalhados',
    fr: 'Termes Détaillés',
    tr: 'Detaylı Şartlar'
  }[lang] || '詳細條款';

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
            <label 
              className="face-preview__gdpr-checkbox-container" 
              style={{ opacity: hasReadGdpr ? 1 : 0.6 }}
              onClick={(e) => {
                if (!hasReadGdpr) {
                  e.preventDefault()
                  setShowGdprModal(true)
                }
              }}
            >
              <input
                type="checkbox"
                className="face-preview__consent-checkbox"
                checked={consented}
                disabled={!hasReadGdpr}
                onChange={(e) => {
                  setConsented(e.target.checked)
                  if (e.target.checked) setShowConsentError(false)
                }}
              />
              <span className="face-preview__consent-text">
                {t.gdprConsent?.checkbox}
                <button
                  type="button"
                  className="face-preview__terms-link"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowGdprModal(true)
                  }}
                >
                  ({detailedTermsText})
                </button>
              </span>
            </label>
            {showConsentError && (
              <p className="face-preview__consent-error" role="alert">
                {t.preview.consentRequired}
              </p>
            )}
          </div>

          <div className="face-preview__actions">
            <button
              className={`face-preview__btn face-preview__btn--primary${(!consented || !hasReadGdpr) ? ' face-preview__btn--disabled' : ''}`}
              onClick={handleAnalyze}
              type="button"
              disabled={!consented || !hasReadGdpr}
              aria-disabled={!consented || !hasReadGdpr}
            >
              {t.preview.analyze}
            </button>
            <button className="face-preview__btn face-preview__btn--ghost" onClick={onChangePhoto} type="button">
              {t.preview.changePhoto}
            </button>
          </div>
        </div>
      </div>

      {/* GDPR Modal Popup */}
      {showGdprModal && (
        <div className="gdpr-modal-overlay">
          <div className="gdpr-modal-card">
            <button
              className={`gdpr-modal-close-btn${!hasReadGdpr ? ' gdpr-modal-close-btn--disabled' : ''}`}
              onClick={() => {
                if (hasReadGdpr) {
                  setShowGdprModal(false)
                }
              }}
              type="button"
              disabled={!hasReadGdpr}
              aria-label="Close terms"
            >
              &times;
            </button>
            <h3 className="gdpr-modal-title">{t.gdprConsent?.title}</h3>
            <div
              ref={gdprContainerRef}
              className="gdpr-modal-text-container"
              onScroll={handleGdprScroll}
            >
              <p className="gdpr-modal-paragraph">{t.gdprConsent?.body}</p>
              {t.gdprConsent?.retention && (
                <p className="gdpr-modal-paragraph">
                  <strong>Data Retention:</strong> {t.gdprConsent.retention}
                </p>
              )}
              {t.gdprConsent?.withdrawal && (
                <p className="gdpr-modal-paragraph">
                  <strong>Consent Withdrawal:</strong> {t.gdprConsent.withdrawal}
                </p>
              )}
            </div>
            {!hasReadGdpr && (
              <p className="gdpr-modal-helper-text">
                {lang === 'tw' ? '請滾動至最底部以閱讀完整條款' : 
                 lang === 'zh' ? '请滚动至最底部以阅读完整条款' :
                 lang === 'pt' ? 'Por favor, role até o fim para ler todos os termos' :
                 lang === 'fr' ? 'Veuillez faire défiler jusqu\'au bas pour lire toutes les conditions' :
                 lang === 'tr' ? 'Lütfen tüm şartları okumak için en aşağıya kaydırın' :
                 'Please scroll to the bottom to read all terms'}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
