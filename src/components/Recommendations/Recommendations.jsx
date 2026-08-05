import './Recommendations.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function Recommendations({ recommendations, conditionMap, reliable = true }) {
  const { t: translations, lang } = useLanguage()

  const safeConditionMap = conditionMap && typeof conditionMap === 'object' ? conditionMap : {}
  const showSpfWarning = safeConditionMap?.melasma === true
  const showDermatologyBadge = safeConditionMap?.vitiligo === true || safeConditionMap?.wine_stain === true
  const showColorCorrectorStep = safeConditionMap?.wine_stain === true || safeConditionMap?.melasma === true

  const FOOTNOTES = {
    en: 'Tested: Dermatologically tested',
    tw: '經測試：經臨床皮膚科測試',
    zh: '经测试：经临床皮肤科测试',
    pt: 'Testado: Testado dermatologicamente',
    fr: 'Testé : Testé dermatologiquement',
    tr: 'Test edilmiştir: Dermatolojik olarak test edilmiştir',
  }

  const NO_RELIABLE_MATCH = {
    en: 'No shade was close enough to your skin tone — showing the nearest available options instead.',
    tw: '沒有與您的膚色足夠接近的色號，以下顯示最接近的選項。',
    zh: '没有与您的肤色足够接近的色号，以下显示最接近的选项。',
    pt: 'Nenhum tom ficou próximo o suficiente do seu tom de pele — mostrando as opções mais próximas disponíveis.',
    fr: "Aucune teinte n'était assez proche de votre teint — affichage des options les plus proches disponibles.",
    tr: 'Ten renginize yeterince yakın bir ton bulunamadı — bunun yerine en yakın seçenekler gösteriliyor.',
  }

  const t = (key, fallback = '') => {
    const value = String(key)
      .split('.')
      .reduce((acc, part) => {
        if (acc && typeof acc === 'object' && part in acc) {
          return acc[part]
        }
        return undefined
      }, translations && typeof translations === 'object' ? translations : {})

    return typeof value === 'string' ? value : fallback
  }

  if (!recommendations || recommendations.length === 0) return null

  return (
    <section className="recommendations" data-condition-map={JSON.stringify(safeConditionMap)}>
      {showSpfWarning && (
        <div className="spf-warning-banner">{t('recommendations.banner.spfWarning')}</div>
      )}
      {!reliable && (
        <div className="spf-warning-banner">{NO_RELIABLE_MATCH[lang] || NO_RELIABLE_MATCH.en}</div>
      )}

      <h3 className="recommendations__title">{t('result.foundationTitle', 'Foundation Matches')}</h3>
      <p className="recommendations__subtitle">{t('result.foundationSubtitle', 'Shades selected for your skin tone and undertone')}</p>
      <p className="recommendations__disclaimer">{FOOTNOTES[lang] || FOOTNOTES.en}</p>

      <div className="recommendations__grid">
        {recommendations.reduce((acc, rec, index) => {
          const category = typeof rec?.category === 'string' ? rec.category : ''
          const shouldInsertStep = showColorCorrectorStep && category === 'foundation' && !acc.hasShownFoundationStep

          if (shouldInsertStep) {
            acc.hasShownFoundationStep = true
            acc.elements.push(
              <div key={`step-${index}`} className="color-corrector-step">
                <h3>{t('recommendations.step.colorCorrectorTitle', 'Step 1: Color Correction')}</h3>
                <p>{t('recommendations.step.colorCorrectorDesc', 'Apply a color corrector before your foundation to neutralize hyperpigmentation or redness.')}</p>
              </div>
            )
          }

          acc.elements.push(
            <div key={rec?.id ?? index} className="recommendations__card">
              <div className="recommendations__card-header">
                <span className="recommendations__brand">{rec?.brand ?? ''}</span>
              </div>
              <div className="recommendations__badges-row">
                {showDermatologyBadge && (
                  <span className="dermatology-badge">{t('recommendations.badge.dermatologicallyTested', 'Dermatologically Tested')}</span>
                )}
                <span className="recommendations__undertone-badge">
                  {translations?.undertoneShort?.[rec?.undertone] ?? rec?.undertone ?? ''}
                </span>
              </div>
              <div className="recommendations__shade-row">
                <div className="swatch-isolation-wrapper">
                  <div
                    className="recommendations__shade-dot"
                    style={{ backgroundColor: rec?.shade_hex ?? 'var(--color-exception-text)' }}
                    title={rec?.shade_hex ?? ''}
                  />
                </div>
                <p className="recommendations__shade-name">{rec?.shade_name ?? ''}</p>
              </div>
              <div className="recommendations__card-footer">
                <span className="recommendations__price">{rec?.price_range ?? ''}</span>
                <a
                  className="recommendations__link"
                  href={rec?.where_to_buy ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t('result.findIt', 'Find it →')}
                </a>
              </div>
            </div>
          )

          return acc
        }, { elements: [], hasShownFoundationStep: false }).elements}
      </div>
    </section>
  )
}
