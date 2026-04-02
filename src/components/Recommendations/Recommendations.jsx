import './Recommendations.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const FITZPATRICK_COLORS = {
  1: '#F5E6D3',
  2: '#EDD5B8',
  3: '#D4A574',
  4: '#A0522D',
  5: '#7B3F00',
  6: '#4A2010',
}

function shadeColor(fitzpatrickRange) {
  const mid = Math.round((fitzpatrickRange[0] + fitzpatrickRange[1]) / 2)
  return FITZPATRICK_COLORS[Math.min(6, Math.max(1, mid))] ?? '#c68b6e'
}

export default function Recommendations({ recommendations }) {
  const { t } = useLanguage()
  if (!recommendations || recommendations.length === 0) return null

  return (
    <section className="recommendations">
      <h3 className="recommendations__title">{t.result.foundationTitle}</h3>
      <p className="recommendations__subtitle">{t.result.foundationSubtitle}</p>
      <div className="recommendations__grid">
        {recommendations.map((rec, i) => (
          <div key={i} className="recommendations__card">
            <div className="recommendations__card-header">
              <span className="recommendations__brand">{rec.brand}</span>
              <span className="recommendations__undertone-badge">
                {t.undertoneShort[rec.undertone] ?? rec.undertone}
              </span>
            </div>
            <div className="recommendations__shade-row">
              <div
                className="recommendations__shade-dot"
                style={{ backgroundColor: shadeColor(rec.fitzpatrick_range) }}
                title={`Approximate shade: ${shadeColor(rec.fitzpatrick_range)}`}
              />
              <p className="recommendations__shade-name">{rec.shade_name}</p>
            </div>
            <div className="recommendations__card-footer">
              <span className="recommendations__price">{rec.price_range}</span>
              <a
                className="recommendations__link"
                href={rec.where_to_buy}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.result.findIt}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
