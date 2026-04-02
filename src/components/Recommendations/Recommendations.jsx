import './Recommendations.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

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
            <p className="recommendations__shade-name">{rec.shade_name}</p>
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
