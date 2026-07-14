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
import { useState, useEffect } from 'react'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

/* Region → dot color class (matches MainVisualCard hotspot colors) */
const REGION_DOT_CLASS = {
  testa: 'zone-callout__dot--forehead',
  bochecha_e: 'zone-callout__dot--l-cheek',
  bochecha_d: 'zone-callout__dot--r-cheek',
  nariz: 'zone-callout__dot--nose',
  queixo: 'zone-callout__dot--chin',
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

export default function RegionDetailCard({ selectedRegion, regioes, conditions = [] }) {
  const { lang, t } = useLanguage()
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
          <div className="region-detail__photo-placeholder" style={{ marginBottom: 'var(--spacing-xs)' }} aria-label={rl(CARD_LABELS.localPhoto)}>
            <span className="region-detail__photo-placeholder-icon" aria-hidden="true">🔬</span>
            <span className="region-detail__photo-placeholder-text">
              {rl(CARD_LABELS.futurePlaceholder)}
            </span>
          </div>

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
              {t.notes?.[regionData.notas] ?? regionData.notas}
            </p>
          )}
        </div>
      )}
    </article>
  )
}
