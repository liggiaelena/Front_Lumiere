import './ToneComparison.css'
import { deltaToPercent, regiaoLabel } from '../../utils/colorUtils.js'

function parsePairKey(key) {
  const [a, b] = key.split('_vs_')
  return { labelA: regiaoLabel(a), labelB: regiaoLabel(b) }
}

function getSwatchColor(regioes, regionKey) {
  return regioes?.[regionKey]?.tom_hex || '#ccc'
}

export default function ToneComparison({ comparacoes, regioes }) {
  if (!comparacoes || Object.keys(comparacoes).length === 0) return null

  return (
    <div className="tone-comparison">
      <h3 className="tone-comparison__title">Comparação de tons por região</h3>
      <div className="tone-comparison__list">
        {Object.entries(comparacoes).map(([key, { delta, nivel }]) => {
          const [regionA, regionB] = key.split('_vs_')
          const { labelA, labelB } = parsePairKey(key)
          const colorA = getSwatchColor(regioes, regionA)
          const colorB = getSwatchColor(regioes, regionB)
          const percent = deltaToPercent(delta)

          return (
            <div key={key} className="tone-comparison__item">
              <div className="tone-comparison__swatches">
                <div
                  className="tone-comparison__swatch"
                  style={{ backgroundColor: colorA }}
                  title={labelA}
                />
                <span className="tone-comparison__swatch-label">{labelA}</span>
                <span className="tone-comparison__vs">vs</span>
                <div
                  className="tone-comparison__swatch"
                  style={{ backgroundColor: colorB }}
                  title={labelB}
                />
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
                  {nivel}
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
