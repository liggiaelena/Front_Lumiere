/**
 * SkinAnalysisDashboard.jsx
 * Lumière — Main dashboard wrapper for the "Intelligent Skin Tone Analysis" result step.
 *
 * Replaces the old flat-stack <AnalysisResult> layout with a
 * Sidebar + 3-column Bento Grid SPA.
 *
 * State:
 *   activeSection  {string} — sidebar nav key: 'overview'|'regions'|'conditions'|'recommendations'
 *   viewMode       {string} — face diagram mode: 'zones'|'heatmap'
 *
 * Props:
 *   result        {object}   — raw API JSON result
 *   onNewAnalysis {function} — callback to reset to upload step
 */
import { useEffect, useState } from 'react'
import './SkinAnalysisDashboard.css'

/* Sub-layout components */
import DashboardSidebar from './DashboardSidebar.jsx'

/* Bento Grid cards */
import MainVisualCard from './MainVisualCard.jsx'
import SkinToneCard from './SkinToneCard.jsx'
import RegionDetailCard from './RegionDetailCard.jsx'
import SensitiveSkinCard from './SensitiveSkinCard.jsx'
import TextureSpotsCard from './TextureSpotsCard.jsx'
import RecommendationsCard from './RecommendationsCard.jsx'

/* Existing sub-components (re-used in section views) */
import UniformityRadar from '../UniformityRadar/UniformityRadar.jsx'
import ToneComparison from '../ToneComparison/ToneComparison.jsx'
import RegionCard from '../RegionCard/RegionCard.jsx'
import ConditionsPanel from '../ConditionsPanel/ConditionsPanel.jsx'
import Recommendations from '../Recommendations/Recommendations.jsx'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import { getCatalogAllergens, refreshRecommendations } from '../../services/api.js'

/* ── Constants ── */
const REGION_ORDER = ['testa', 'bochecha_e', 'bochecha_d', 'nariz', 'queixo']
const ZONE_TO_REGION_KEY = {
  forehead: 'testa', left_cheek: 'bochecha_e', right_cheek: 'bochecha_d',
  center_face: 'nariz', chin: 'queixo',
}

const CONFIRM_TEXT = { en: 'Confirm', tw: '確認', zh: '确认', pt: 'Confirmar', fr: 'Confirmer', tr: 'Onayla' }

/* Mobile bottom tab bar labels */
const TAB_LABELS = {
  overview: { en: 'Overview', tw: '總覽', zh: '总览', pt: 'Visão', fr: 'Aperçu', tr: 'Genel' },
  regions: { en: 'Regions', tw: '分區', zh: '区域', pt: 'Regiões', fr: 'Régions', tr: 'Bölgeler' },
  conditions: { en: 'Conditions', tw: '膚況', zh: '肤况', pt: 'Condições', fr: 'Conditions', tr: 'Durum' },
  recommendations: { en: 'Products', tw: '推薦', zh: '推荐', pt: 'Produtos', fr: 'Produits', tr: 'Ürünler' },
}

function TabIcon({ section }) {
  const icons = {
    overview: <path d="M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 3l3.5-6 3.5 6z" />,
    regions: <><circle cx="12" cy="8" r="3" /><path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" /></>,
    conditions: <><path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" /></>,
    recommendations: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />,
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {icons[section]}
    </svg>
  )
}

