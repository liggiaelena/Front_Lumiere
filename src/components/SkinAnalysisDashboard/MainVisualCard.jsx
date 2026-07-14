import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

/* Zone hotspot configuration */
const ZONE_CONFIG = [
  { key: 'testa',      cssClass: 'zone-hotspot--forehead',    labelKey: 'testa' },
  { key: 'bochecha_e', cssClass: 'zone-hotspot--left-cheek',  labelKey: 'bochecha_e' },
  { key: 'bochecha_d', cssClass: 'zone-hotspot--right-cheek', labelKey: 'bochecha_d' },
  { key: 'nariz',      cssClass: 'zone-hotspot--nose',         labelKey: 'nariz' },
  { key: 'queixo',     cssClass: 'zone-hotspot--chin',         labelKey: 'queixo' },
]

const CARD_LABELS = {
  title:       { en: 'Face Zone Analysis', tw: '臉部分區分析', zh: '面部分区分析', pt: 'Análise de Zonas', fr: 'Analyse des Zones', tr: 'Bölge Analizi' },
  tapHint:     { en: 'Tap a zone to explore', tw: '點擊分區查看詳細分析', zh: '点击分区查看详细分析', pt: 'Toque numa zona', fr: 'Touchez une zone', tr: 'Bir bölgeye dokunun' },
  selected:    { en: 'Selected:', tw: '已選取：', zh: '已选取：', pt: 'Selecionado:', fr: 'Sélectionné :', tr: 'Seçildi:' },
  noPhoto:     { en: 'Photo unavailable', tw: '照片無法顯示', zh: '照片无法显示', pt: 'Foto indisponível', fr: 'Photo indisponible', tr: 'Fotoğraf mevcut değil' },
}

export default function MainVisualCard({ imageUrl, selectedRegion, onRegionSelect, conditionOverlay }) {
  const { lang, t } = useLanguage()
  const [viewMode, setViewMode] = useState('zones') // 'zones' or 'heatmap'
  const rl = (map) => map[lang] ?? map.en

  /* Toggle: clicking the same zone again deselects it */
  const handleZoneClick = (key) => {
    console.log("MainVisualCard hotspot clicked:", key)
    onRegionSelect(selectedRegion === key ? null : key)
  }

  const selectedLabel = selectedRegion ? (t.regions?.[selectedRegion] ?? selectedRegion) : null

  return (
    <article className="bento-card grid-area--main-visual" aria-label="Face zone analysis card">
      {/* ── Card Header ── */}
      <div className="bento-card__header">
        <h3 className="bento-card__title">{rl(CARD_LABELS.title)}</h3>
      </div>

      {/* ── Photo + Zone Hotspots ── */}
      <div className="main-visual-card__photo-container">
        {imageUrl ? (
          <>
            {/* Uploaded photo */}
            <img
              className="main-visual-card__photo"
              src={imageUrl}
              alt="Uploaded face for analysis"
              draggable={false}
            />

            {/* Condition mask overlay image */}
            {conditionOverlay?.image && (
              <img
                className={`main-visual-card__photo-overlay${viewMode === 'heatmap' ? ' visible' : ''}`}
                src={conditionOverlay.image}
                alt="Condition heatmap overlay"
                draggable={false}
              />
            )}

            {/* Clickable zone hotspots overlaid on photo — only active in Zones mode */}
            {viewMode === 'zones' && ZONE_CONFIG.map(({ key, cssClass }) => (
              <button
                key={key}
                type="button"
                id={`zone-hotspot-${key}`}
                className={`zone-hotspot ${cssClass}${selectedRegion === key ? ' selected' : ''}`}
                onClick={() => handleZoneClick(key)}
                aria-pressed={selectedRegion === key}
                aria-label={t.regions?.[key] ?? key}
              >
                {/* Tooltip label shown on hover / selected */}
                <span className="zone-hotspot__label" aria-hidden="true">
                  {t.regions?.[key] ?? key}
                </span>
              </button>
            ))}
          </>
        ) : (
          /* Fallback when imageUrl is not available */
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--color-muted-text)', fontSize: '0.8rem' }}>
            {rl(CARD_LABELS.noPhoto)}
          </div>
        )}
      </div>

      {/* ── Bottom Controls ── */}
      {conditionOverlay?.image && (
        <div className="main-visual-card__controls">
          <div className="main-visual-card__controls-row">
            {/* Segmented Control */}
            <div className="segmented-control" role="tablist" aria-label="Analysis Mode">
              <button
                type="button"
                className={`segmented-control__btn ${viewMode === 'zones' ? 'active' : ''}`}
                onClick={() => setViewMode('zones')}
                role="tab"
                aria-selected={viewMode === 'zones'}
              >
                {rl({ en: 'Zones', tw: '分區', zh: '分区', pt: 'Zonas', fr: 'Zones', tr: 'Bölgeler' })}
              </button>
              <button
                type="button"
                className={`segmented-control__btn ${viewMode === 'heatmap' ? 'active' : ''}`}
                onClick={() => setViewMode('heatmap')}
                role="tab"
                aria-selected={viewMode === 'heatmap'}
              >
                {rl({ en: 'Heatmap', tw: '熱圖', zh: '热图', pt: 'Heatmap', fr: 'Carte', tr: 'Isı Haritası' })}
              </button>
            </div>

            {/* Legend - only visible in Heatmap mode */}
            {viewMode === 'heatmap' && conditionOverlay.legend && conditionOverlay.legend.length > 0 && (
              <div className="main-visual-card__legend">
                {conditionOverlay.legend.map(item => (
                  <span key={item.key || item.label} className="main-visual-card__legend-item">
                    <span 
                      className="main-visual-card__legend-dot" 
                      style={{ backgroundColor: item.color }} 
                    />
                    {t.conditions?.[item.key] ?? item.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Bottom selected indicator bar (only in Zones mode) ── */}
      {viewMode === 'zones' && (
        <div className="main-visual-card__selected-indicator">
          {selectedLabel ? (
            <>
              <span className="main-visual-card__selected-label">{rl(CARD_LABELS.selected)}</span>
              <span className="main-visual-card__selected-value">{selectedLabel}</span>
            </>
          ) : (
            <span className="main-visual-card__tap-hint">{rl(CARD_LABELS.tapHint)}</span>
          )}
        </div>
      )}
    </article>
  )
}
