/**
 * SensitiveSkinCard.jsx
 * Lumière — Middle column, Row 3.
 * Toggle switch component for "Sensitive Skin Mode" preference.
 * Purely UI state; no API impact.
 */
import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const CARD_LABELS = {
  label:  { en: 'Sensitive Skin Mode', tw: '敏感肌模式', zh: '敏感肌模式', pt: 'Modo Pele Sensível', fr: 'Mode Peau Sensible', tr: 'Hassas Cilt Modu' },
  desc:   { en: 'Filter recommendations for sensitive & reactive skin.', tw: '篩選適合敏感及易過敏肌膚的推薦產品。', zh: '筛选适合敏感及易过敏肌肤的推荐产品。', pt: 'Filtra recomendações para pele sensível.', fr: 'Filtre les recommandations pour peau sensible.', tr: 'Hassas cilt için önerileri filtreler.' },
  active: { en: 'Active', tw: '已啟用', zh: '已启用', pt: 'Ativo', fr: 'Actif', tr: 'Aktif' },
  off:    { en: 'Off', tw: '關閉', zh: '关闭', pt: 'Desativo', fr: 'Désactivé', tr: 'Kapalı' },
}

export default function SensitiveSkinCard() {
  const { lang } = useLanguage()
  const rl = (map) => map[lang] ?? map.en

  const [enabled, setEnabled] = useState(false)

  return (
    <article className="bento-card grid-area--sensitive-skin" aria-label="Sensitive skin mode card">
      <div className="bento-card__body">
        <div className="sensitive-skin-card__inner">
          {/* Icon */}
          <div className="sensitive-skin-card__icon-area" aria-hidden="true">
            🌿
          </div>

          {/* Text */}
          <div className="sensitive-skin-card__text">
            <p className="sensitive-skin-card__label">{rl(CARD_LABELS.label)}</p>
            <p className="sensitive-skin-card__desc">{rl(CARD_LABELS.desc)}</p>
          </div>

          {/* Toggle switch */}
          <label
            className="toggle-switch"
            htmlFor="sensitive-skin-toggle"
            aria-label={`${rl(CARD_LABELS.label)}: ${enabled ? rl(CARD_LABELS.active) : rl(CARD_LABELS.off)}`}
          >
            <input
              type="checkbox"
              id="sensitive-skin-toggle"
              className="toggle-switch__input"
              checked={enabled}
              onChange={(e) => setEnabled(e.target.checked)}
            />
            <span className="toggle-switch__slider" />
          </label>
        </div>
      </div>
    </article>
  )
}
