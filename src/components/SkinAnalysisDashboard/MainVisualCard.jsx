import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

/* Zone hotspot configuration */
const ZONE_CONFIG = [
  { key: 'testa',      cssClass: 'zone-hotspot--forehead',    box: [20, 5, 60, 25] },
  { key: 'bochecha_e', cssClass: 'zone-hotspot--left-cheek',  box: [4, 40, 40, 30] },
  { key: 'bochecha_d', cssClass: 'zone-hotspot--right-cheek', box: [56, 40, 40, 30] },
  { key: 'nariz',      cssClass: 'zone-hotspot--nose',        box: [36, 34, 28, 38] },
  { key: 'queixo',     cssClass: 'zone-hotspot--chin',        box: [25, 72, 50, 22] },
]

const CARD_LABELS = {
  title:       { en: 'Face Zone Analysis', tw: '臉部分區分析', zh: '面部分区分析', pt: 'Análise de Zonas', fr: 'Analyse des Zones', tr: 'Bölge Analizi' },
  tapHint:     { en: 'Tap a zone to explore', tw: '點擊分區查看詳細分析', zh: '点击分区查看详细分析', pt: 'Toque numa zona', fr: 'Touchez une zone', tr: 'Bir bölgeye dokunun' },
  selected:    { en: 'Selected:', tw: '已選取：', zh: '已选取：', pt: 'Selecionado:', fr: 'Sélectionné :', tr: 'Seçildi:' },
  noPhoto:     { en: 'Photo unavailable', tw: '照片無法顯示', zh: '照片无法显示', pt: 'Foto indisponível', fr: 'Photo indisponible', tr: 'Fotoğraf mevcut değil' },
}

export default function MainVisualCard({ imageUrl, selectedRegion, onRegionSelect, conditionOverlay, faceDetection, faceRegions }) {
  const { lang, t } = useLanguage()
  const [viewMode, setViewMode] = useState('zones') // 'zones' or 'heatmap'
  const rl = (map) => map[lang] ?? map.en

  /* Toggle: clicking the same zone again deselects it */
  const handleZoneClick = (key) => {
    console.log("MainVisualCard hotspot clicked:", key)
    onRegionSelect(selectedRegion === key ? null : key)
  }

  const selectedLabel = selectedRegion ? (t.regions?.[selectedRegion] ?? selectedRegion) : null
  const faceBox = faceDetection?.bbox_percent
  const keypoints = faceDetection?.keypoints
  const foreheadStyle = () => {
    if (!Array.isArray(keypoints) || keypoints.length < 2) return null
    const eyeA = keypoints[0]
    const eyeB = keypoints[1]
    const eyeDistance = Math.hypot(
      eyeB.x_percent - eyeA.x_percent,
      eyeB.y_percent - eyeA.y_percent,
    )
    if (!Number.isFinite(eyeDistance) || eyeDistance <= 0) return null

    const eyeCenterX = (eyeA.x_percent + eyeB.x_percent) / 2
    const eyeCenterY = (eyeA.y_percent + eyeB.y_percent) / 2
    const width = eyeDistance * 1.7
    const height = eyeDistance * 0.58
    return {
      left: `${Math.max(0, eyeCenterX - width / 2)}%`,
      top: `${Math.max(0, eyeCenterY - eyeDistance * 0.78)}%`,
      width: `${Math.min(width, 100)}%`,
      height: `${Math.min(height, 100)}%`,
      right: 'auto',
    }
  }
  const zoneStyle = (key, [x, y, width, height]) => {
    const parsedBox = faceRegions?.[key]?.bbox_percent
    if (parsedBox) return {
      left: `${parsedBox.x}%`,
      top: `${parsedBox.y}%`,
      width: `${parsedBox.width}%`,
      height: `${parsedBox.height}%`,
      right: 'auto',
    }
    if (key === 'testa') {
      const landmarkStyle = foreheadStyle()
      if (landmarkStyle) return landmarkStyle
    }
    return faceBox ? {
    left: `${faceBox.x + faceBox.width * x / 100}%`,
    top: `${faceBox.y + faceBox.height * y / 100}%`,
    width: `${faceBox.width * width / 100}%`,
    height: `${faceBox.height * height / 100}%`,
    right: 'auto',
    } : undefined
  }

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
              alt="Detected and enlarged face for analysis"
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
            {viewMode === 'zones' && ZONE_CONFIG.map(({ key, cssClass, box }) => (
              <button
                key={key}
                type="button"
                id={`zone-hotspot-${key}`}
                className={`zone-hotspot ${cssClass}${selectedRegion === key ? ' selected' : ''}`}
                style={zoneStyle(key, box)}
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
