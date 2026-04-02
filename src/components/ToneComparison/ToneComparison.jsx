import './ToneComparison.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { deltaToPercent } from '../../utils/colorUtils.js'

function getSwatchColor(regioes, regionKey) {
  return regioes?.[regionKey]?.tom_hex || '#ccc'
}

export default function ToneComparison({ comparacoes, regioes }) {
  const { t } = useLanguage()
  if (!comparacoes || Object.keys(comparacoes).length === 0) return null

  return (
    <div className="tone-comparison">
      <h3 className="tone-comparison__title">{t.result.toneComparison}</h3>
      <div className="tone-comparison__list">
        {Object.entries(comparacoes).map(([key, { delta, nivel }]) => {
          const [regionA, regionB] = key.split('_vs_')
          const labelA = t.regions[regionA] ?? regionA
          const labelB = t.regions[regionB] ?? regionB
          const colorA = getSwatchColor(regioes, regionA)
          const colorB = getSwatchColor(regioes, regionB)
          const percent = deltaToPercent(delta)

          return (
            <div key={key} className="tone-comparison__item">
              <div className="tone-comparison__swatches">
                <div className="tone-comparison__swatch" style={{ backgroundColor: colorA }} title={labelA} />
                <span className="tone-comparison__swatch-label">{labelA}</span>
                <span className="tone-comparison__vs">{t.result.vs}</span>
                <div className="tone-comparison__swatch" style={{ backgroundColor: colorB }} title={labelB} />
                <span className="tone-comparison__swatch-label">{labelB}</span>
              </div>

              <div className="tone-comparison__bar-wrap">
                <div className="tone-comparison__bar">
                  <div
                    className={`tone-comparison__bar-fill tone-comparison__bar-fill--${nivel}`}
                    style={{ width: `${percent}%` }}
                    role="progressbar"
                    aria-valuenow={delta}
                    aria-valuemin={0}
                    aria-valuemax={50}
                  />
                </div>
                <span className={`tone-comparison__level tone-comparison__level--${nivel}`}>
                  {t.comparison[nivel] ?? nivel}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
