/**
 * RecommendationsCard.jsx
 * Lumière — Right column, Row 2-3.
 * Wraps product recommendations with a compact list view + CTA button.
 *
 * Props:
 *   recommendations {array}  — product list from API
 *   conditionMap    {object} — condition flags for SPF/derma badges
 */
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const CARD_LABELS = {
  title:         { en: 'Top Matches', tw: '推薦產品', zh: '推荐产品', pt: 'Principais Correspondências', fr: 'Meilleures Correspondances', tr: 'En İyi Eşleşmeler' },
  subtitle:      { en: 'Selected for your skin tone', tw: '依您的膚色精選', zh: '根据您的肤色精选', pt: 'Selecionado para seu tom de pele', fr: 'Sélectionné pour votre teint', tr: 'Ten renginiz için seçildi' },
  cta:           { en: 'View All Product Recommendations', tw: '查看全部推薦商品', zh: '查看全部推荐商品', pt: 'Ver Todas as Recomendações', fr: 'Voir Toutes les Recommandations', tr: 'Tüm Önerileri Görüntüle' },
  spfWarning:    { en: '☀️ SPF protection strongly recommended — melasma detected.', tw: '☀️ 強烈建議使用含有 SPF 防曬配方產品 — 已偵測到黃褐斑。', zh: '☀️ 强烈建议使用含有SPF防晒配方产品 — 已检测到黄褐斑。', pt: '☀️ Proteção SPF recomendada — melasma detectado.', fr: '☀️ Protection SPF fortement recommandée — mélasma détecté.', tr: '☀️ SPF koruması şiddetle tavsiye edilir — melazma tespit edildi.' },
  derma:         { en: '✓ Dermatologically Tested', tw: '✓ 經皮膚科測試', zh: '✓ 经皮肤科测试', pt: '✓ Testado dermatologicamente', fr: '✓ Testé dermatologiquement', tr: '✓ Dermatolojik olarak test edildi' },
  find:          { en: 'Shop →', tw: '購買 →', zh: '购买 →', pt: 'Comprar →', fr: 'Acheter →', tr: 'Satın Al →' },
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

export default function RecommendationsCard({ recommendations, conditionMap }) {
  const { lang } = useLanguage()
  const rl = (map) => map[lang] ?? map.en

  const safe = Array.isArray(recommendations) ? recommendations : []
  const safeMap = conditionMap && typeof conditionMap === 'object' ? conditionMap : {}

  const showSpfWarning = safeMap.melasma === true
  const showDerma = safeMap.vitiligo === true || safeMap.wine_stain === true

  if (safe.length === 0) return null

  const handleViewAll = () => {
    /* Scroll to the full Recommendations section below (if rendered) */
    const el = document.getElementById('full-recommendations-section')
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <article className="bento-card grid-area--recommendations" aria-label="Product recommendations card">
      {/* Header */}
      <div className="bento-card__header">
        <h3 className="bento-card__title">{rl(CARD_LABELS.title)}</h3>
      </div>

      <div className="bento-card__body">
        {/* SPF Warning Banner */}
        {showSpfWarning && (
          <div className="reco-card__spf-warning" role="alert">
            {rl(CARD_LABELS.spfWarning)}
          </div>
        )}

        {/* Derma Badge */}
        {showDerma && (
          <div className="reco-card__derma-badge">
            {rl(CARD_LABELS.derma)}
          </div>
        )}

        <p style={{ fontSize: '0.72rem', color: 'var(--color-muted-text)', marginBottom: 'var(--spacing-md)' }}>
          {rl(CARD_LABELS.subtitle)}
        </p>

        {/* ── Product List ── */}
        <div className="reco-card__product-list">
          {safe.slice(0, 3).map((rec, i) => (
            <a
              key={rec?.id ?? i}
              id={`reco-product-${i}`}
              className="reco-product-item"
              href={rec?.where_to_buy ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${rec?.brand} ${rec?.shade_name} – ${rec?.price_range}`}
            >
              {/* Shade dot */}
              <div
                className="reco-product-item__shade-dot"
                style={{ backgroundColor: rec?.shade_hex ?? rec?.tom_geral_hex ?? 'var(--color-exception-text)' }}
                aria-hidden="true"
              />
              {/* Info */}
              <div className="reco-product-item__info">
                <p className="reco-product-item__brand">{rec?.brand ?? ''}</p>
                <p className="reco-product-item__shade">{rec?.shade_name ?? ''}</p>
              </div>
              {/* Price */}
              <span className="reco-product-item__price">{rec?.price_range ?? ''}</span>
            </a>
          ))}
        </div>

        {/* ── CTA Button ── */}
        <button
          id="reco-card-cta-btn"
          type="button"
          className="reco-card__cta"
          onClick={handleViewAll}
          aria-label={rl(CARD_LABELS.cta)}
        >
          {rl(CARD_LABELS.cta)}
          <IconArrow />
        </button>
      </div>
    </article>
  )
}
