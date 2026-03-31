import './RegionCard.css'
import { oleosidadeLabel, imperfeicaoLabel } from '../../utils/colorUtils.js'

export default function RegionCard({ regionName, data }) {
  const { tom_hex, tom_fitzpatrick, oleosidade, imperfeicoes, uniformidade, notas } = data
  const uniformPercent = ((uniformidade / 10) * 100).toFixed(0)

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
        <span className="region-card__badge">{oleosidadeLabel(oleosidade)}</span>
      </div>

      <div className="region-card__uniformity">
        <div className="region-card__uniformity-label">
          <span>Uniformity</span>
          <span>{uniformidade}/10</span>
        </div>
        <div className="region-card__uniformity-bar">
          <div
            className="region-card__uniformity-fill"
            style={{ width: `${uniformPercent}%` }}
            role="progressbar"
            aria-valuenow={uniformidade}
            aria-valuemin={0}
            aria-valuemax={10}
          />
        </div>
      </div>

      {imperfeicoes.length > 0 ? (
        <div className="region-card__imperfeicoes">
          {imperfeicoes.map((imp) => (
            <span key={imp} className="region-card__imperfeicao-tag">
              {imperfeicaoLabel(imp)}
            </span>
          ))}
        </div>
      ) : (
        <p className="region-card__no-imperfeicoes">No imperfections detected</p>
      )}

      {notas && <p className="region-card__notas">{notas}</p>}
    </div>
  )
}
