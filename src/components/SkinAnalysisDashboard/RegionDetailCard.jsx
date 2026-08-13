/**
 * RegionDetailCard.jsx
 * Lumière — Left column, Row 3.
 *
 * 變更 5: Dynamic region detail card.
 * When a zone is selected in MainVisualCard, this card shows
 * that region's Fitzpatrick, oiliness, uniformity, imperfections,
 * notes, and a placeholder for a future local zone photo.
 *
 * When no zone is selected, shows a prompt to tap the face diagram.
 *
 * Props:
 *   selectedRegion {string|null} — region key ('testa', 'bochecha_e', …)
 *   regioes        {object}      — full regions data from API
 */
import { useState, useEffect, useRef } from 'react'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

/* Region → dot color class (matches MainVisualCard hotspot colors) */
const REGION_DOT_CLASS = {
  testa: 'zone-callout__dot--forehead',
  bochecha_e: 'zone-callout__dot--l-cheek',
  bochecha_d: 'zone-callout__dot--r-cheek',
  nariz: 'zone-callout__dot--nose',
  queixo: 'zone-callout__dot--chin',
}

const REGION_FALLBACK_BOX = {
  testa: [20, 5, 60, 25],
  bochecha_e: [4, 40, 40, 30],
  bochecha_d: [56, 40, 40, 30],
  nariz: [36, 34, 28, 38],
  queixo: [25, 72, 50, 22],
}

const CARD_LABELS = {
  title: { en: 'Zone Detail', tw: '分區詳情', zh: '分区详情', pt: 'Detalhe da Zona', fr: 'Détail de la Zone', tr: 'Bölge Detayı' },
  placeholder: { en: 'Tap a zone on the face photo to see its detailed analysis.', tw: '點擊上方臉部照片的分區，查看該部位的詳細分析。', zh: '点击上方面部照片的分区，查看该部位的详细分析。', pt: 'Toque numa zona da foto para ver a análise.', fr: 'Touchez une zone de la photo pour voir l\'analyse.', tr: 'Ayrıntılı analizi görmek için yüz fotoğrafında bir bölgeye dokunun.' },
  uniformity: { en: 'Uniformity', tw: '均勻度', zh: '均匀度', pt: 'Uniformidade', fr: 'Uniformité', tr: 'Düzgünlük' },
  noImp: { en: 'No imperfections detected', tw: '未偵測到瑕疵', zh: '未检测到瑕疵', pt: 'Sem imperfeições', fr: 'Aucune tache', tr: 'Leke yok' },
  localPhoto: { en: 'Local zone photo', tw: '局部分區圖', zh: '局部分区图', pt: 'Foto da zona', fr: 'Photo de zone', tr: 'Bölge fotoğrafı' },
  futurePlaceholder: { en: 'Local zone image — coming soon', tw: '局部圖像 — 即將提供', zh: '局部图像 — 即将提供', pt: 'Imagem da zona — em breve', fr: 'Image de zone — bientôt', tr: 'Bölge görüntüsü — yakında' },
  fitzpatrick: { en: 'Fitzpatrick', tw: 'Fitzpatrick', zh: 'Fitzpatrick', pt: 'Fitzpatrick', fr: 'Fitzpatrick', tr: 'Fitzpatrick' },
}

function RegionPhoto({ imageUrl, box, label }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageUrl || !box) return undefined

    const image = new Image()
    let cancelled = false
    image.onload = () => {
      if (cancelled) return
      const context = canvas.getContext('2d')
      if (!context) return

      const x = Number(box.x)
      const y = Number(box.y)
      const width = Number(box.width)
      const height = Number(box.height)
      if (![x, y, width, height].every(Number.isFinite) || width <= 0 || height <= 0) return

      const padding = 0.12
      let sourceX = Math.max(0, (x - width * padding) * image.naturalWidth / 100)
      let sourceY = Math.max(0, (y - height * padding) * image.naturalHeight / 100)
      let sourceWidth = Math.min(image.naturalWidth - sourceX, width * (1 + padding * 2) * image.naturalWidth / 100)
      let sourceHeight = Math.min(image.naturalHeight - sourceY, height * (1 + padding * 2) * image.naturalHeight / 100)

      canvas.width = Math.max(1, Math.round(sourceWidth))
      canvas.height = Math.max(1, Math.round(sourceHeight))
      context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height)
    }
    image.src = imageUrl
    return () => { cancelled = true }
  }, [imageUrl, box?.x, box?.y, box?.width, box?.height])

  return <canvas ref={canvasRef} width="480" height="270" role="img" aria-label={label} />
}

