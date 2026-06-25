import './ConditionsPanel.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const ZONE_TO_REGION_KEY = {
  forehead: 'testa',
  left_cheek: 'bochecha_e',
  right_cheek: 'bochecha_d',
  center_face: 'nariz',
  chin: 'queixo',
}

function getSafePercent(value) {
  const percent = Number(value)

  if (!Number.isFinite(percent)) {
    return 0
  }

  return Math.min(100, Math.max(0, percent))
}

export default function ConditionsPanel({ conditionMap = {} }) {
  const { t } = useLanguage()

  const detectedConditions = Object.entries(conditionMap)
    .filter(([, details]) => details?.detected === true)
    .map(([type, details]) => ({
      type,
      areaPercent: getSafePercent(details?.area_percent),
      zones: Array.isArray(details?.zones) ? details.zones : [],
    }))

  if (detectedConditions.length === 0) {
    return null
  }

  return (
    <section className="conditions-panel">
      <h3 className="analysis-result__section-title">
        {t.result.conditionsTitle ?? 'Condition indicators'}
      </h3>

      <p className="conditions-panel__subtitle">
        {t.result.conditionsSubtitle ??
          'Detected segmentation indicators by facial region. This is not a medical diagnosis.'}
      </p>

      <div className="conditions-panel__list">
        {detectedConditions.map(({ type, areaPercent, zones }) => (
          <article key={type} className="conditions-panel__item">
            <div className="conditions-panel__top-row">
              <span className="conditions-panel__condition">
                {t.conditions?.[type] ?? type}
              </span>

              <span className="conditions-panel__area-value">
                {areaPercent.toFixed(2)}%
              </span>
            </div>

            <div className="conditions-panel__area-track">
              <div
                className="conditions-panel__area-fill"
                style={{ width: `${areaPercent}%` }}
                aria-label={`${areaPercent.toFixed(2)}% affected area`}
              />
            </div>

            <div className="conditions-panel__zones">
              {zones.length > 0 ? (
                zones.map((zone) => {
                  const regionKey = ZONE_TO_REGION_KEY[zone]

                  return (
                    <span key={zone} className="conditions-panel__zone">
                      {t.regions?.[regionKey] ?? zone}
                    </span>
                  )
                })
              ) : (
                <span className="conditions-panel__zone">
                  {t.result.regionUnavailable ?? 'Region unavailable'}
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}