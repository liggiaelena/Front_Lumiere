/**
 * DashboardSidebar.jsx
 * Lumière — Left sidebar navigation.
 * Features:
 *   - No brand/logo area at top (removed per request)
 *   - Collapsible state (compact layout showing only icons)
 *   - Actions (Share and Download) integrated right above "New Analysis"
 */
import { useLanguage } from '../../i18n/LanguageContext.jsx'

/* SVG icon components */
function IconOverview() {
  return (
    <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  )
}

function IconRegions() {
  return (
    <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="3" />
      <path d="M6 20c0-3.31 2.69-6 6-6s6 2.69 6 6" />
      <path d="M6 12c-2.21 0-4 1.79-4 4" />
      <path d="M18 12c2.21 0 4 1.79 4 4" />
    </svg>
  )
}

function IconConditions() {
  return (
    <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12l2 2 4-4" />
      <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c2.12 0 4.07.74 5.61 1.97" />
    </svg>
  )
}

function IconRecommendations() {
  return (
    <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  )
}

function IconBack() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M19 12H5M12 5l-7 7 7 7" />
    </svg>
  )
}

function IconMenu() {
  return (
    <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

function IconShare() {
  return (
    <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

function IconDownload() {
  return (
    <svg className="sidebar__nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  )
}

const NAV_ITEMS = [
  { key: 'overview', icon: <IconOverview />, labelKey: 'overview', badge: null },
  { key: 'regions', icon: <IconRegions />, labelKey: 'regions', badge: null },
  { key: 'conditions', icon: <IconConditions />, labelKey: 'conditions', badge: null },
  { key: 'recommendations', icon: <IconRecommendations />, labelKey: 'recommendations', badge: null },
]

const SECTION_LABELS = {
  overview: { en: 'Overview', tw: '總覽', zh: '总览', pt: 'Visão Geral', fr: 'Aperçu', tr: 'Genel Bakış' },
  regions: { en: 'By Region', tw: '分區分析', zh: '区域分析', pt: 'Por Região', fr: 'Par Région', tr: 'Bölgeye Göre' },
  conditions: { en: 'Skin Conditions', tw: '膚況診斷', zh: '肤况诊断', pt: 'Condições', fr: 'Conditions', tr: 'Cilt Durumu' },
  recommendations: { en: 'Recommendations', tw: '產品推薦', zh: '产品推荐', pt: 'Recomendações', fr: 'Recommandations', tr: 'Öneriler' },
}

const NEW_ANALYSIS_LABELS = {
  en: 'New Analysis', tw: '重新分析', zh: '重新分析', pt: 'Nova Análise', fr: 'Nouvelle Analyse', tr: 'Yeni Analiz'
}

const ACTION_LABELS = {
  share: { en: 'Share', tw: '分享', zh: '分享', pt: 'Partilhar', fr: 'Partager', tr: 'Paylaş' },
  download: { en: 'Download', tw: '下載報告', zh: '下载报告', pt: 'Baixar', fr: 'Télécharger', tr: 'İndir' }
}

export default function DashboardSidebar({ activeSection, onSectionChange, onNewAnalysis, isCollapsed, onToggleCollapse }) {
  const { lang } = useLanguage()
  const resolveLabel = (map) => map[lang] ?? map.en

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: 'Lumière Skin Analysis', url: window.location.href })
    } else {
      navigator.clipboard?.writeText(window.location.href)
    }
  }

  const handleDownload = () => {
    window.print()
  }

  return (
    <aside className={`sidebar ${isCollapsed ? 'sidebar--collapsed' : ''}`} aria-label="Dashboard navigation">
      {/* ── Top: Menu Toggle button ── */}
      <div className="sidebar__toggle-area">
        <button
          type="button"
          className="sidebar__toggle-btn"
          onClick={onToggleCollapse}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <IconMenu />
        </button>
      </div>

      {/* ── Section Label ── */}
      {!isCollapsed && <span className="sidebar__section-label">Analysis</span>}

      {/* ── Navigation List ── */}
      <nav aria-label="Sections">
        <ul className="sidebar__nav" role="list">
          {NAV_ITEMS.map(({ key, icon, labelKey, badge }) => (
            <li key={key} role="listitem">
              <button
                type="button"
                id={`sidebar-nav-${key}`}
                className={`sidebar__nav-item${activeSection === key ? ' active' : ''}`}
                onClick={() => onSectionChange(key)}
                aria-current={activeSection === key ? 'page' : undefined}
                title={isCollapsed ? resolveLabel(SECTION_LABELS[labelKey]) : undefined}
              >
                {icon}
                {!isCollapsed && <span>{resolveLabel(SECTION_LABELS[labelKey])}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Actions: Share / Download (placed right above New Analysis) ── */}
      <div className="sidebar__actions">
        <button
          type="button"
          className="sidebar__action-btn"
          onClick={handleShare}
          aria-label={resolveLabel(ACTION_LABELS.share)}
          title={resolveLabel(ACTION_LABELS.share)}
        >
          <IconShare />
          {!isCollapsed && <span>{resolveLabel(ACTION_LABELS.share)}</span>}
        </button>
        <button
          type="button"
          className="sidebar__action-btn"
          onClick={handleDownload}
          aria-label={resolveLabel(ACTION_LABELS.download)}
          title={resolveLabel(ACTION_LABELS.download)}
        >
          <IconDownload />
          {!isCollapsed && <span>{resolveLabel(ACTION_LABELS.download)}</span>}
        </button>
      </div>

      {/* ── Footer: New Analysis CTA ── */}
      <div className="sidebar__footer">
        <button
          type="button"
          id="sidebar-new-analysis-btn"
          className="sidebar__new-analysis-btn"
          onClick={onNewAnalysis}
          title={resolveLabel(NEW_ANALYSIS_LABELS)}
        >
          <IconBack />
          {!isCollapsed && <span>{resolveLabel(NEW_ANALYSIS_LABELS)}</span>}
        </button>
      </div>
    </aside>
  )
}
