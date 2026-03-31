import './AnalysisResult.css'
import RegionCard from '../RegionCard/RegionCard.jsx'
import ToneComparison from '../ToneComparison/ToneComparison.jsx'
import { fitzpatrickLabel, subtomLabel, imperfeicaoLabel, regiaoLabel, intensidadeLabel } from '../../utils/colorUtils.js'

const REGION_ORDER = [
  { key: 'testa', label: 'Testa' },
  { key: 'bochecha_e', label: 'Bochecha esq.' },
  { key: 'bochecha_d', label: 'Bochecha dir.' },
  { key: 'nariz', label: 'Nariz' },
  { key: 'queixo', label: 'Queixo' },
]

export default function AnalysisResult({ result, onNewAnalysis }) {
  const {
    tom_geral_fitzpatrick,
    subtom_predominante,
    tom_geral_hex,
    regioes,
    comparacao_tons,
    imperfeicoes,
  } = result

  return (
    <div className="analysis-result">
      <div className="analysis-result__hero">
        <div
          className="analysis-result__swatch"
          style={{ backgroundColor: tom_geral_hex || '#c68b6e' }}
          aria-label={`Tom de pele geral`}
        />
        <div className="analysis-result__hero-info">
          <h2 className="analysis-result__hero-title">
            {fitzpatrickLabel(tom_geral_fitzpatrick)}
          </h2>
          <p className="analysis-result__hero-subtitle">
            Subtom predominante: {subtomLabel(subtom_predominante)}
          </p>
        </div>
      </div>

      <section>
        <h3 className="analysis-result__section-title">Análise por região</h3>
        <div className="analysis-result__regions-grid">
          {REGION_ORDER.map(({ key, label }) =>
            regioes[key] ? (
              <RegionCard key={key} regionName={label} data={regioes[key]} />
            ) : null
          )}
        </div>
      </section>

      <ToneComparison comparacoes={comparacao_tons} regioes={regioes} />

      {imperfeicoes && imperfeicoes.length > 0 && (
        <div className="analysis-result__imperfeicoes">
          <h3 className="analysis-result__section-title">Imperfeições detectadas</h3>
          <ul className="analysis-result__imperfeicoes-list">
            {imperfeicoes.map((imp, i) => (
              <li key={i} className="analysis-result__imperfeicoes-item">
                <span>{imperfeicaoLabel(imp.tipo)}</span>
                <div className="analysis-result__imperfeicoes-badges">
                  <span className="analysis-result__badge analysis-result__badge--regiao">
                    {regiaoLabel(imp.regiao)}
                  </span>
                  <span className={`analysis-result__badge analysis-result__badge--${imp.intensidade}`}>
                    {intensidadeLabel(imp.intensidade)}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="analysis-result__footer">
        <button
          className="analysis-result__btn-new"
          onClick={onNewAnalysis}
          type="button"
        >
          Nova análise
        </button>
      </div>
    </div>
  )
}
