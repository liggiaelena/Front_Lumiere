import './Recommendations.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const COPY = {
  en: {
    title: 'Live product recommendations',
    subtitle: 'GPT searched current brand and retailer pages for your measured skin tone.',
    live: 'Live web search', sources: 'Sources', ingredients: 'Ingredients checked',
    allergens: 'Reported allergens', reason: 'Why it matches', shop: 'Open product page',
    unavailable: 'Live recommendations are unavailable right now.',
    pending: 'Searching current product pages…', empty: 'No verifiable products were found.',
    disclaimer: 'Prices, availability and ingredients can change. Confirm them on the linked product page before purchase.',
    fallback: 'Plan 1 live search failed. These matches come from the stored Neon catalogue and may not reflect current price or availability.',
  },
  zh: {
    title: '实时联网产品推荐', subtitle: 'GPT 已根据测得的肤色搜索当前品牌和零售商网页。',
    live: '实时网络搜索', sources: '验证来源', ingredients: '已检查成分', allergens: '标示过敏原',
    reason: '推荐理由', shop: '打开商品原网页', unavailable: '实时推荐目前不可用。',
    pending: '正在搜索最新商品页面…', empty: '没有找到可验证的商品。',
    disclaimer: '价格、库存和成分可能变化，购买前请在商品原网页再次确认。',
    fallback: '方案一实时搜索失败，当前结果来自 Neon 备用目录，价格和库存可能不是最新状态。',
  },
}

function validUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value)
}

export default function Recommendations({
  recommendations = [], status = 'ready', error = '', searchSummary = '', model = '', fallbackUsed = false,
}) {
  const { lang } = useLanguage()
  const c = COPY[lang] || COPY.en
  const safe = Array.isArray(recommendations) ? recommendations.slice(0, 8) : []

  if (status === 'pending' || status === 'loading') return <section className="live-recommendations live-recommendations--state" role="status" aria-label={c.pending}><span className="recommendation-spinner" aria-hidden="true" /></section>
  if (status === 'unavailable') {
    return <section className="live-recommendations live-recommendations--state"><strong>{c.unavailable}</strong>{error && <p>{error}</p>}</section>
  }
  if (safe.length === 0) return <section className="live-recommendations live-recommendations--state">{c.empty}</section>

  return (
    <section className="live-recommendations">
      <header className="live-recommendations__header">
        <div>
          <p className="live-recommendations__eyebrow">● {c.live}</p>
          <h2>{c.title}</h2>
          <p>{c.subtitle}</p>
        </div>
        <div className="live-recommendations__meta">
          <span>{safe.length} results</span>
          {model && <span>{model}</span>}
        </div>
      </header>
      {fallbackUsed && <div className="live-recommendations__fallback" role="status">{c.fallback}</div>}
      {searchSummary && <p className="live-recommendations__summary">{searchSummary}</p>}
      <div className="live-recommendations__grid">
        {safe.map((rec, index) => {
          const productUrl = validUrl(rec?.product_url) ? rec.product_url : rec?.where_to_buy
          const sources = Array.isArray(rec?.source_urls) ? rec.source_urls.filter(validUrl) : []
          return (
            <article className="live-product" key={`${rec?.brand}-${rec?.shade_code}-${index}`}>
              <div className="live-product__topline">
                <span className="live-product__brand">{rec?.brand}</span>
                <span className="live-product__price">{rec?.price_range || 'Price unavailable'}</span>
              </div>
              <h3>{rec?.product_name}</h3>
              <div className="live-product__shade">
                <span className="live-product__swatch" style={{ backgroundColor: rec?.shade_hex || '#c68b6e' }} />
                <div><strong>{rec?.shade_name}</strong><small>{[rec?.shade_code, rec?.undertone].filter(Boolean).join(' · ')}</small></div>
              </div>
              {rec?.recommendation_reason && <div className="live-product__evidence"><strong>{c.reason}</strong><p>{rec.recommendation_reason}</p></div>}
              {Array.isArray(rec?.ingredients) && rec.ingredients.length > 0 && (
                <details><summary>{c.ingredients} ({rec.ingredients.length})</summary><p>{rec.ingredients.join(', ')}</p></details>
              )}
              {Array.isArray(rec?.allergens) && rec.allergens.length > 0 && (
                <p className="live-product__allergens"><strong>{c.allergens}:</strong> {rec.allergens.join(', ')}</p>
              )}
              {sources.length > 0 && <div className="live-product__sources"><strong>{c.sources}:</strong>{sources.map((url, i) => <a key={url} href={url} target="_blank" rel="noopener noreferrer">{i + 1}</a>)}</div>}
              {validUrl(productUrl) && <a className="live-product__shop" href={productUrl} target="_blank" rel="noopener noreferrer">{c.shop} ↗</a>}
            </article>
          )
        })}
      </div>
      <p className="live-recommendations__disclaimer">{c.disclaimer}</p>
    </section>
  )
}
