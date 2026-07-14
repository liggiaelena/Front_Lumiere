/**
 * SkinToneCard.jsx
 * Lumière — Middle column, Row 1.
 * Displays: main swatch + undertone, confidence bar, 5-region palette, bisenet row.
 *
 * Props:
 *   tomGeralHex     {string}  — overall skin hex (#xxxxxx)
 *   tomGeralFitz    {number}  — Fitzpatrick rating
 *   subtomPredominante {string} — undertone key
 *   skinTone        {object}  — { median_hex, median_rgb }
 *   regioes         {object}  — regions data for palette
 */
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const REGION_ORDER = ['testa', 'bochecha_e', 'bochecha_d', 'nariz', 'queixo']

const CARD_LABELS = {
  title:        { en: 'Skin Tone & Undertone', tw: '膚色與色調', zh: '肤色与色调', pt: 'Tom de Pele & Subtom', fr: 'Teint & Sous-ton', tr: 'Ten Rengi & Alttonu' },
  healthySkin:  { en: 'Pure Skin Tone (BiSeNet)', tw: '純淨膚色（去背景）', zh: '純淨膚色（去背景）', pt: 'Tom Puro de Pele', fr: 'Teint Pur', tr: 'Saf Ten Rengi' },
}

export default function SkinToneCard({ tomGeralHex, tomGeralFitz, subtomPredominante, skinTone, regioes }) {
  const { lang, t } = useLanguage()
  const rl = (map) => map[lang] ?? map.en

  /* Regional palette */
  const palette = REGION_ORDER
    .filter(k => regioes?.[k]?.tom_hex)
    .map(k => ({ key: k, hex: regioes[k].tom_hex, label: t.regions?.[k] ?? k }))

  const fitzLabel = t.fitzpatrick?.[tomGeralFitz] ?? `Type ${tomGeralFitz}`
  const undertoneLabel = t.undertones?.[subtomPredominante] ?? subtomPredominante

  return (
    <article className="bento-card grid-area--skin-tone" aria-label="Skin tone and undertone card">
      {/* Header */}
      <div className="bento-card__header">
        <h3 className="bento-card__title">{rl(CARD_LABELS.title)}</h3>
      </div>

      <div className="bento-card__body">
        {/* ── Hero: Main Swatch ── */}
        <div className="skin-tone-card__hero">
          <div className="skin-tone-card__swatch-wrapper">
            <div
              className="skin-tone-card__swatch"
              style={{ backgroundColor: tomGeralHex || 'var(--color-exception-text)' }}
              role="img"
              aria-label={`Overall skin tone: ${tomGeralHex}`}
            />
            {tomGeralFitz && (
              <div className="skin-tone-card__fitzpatrick-badge" aria-label={`Fitzpatrick ${tomGeralFitz}`}>
                {tomGeralFitz}
              </div>
            )}
          </div>
          <div className="skin-tone-card__hero-info">
            <p className="skin-tone-card__type-label">{fitzLabel}</p>
            <p className="skin-tone-card__undertone">{undertoneLabel}</p>
            {tomGeralHex && (
              <p className="skin-tone-card__hex">{tomGeralHex.toUpperCase()}</p>
            )}
          </div>
        </div>

        {/* ── Regional Palette ── */}
        {palette.length > 0 && (
          <div aria-label={t.result.skinPalette}>
            <p className="skin-palette__title">{t.result.skinPalette}</p>
            <div className="skin-palette__swatches">
              {palette.map(({ key, hex, label }) => (
                <div key={key} className="skin-palette__swatch-item">
                  <div
                    className="skin-palette__swatch-dot"
                    style={{ backgroundColor: hex }}
                    title={hex}
                    role="img"
                    aria-label={`${label}: ${hex}`}
                  />
                  <span className="skin-palette__swatch-label">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── BiSeNet Pure Skin Tone ── */}
        {skinTone?.median_hex && (
          <div className="skin-tone-card__bisenet">
            <p className="skin-tone-card__bisenet-label">{rl(CARD_LABELS.healthySkin)}</p>
            <div className="skin-tone-card__bisenet-row">
              <div
                className="skin-tone-card__bisenet-swatch"
                style={{ backgroundColor: skinTone.median_hex }}
                role="img"
                aria-label={`BiSeNet tone: ${skinTone.median_hex}`}
              />
              <div className="skin-tone-card__bisenet-info">
                <p>{skinTone.median_hex.toUpperCase()}</p>
                {skinTone.median_rgb && (
                  <p>RGB: {skinTone.median_rgb.join(', ')}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