export default function RegionDetailCard({ selectedRegion, regioes, conditions = [], imageUrl, faceDetection }) {
  const { lang, t, translateNote } = useLanguage()
  const rl = (map) => map[lang] ?? map.en

  const regionData = selectedRegion ? regioes?.[selectedRegion] : null
  console.log("RegionDetailCard render:", { selectedRegion, regionData })

  /* Animated uniformity bar */
  const uniformPct = regionData?.uniformidade != null
    ? Math.round((regionData.uniformidade / 10) * 100)
    : 0
  const [animatedWidth, setAnimatedWidth] = useState(0)
  useEffect(() => {
    const frame = requestAnimationFrame(() => setAnimatedWidth(uniformPct))
    return () => cancelAnimationFrame(frame)
  }, [uniformPct, selectedRegion])

  const regionLabel = selectedRegion ? (t.regions?.[selectedRegion] ?? selectedRegion) : ''
  const dotClass = selectedRegion ? REGION_DOT_CLASS[selectedRegion] : ''
  const fallbackBox = selectedRegion ? REGION_FALLBACK_BOX[selectedRegion] : null
  const faceBox = faceDetection?.bbox_percent
  const regionBox = fallbackBox
    ? {
        x: (faceBox?.x ?? 0) + (faceBox?.width ?? 100) * fallbackBox[0] / 100,
        y: (faceBox?.y ?? 0) + (faceBox?.height ?? 100) * fallbackBox[1] / 100,
        width: (faceBox?.width ?? 100) * fallbackBox[2] / 100,
        height: (faceBox?.height ?? 100) * fallbackBox[3] / 100,
      }
    : null

  return (
    <article className="bento-card grid-area--under-eye" aria-label="Region detail card">
      {/* Header */}
      <div className="bento-card__header">
        <h3 className="bento-card__title">{t.result.byRegion ?? 'Analysis by region'}</h3>
      </div>

      {/* ── Placeholder (no selection) ── */}
      {!regionData && (
        <div className="region-detail__placeholder">
          <span className="region-detail__placeholder-icon" aria-hidden="true">🎯</span>
          <p className="region-detail__placeholder-text">{rl(CARD_LABELS.placeholder)}</p>
        </div>
      )}

      {/* ── Active region detail ── */}
      {regionData && (
        <div className="region-detail__content">
          {/* ── Local zone photo placeholder (future feature) ── */}
          {imageUrl ? (
            <figure className="region-detail__photo" aria-label={`${regionLabel} - ${rl(CARD_LABELS.localPhoto)}`}>
              <RegionPhoto imageUrl={imageUrl} box={regionBox} label={`${regionLabel} - ${rl(CARD_LABELS.localPhoto)}`} />
              <figcaption>{regionLabel}</figcaption>
            </figure>
          ) : (
            <div className="region-detail__photo-placeholder" aria-label={rl(CARD_LABELS.localPhoto)}>
              <span className="region-detail__photo-placeholder-text">{rl(CARD_LABELS.futurePlaceholder)}</span>
            </div>
          )}

          {/* Region name + color dot */}
          <h4 className="region-detail__region-name">
            <span
              className={`region-detail__region-dot zone-callout__dot ${dotClass}`}
              style={regionData.tom_hex ? { backgroundColor: regionData.tom_hex } : {}}
              aria-hidden="true"
            />
            {regionLabel}
          </h4>

          {/* Fitzpatrick + Oiliness badges */}
          <div className="region-detail__badges">
            {regionData.tom_fitzpatrick && (
              <span className="region-detail__badge">
                {rl(CARD_LABELS.fitzpatrick)} {regionData.tom_fitzpatrick}
              </span>
            )}
            {regionData.oleosidade && (
              <span className="region-detail__badge">
                {t.oiliness?.[regionData.oleosidade] ?? regionData.oleosidade}
              </span>
            )}
            {regionData.tom_hex && (
              <span className="region-detail__badge" style={{ fontFeatureSettings: "'tnum'" }}>
                {regionData.tom_hex.toUpperCase()}
              </span>
            )}
          </div>

          {/* Uniformity bar */}
          {regionData.uniformidade != null && (
            <div className="region-detail__uniformity">
              <div className="region-detail__uniformity-row">
                <span className="region-detail__uniformity-label">{rl(CARD_LABELS.uniformity)}</span>
                <span className="region-detail__uniformity-value">{regionData.uniformidade}/10</span>
              </div>
              <div
                className="region-detail__bar-track"
                role="progressbar"
                aria-valuenow={regionData.uniformidade}
                aria-valuemin={0}
                aria-valuemax={10}
              >
                <div
                  className="region-detail__bar-fill"
                  style={{ width: `${animatedWidth}%` }}
                />
              </div>
            </div>
          )}

          {/* Imperfections tags */}
          {regionData.imperfeicoes?.length > 0 ? (
            <div className="region-detail__imp-tags" role="list" aria-label="Imperfections">
              {regionData.imperfeicoes.map((imp, i) => {
                const tipo = typeof imp === 'object' ? imp.tipo : imp
                return (
                  <span key={`${tipo}-${i}`} className="region-detail__imp-tag" role="listitem">
                    {t.imperfections?.[tipo] ?? tipo}
                  </span>
                )
              })}
            </div>
          ) : (
            <p style={{ fontSize: '0.75rem', color: 'var(--color-success)', fontWeight: 600, margin: 0 }}>
              ✓ {rl(CARD_LABELS.noImp)}
            </p>
          )}

          {/* Conditions tags (Melasma, Vitiligo, etc.) */}
          {conditions.length > 0 && (
            <div className="region-detail__imp-tags" style={{ marginTop: 'var(--spacing-xs)' }} role="list" aria-label="Conditions">
              {conditions.map((condition, index) => {
                const type = condition?.type ?? 'outro'
                const areaPercent = Number(condition?.areaPercent)

                return (
                  <span
                    key={`${type}-${index}`}
                    className="region-detail__imp-tag region-detail__imp-tag--condition"
                    role="listitem"
                  >
                    {t.conditions?.[type] ?? type}
                    {Number.isFinite(areaPercent)
                      ? ` · ${areaPercent.toFixed(2)}%`
                      : ''}
                  </span>
                )
              })}
            </div>
          )}

          {/* Notes */}
          {regionData.notas && (
            <p className="region-detail__notes">
              {translateNote(regionData.notas)}
            </p>
          )}
        </div>
      )}
    </article>
  )
}
