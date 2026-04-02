import './AnalysisResult.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import RegionCard from '../RegionCard/RegionCard.jsx'
import ToneComparison from '../ToneComparison/ToneComparison.jsx'
import Recommendations from '../Recommendations/Recommendations.jsx'

const REGION_ORDER = ['testa', 'bochecha_e', 'bochecha_d', 'nariz', 'queixo']

export default function AnalysisResult({ result, onNewAnalysis }) {
  const { t } = useLanguage()
  const {
    tom_geral_fitzpatrick,
    subtom_predominante,
    tom_geral_hex,
    regioes,
    comparacao_tons,
    imperfeicoes,
    recommendations,
  } = result

  return (
    <div className="analysis-result">
      <div className="analysis-result__hero">
        <div
          className="analysis-result__swatch"
          style={{ backgroundColor: tom_geral_hex || '#c68b6e' }}
          aria-label="Overall skin tone"
        />
        <div className="analysis-result__hero-info">
          <h2 className="analysis-result__hero-title">
            {t.fitzpatrick[tom_geral_fitzpatrick] ?? t.fitzpatrick.unknown}
          </h2>
          <p className="analysis-result__hero-subtitle">
            {t.result.undertoneLabel}: {t.undertones[subtom_predominante] ?? subtom_predominante}
          </p>
        </div>
      </div>

      <section>
        <h3 className="analysis-result__section-title">{t.result.byRegion}</h3>
        <div className="analysis-result__regions-grid">
          {REGION_ORDER.map((key) =>
            regioes[key] ? (
              <RegionCard key={key} regionName={t.regions[key] ?? key} data={regioes[key]} />
            ) : null
          )}
        </div>
      </section>

      <ToneComparison comparacoes={comparacao_tons} regioes={regioes} />

      {imperfeicoes && imperfeicoes.length > 0 && (
        <div className="analysis-result__imperfeicoes">
          <h3 className="analysis-result__section-title">{t.result.imperfectionsTitle}</h3>
          <ul className="analysis-result__imperfeicoes-list">
            {imperfeicoes.map((imp, i) => (
              <li key={i} className="analysis-result__imperfeicoes-item">
                <span>{t.imperfections[imp.tipo] ?? imp.tipo}</span>
                <div className="analysis-result__imperfeicoes-badges">
                  <span className="analysis-result__badge analysis-result__badge--regiao">
                    {t.regions[imp.regiao] ?? imp.regiao}
                  </span>
                  <span className={`analysis-result__badge analysis-result__badge--${imp.intensidade}`}>
                    {t.intensity[imp.intensidade] ?? imp.intensidade}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      <Recommendations recommendations={recommendations} />

      <div className="analysis-result__footer">
        <button className="analysis-result__btn-new" onClick={onNewAnalysis} type="button">
          {t.result.newAnalysis}
        </button>
      </div>
    </div>
  )
}
