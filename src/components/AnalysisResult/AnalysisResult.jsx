import './AnalysisResult.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import RegionCard from '../RegionCard/RegionCard.jsx'
import ToneComparison from '../ToneComparison/ToneComparison.jsx'
import Recommendations from '../Recommendations/Recommendations.jsx'
import UniformityRadar from '../UniformityRadar/UniformityRadar.jsx'
import ConditionsPanel from '../ConditionsPanel/ConditionsPanel.jsx'

const ZONE_TO_REGION_KEY = {
  forehead: 'testa',
  left_cheek: 'bochecha_e',
  right_cheek: 'bochecha_d',
  center_face: 'nariz',
  chin: 'queixo',
}
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
    condition_map: conditionMapFromResult,
    segformer_condition_map: segformerConditionMapFromResult,
    skin_tone,
    medical_alert,
    recommendations_blocked,
  } = result

  // Defensive fallback so Recommendations never crashes if the backend omits
  // or sends an empty condition map.
  const safeRecommendations = Array.isArray(recommendations) ? recommendations : []
  const safeConditionMap =
    conditionMapFromResult &&
    typeof conditionMapFromResult === 'object' &&
    Object.keys(conditionMapFromResult).length > 0
      ? conditionMapFromResult
      : {
          vitiligo: false,
          melasma: false,
          wine_stain: false,
        }
  const safeSegformerConditionMap =
    segformerConditionMapFromResult &&
    typeof segformerConditionMapFromResult === 'object'
      ? segformerConditionMapFromResult
      : {}

  const conditionsByRegion = Object.entries(safeSegformerConditionMap).reduce(
    (groupedConditions, [type, details]) => {
      if (!details?.detected || !Array.isArray(details.zones)) {
        return groupedConditions
      }

      details.zones.forEach((zone) => {
        const regionKey = ZONE_TO_REGION_KEY[zone]

        if (!regionKey) {
          return
        }

        if (!groupedConditions[regionKey]) {
          groupedConditions[regionKey] = []
        }

        groupedConditions[regionKey].push({
          type,
          areaPercent: details.area_percent ?? 0,
        })
      })

      return groupedConditions
    },
    {}
  )
  const palette = REGION_ORDER.filter((k) => regioes[k]?.tom_hex).map((k) => ({
    key: k,
    label: t.regions[k] ?? k,
    hex: regioes[k].tom_hex,
  }))

  const localizedMedicalAlert = medical_alert
    ? {
        title: t.medicalAlert?.title ?? medical_alert.title ?? '',
        message: t.medicalAlert?.message ?? medical_alert.message ?? '',
        recommendation: t.medicalAlert?.recommendation ?? medical_alert.recommendation ?? '',
        severity: medical_alert.severity || 'info',
      }
    : null

  const localizedRecommendationsBlocked = {
    title: t.recommendationsBlocked?.title ?? 'Recommendations paused',
    message: t.recommendationsBlocked?.message ?? 'Makeup recommendations are paused because this result may require medical review first.',
  }
  
  return (
    <div className="analysis-result">
      {localizedMedicalAlert && (
        <div className={`medical-alert medical-alert--${localizedMedicalAlert.severity}`}>
          <strong>{localizedMedicalAlert.title}</strong>
          <p>{localizedMedicalAlert.message}</p>
          <p>{localizedMedicalAlert.recommendation}</p>
        </div>
      )}

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
        {skin_tone?.median_hex && (
          <div className="analysis-result__bisenet">
            <p className="analysis-result__palette-title"> {t.result.healthySkinTone ?? 'Healthy Skin Tone'}</p>
            <div className="analysis-result__bisenet-row">
              <div
                className="analysis-result__bisenet-swatch"
                style={{ backgroundColor: skin_tone.median_hex }}
              />
              <div className="analysis-result__bisenet-info">
                <p className="analysis-result__bisenet-hex">{skin_tone.median_hex.toUpperCase()}</p>
                <p className="analysis-result__bisenet-rgb">RGB: {skin_tone.median_rgb.join(', ')}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {palette.length > 0 && (
        <div className="analysis-result__palette">
          <p className="analysis-result__palette-title">Your Skin Palette</p>
          <div className="analysis-result__palette-swatches">
            {palette.map(({ key, label, hex }) => (
              <div key={key} className="analysis-result__palette-item">
                <div
                  className="analysis-result__palette-swatch"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
                <span className="analysis-result__palette-label">{label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <UniformityRadar regioes={regioes} />

      <section>
        <h3 className="analysis-result__section-title">{t.result.byRegion}</h3>
        <div className="analysis-result__regions-grid">
          {REGION_ORDER.map((key) =>
            regioes[key] ? (
              <RegionCard
                key={key}
                regionName={t.regions[key] ?? key}
                data={regioes[key]}
                conditions={conditionsByRegion[key] ?? []}
              />
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

      <ConditionsPanel conditionMap={safeSegformerConditionMap} />

      {recommendations_blocked ? (
        <div className="recommendations-blocked">
          <h3 className="analysis-result__section-title">{localizedRecommendationsBlocked.title}</h3>
          <p>{localizedRecommendationsBlocked.message}</p>
        </div>
      ) : (
        <Recommendations recommendations={safeRecommendations} conditionMap={safeConditionMap} />
      )}

      <div className="analysis-result__footer">
        <button className="analysis-result__btn-new" onClick={onNewAnalysis} type="button">
          {t.result.newAnalysis}
        </button>
      </div>
    </div>
  )
}
