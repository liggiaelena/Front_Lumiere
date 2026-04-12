import { useState, useEffect } from 'react'
import './RegionCard.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function RegionCard({ regionName, data }) {
  const { t } = useLanguage()
  const { tom_hex, tom_fitzpatrick, oleosidade, imperfeicoes = [], uniformidade, notas } = data
  const uniformPercent = ((uniformidade / 10) * 100).toFixed(0)
  const [animatedWidth, setAnimatedWidth] = useState(0)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setAnimatedWidth(uniformPercent)
    })
    return () => cancelAnimationFrame(frame)
  }, [uniformPercent])

  return (
    <div className="region-card">
      <div className="region-card__header">
        <div
          className="region-card__swatch"
          style={{ backgroundColor: tom_hex }}
          title={`Detected color: ${tom_hex}`}
          aria-label={`Detected skin tone: ${tom_hex}`}
        />
        <div className="region-card__header-info">
          <p className="region-card__name">{regionName}</p>
          <p className="region-card__fitzpatrick">Fitzpatrick {tom_fitzpatrick}</p>
        </div>
        <span className="region-card__badge">{t.oiliness[oleosidade] ?? oleosidade}</span>
      </div>

      <div className="region-card__uniformity">
        <div className="region-card__uniformity-label">
          <span>{t.result.uniformity}</span>
          <span>{uniformidade}/10</span>
        </div>
        <div className="region-card__uniformity-bar">
          <div
            className="region-card__uniformity-fill"
            style={{ width: `${animatedWidth}%` }}
            role="progressbar"
            aria-valuenow={uniformidade}
            aria-valuemin={0}
            aria-valuemax={10}
          />
        </div>
      </div>

      {imperfeicoes.length > 0 ? (
        <div className="region-card__imperfeicoes">
          {imperfeicoes.map((imp, i) => {
            const tipo = typeof imp === 'object' ? imp.tipo : imp
            return (
              <span key={`${tipo}-${i}`} className="region-card__imperfeicao-tag">
                {t.imperfections[tipo] ?? tipo}
              </span>
            )
          })}
        </div>
      ) : (
        <p className="region-card__no-imperfeicoes">{t.result.noImperfections}</p>
      )}

      {notas && <p className="region-card__notas">{notas}</p>}
    </div>
  )
}