/* ── Main Component ── */
export default function SkinAnalysisDashboard({ result, imageUrl, onNewAnalysis }) {
  const { lang, t } = useLanguage()
  const [activeSection, setActiveSection] = useState('overview')
  const [viewMode, setViewMode] = useState('zones')
  const [showMedicalModal, setShowMedicalModal] = useState(true)
  const [selectedRegion, setSelectedRegion] = useState(null)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [sensitiveMode, setSensitiveMode] = useState(false)
  const [catalogAllergens, setCatalogAllergens] = useState([])
  const [selectedAllergens, setSelectedAllergens] = useState([])
  const [recommendationLoading, setRecommendationLoading] = useState(false)
  const [recommendationError, setRecommendationError] = useState('')
  const [recommendationStatus, setRecommendationStatus] = useState(result?.recommendations_status || 'ready')
  const [recommendationSummary, setRecommendationSummary] = useState(result?.recommendations_search_summary || '')
  const [recommendationModel, setRecommendationModel] = useState(result?.recommendations_model || '')
  const [recommendationStrategy, setRecommendationStrategy] = useState(result?.recommendations_strategy || '')
  const [recommendationFallbackUsed, setRecommendationFallbackUsed] = useState(result?.recommendations_fallback_used === true)
  const [currentRecommendations, setCurrentRecommendations] = useState(
    Array.isArray(result?.recommendations) ? result.recommendations : []
  )

  /* ── Destructure API result defensively ── */
  const {
    tom_geral_fitzpatrick,
    subtom_predominante,
    tom_geral_hex,
    regioes = {},
    comparacao_tons = {},
    imperfeicoes = [],
    recommendations = [],
    condition_map: conditionMapFromResult,
    segformer_condition_map: segformerMapFromResult,
    skin_tone,
    medical_alert,
    recommendations_blocked,
    recommendations_status,
    recommendations_error,
    recommendations_search_summary,
    recommendations_model,
    recommendations_strategy,
    recommendations_fallback_used,
    condition_overlay,
    face_detection,
    face_image,
    face_regions,
  } = result ?? {}

  const safeRecommendations = Array.isArray(currentRecommendations) ? currentRecommendations : []

  useEffect(() => {
    setCurrentRecommendations(Array.isArray(recommendations) ? recommendations : [])
    setRecommendationStatus(recommendations_status || 'ready')
    setRecommendationError(recommendations_error || '')
    setRecommendationSummary(recommendations_search_summary || '')
    setRecommendationModel(recommendations_model || '')
    setRecommendationStrategy(recommendations_strategy || '')
    setRecommendationFallbackUsed(recommendations_fallback_used === true)
  }, [recommendations, recommendations_status, recommendations_error, recommendations_search_summary, recommendations_model, recommendations_strategy, recommendations_fallback_used])

  useEffect(() => {
    let active = true
    getCatalogAllergens()
      .then((values) => { if (active) setCatalogAllergens(values) })
      .catch(() => { if (active) setRecommendationError('Unable to load allergen options.') })
    return () => { active = false }
  }, [])

  const updateRecommendations = async (excluded) => {
    if (!result?.id) {
      setRecommendationError('This analysis has no ID. Please run a new analysis.')
      return
    }
    setRecommendationLoading(true)
    setRecommendationStatus('loading')
    setRecommendationError('')
    try {
      const response = await refreshRecommendations(result.id, excluded)
      setCurrentRecommendations(Array.isArray(response?.recommendations) ? response.recommendations : [])
      setRecommendationStatus(response?.recommendations_status || 'ready')
      setRecommendationError(response?.recommendations_error || '')
      setRecommendationSummary(response?.recommendations_search_summary || '')
      setRecommendationModel(response?.recommendations_model || '')
      setRecommendationStrategy(response?.recommendations_strategy || '')
      setRecommendationFallbackUsed(response?.recommendations_fallback_used === true)
    } catch (error) {
      setRecommendationStatus('unavailable')
      setRecommendationError(error?.response?.data?.detail || 'Unable to update live recommendations.')
    } finally {
      setRecommendationLoading(false)
    }
  }

  const handleSensitiveModeChange = (enabled) => {
    setSensitiveMode(enabled)
    if (!enabled) {
      setSelectedAllergens([])
      updateRecommendations([])
    }
  }

  const handleAllergenChange = (allergen, checked) => {
    const next = checked
      ? [...new Set([...selectedAllergens, allergen])]
      : selectedAllergens.filter((value) => value !== allergen)
    setSelectedAllergens(next)
  }
  const safeSegformerMap = (segformerMapFromResult && typeof segformerMapFromResult === 'object')
    ? segformerMapFromResult : {}
  const safeConditionMap = {
    melasma: safeSegformerMap?.melasma?.detected === true,
    vitiligo: safeSegformerMap?.vitiligo?.detected === true,
    wine_stain: safeSegformerMap?.wine_stain?.detected === true,
  }

  /* Build conditionsByRegion for RegionCard */
  const conditionsByRegion = Object.entries(safeSegformerMap).reduce((acc, [type, details]) => {
    if (!details?.detected || !Array.isArray(details.zones)) return acc
    details.zones.forEach(zone => {
      const regionKey = ZONE_TO_REGION_KEY[zone]
      if (!regionKey) return
      if (!acc[regionKey]) acc[regionKey] = []
      acc[regionKey].push({ type, areaPercent: details.area_percent ?? 0 })
    })
    return acc
  }, {})

  const detectedConditions = Object.entries(safeSegformerMap)
    .filter(([, details]) => details?.detected === true)

  /* Localized medical alert */
  const localizedAlert = medical_alert ? {
    title: t.medicalAlert?.title ?? medical_alert.title ?? '',
    message: t.medicalAlert?.message ?? medical_alert.message ?? '',
    recommendation: t.medicalAlert?.recommendation ?? medical_alert.recommendation ?? '',
  } : null

  const rl = (map) => map[lang] ?? map.en

  return (
    <>
      {/* ── Medical Alert Modal (fullscreen overlay, shown first) ── */}
      {localizedAlert && showMedicalModal && (
        <div className="medical-modal-overlay" role="dialog" aria-modal="true" aria-label="Medical disclaimer">
          <div className="medical-modal-card">
            <h3 className="medical-modal-title">
              <svg className="medical-modal-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
              </svg>
              {localizedAlert.title}
            </h3>
            <div className="medical-modal-body">
              <p>{localizedAlert.message}</p>
              <p className="medical-modal-recommendation">{localizedAlert.recommendation}</p>
            </div>
            <button
              type="button"
              id="medical-modal-confirm"
              className="medical-modal-confirm-btn"
              onClick={() => setShowMedicalModal(false)}
            >
              {CONFIRM_TEXT[lang] || CONFIRM_TEXT.en}
            </button>
          </div>
        </div>
      )}

      {/* ── Dashboard Shell ── */}
      <div className={`dashboard ${isSidebarCollapsed ? 'dashboard--sidebar-collapsed' : ''}`}>
        {/* Left Sidebar */}
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onNewAnalysis={onNewAnalysis}
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />

        {/* Main content area */}
        <div className="dashboard__body">
          {/* ─────────────────────────────────────────
              Bento Grid — always visible (Overview)
             ───────────────────────────────────────── */}
          <main className="dashboard__grid" id="dashboard-main-grid">

            {/* ── Col 1, Row 1-2: Main Visual Card ── */}
            <MainVisualCard
              imageUrl={face_image || imageUrl}
              selectedRegion={selectedRegion}
              onRegionSelect={setSelectedRegion}
              conditionOverlay={condition_overlay}
              faceDetection={face_detection}
              faceRegions={face_regions}
            />

            {/* ── Col 1, Row 3: Overall Conditions Bento Card ── */}
            {detectedConditions.length > 0 && (
              <article className="bento-card grid-area--conditions" aria-label="Skin conditions card">
                <div className="bento-card__header">
                  <h3 className="bento-card__title">
                    {t.result.conditionsTitle ?? 'Condition indicators'}
                  </h3>
                </div>
                <div className="bento-card__body">
                  <ConditionsPanel conditionMap={safeSegformerMap} hideHeader={true} />
                </div>
              </article>
            )}

            {/* ── Col 2, Row 1: Skin Tone Card ── */}
            <SkinToneCard
              tomGeralHex={tom_geral_hex}
              tomGeralFitz={tom_geral_fitzpatrick}
              subtomPredominante={subtom_predominante}
              skinTone={skin_tone}
              regioes={regioes}
            />

            {/* ── Col 2, Row 2: Region Detail Card ── */}
            <RegionDetailCard
              selectedRegion={selectedRegion}
              regioes={regioes}
              conditions={selectedRegion ? conditionsByRegion[selectedRegion] : []}
            />

            {/* ── Col 2, Row 3: Sensitive Skin Toggle ── */}
            <SensitiveSkinCard
              enabled={sensitiveMode}
              allergens={catalogAllergens}
              selectedAllergens={selectedAllergens}
              loading={recommendationLoading}
              error={recommendationError}
              strategy={recommendationStrategy}
              fallbackUsed={recommendationFallbackUsed}
              onEnabledChange={handleSensitiveModeChange}
              onAllergenChange={handleAllergenChange}
              onApply={() => updateRecommendations(selectedAllergens)}
            />

            {/* ── Col 3, Row 1: Texture & Spots ── */}
            <TextureSpotsCard imperfeicoes={imperfeicoes} />

            {/* ── Col 3, Row 2: Skin Uniformity Map (Radar) ── */}
            <div className="bento-card bento-card--radar grid-area--multi-zone">
              <div className="bento-card__body">
                <UniformityRadar regioes={regioes} />
              </div>
            </div>

            {/* ── Col 3, Row 3: Recommendations ── */}
            <RecommendationsCard
              recommendations={safeRecommendations}
              status={recommendationStatus}
              error={recommendationError}
              onViewAll={() => setActiveSection('recommendations')}
            />
          </main>

          {/* ─────────────────────────────────────────
              Section Detail Area — driven by sidebar / tab selection
             ───────────────────────────────────────── */}
          {activeSection !== 'overview' && (
            <section
              className="dashboard__section-detail"
              id={`section-detail-${activeSection}`}
              aria-label={rl(TAB_LABELS[activeSection])}
              style={{ padding: 'var(--spacing-lg) var(--spacing-xl)', borderTop: '1px solid var(--color-accent-light)' }}
            >
              {activeSection === 'regions' && (
                <>
                  <h2 className="analysis-result__section-title" style={{ marginBottom: 'var(--spacing-lg)' }}>
                    {t.result?.byRegion}
                  </h2>
                  <UniformityRadar regioes={regioes} />
                  <div className="analysis-result__regions-grid" style={{ marginTop: 'var(--spacing-lg)' }}>
                    {REGION_ORDER.map(key =>
                      regioes[key] ? (
                        <RegionCard
                          key={key}
                          regionName={t.regions?.[key] ?? key}
                          data={regioes[key]}
                          conditions={conditionsByRegion[key] ?? []}
                        />
                      ) : null
                    )}
                  </div>
                  <ToneComparison comparacoes={comparacao_tons} regioes={regioes} />
                </>
              )}

              {activeSection === 'conditions' && (
                <ConditionsPanel conditionMap={safeSegformerMap} />
              )}

              {activeSection === 'recommendations' && (
                <div id="full-recommendations-section">
                  {recommendations_blocked ? (
                    <div className="recommendations-blocked">
                      <h3 className="analysis-result__section-title">
                        {t.recommendationsBlocked?.title ?? 'Recommendations paused'}
                      </h3>
                      <p>{t.recommendationsBlocked?.message ?? 'Makeup recommendations are paused because this result may require medical review first.'}</p>
                    </div>
                  ) : (
                    <Recommendations
                      recommendations={safeRecommendations}
                      status={recommendationStatus}
                      error={recommendationError}
                      searchSummary={recommendationSummary}
                      model={recommendationModel}
                      strategy={recommendationStrategy}
                      fallbackUsed={recommendationFallbackUsed}
                    />
                  )}
                </div>
              )}
            </section>
          )}
        </div>
      </div>

      {/* ── Mobile Bottom Tab Bar ── */}
      <nav className="bottom-tab-bar" aria-label="Mobile navigation">
        <div className="bottom-tab-bar__inner">
          {Object.keys(TAB_LABELS).map(key => (
            <button
              key={key}
              id={`bottom-tab-${key}`}
              type="button"
              className={`bottom-tab-bar__item${activeSection === key ? ' active' : ''}`}
              onClick={() => setActiveSection(key)}
              aria-current={activeSection === key ? 'page' : undefined}
            >
              <TabIcon section={key} />
              <span className="bottom-tab-bar__item-label">{rl(TAB_LABELS[key])}</span>
            </button>
          ))}
        </div>
      </nav>
    </>
  )
}
