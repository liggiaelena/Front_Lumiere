import { useLanguage } from '../../i18n/LanguageContext.jsx'

const COPY = {
  en: { title: 'GPT Live Matches', subtitle: 'Searched from current web sources', view: 'View all results', searching: 'Searching the web…', unavailable: 'Live search unavailable', empty: 'No verified matches' },
  zh: { title: 'GPT 实时推荐', subtitle: '来自当前网络来源', view: '查看全部结果', searching: '正在联网搜索…', unavailable: '实时搜索不可用', empty: '没有可验证的匹配' },
}

export default function RecommendationsCard({ recommendations = [], status = 'ready', error = '', onViewAll }) {
  const { lang } = useLanguage()
  const c = COPY[lang] || COPY.en
  const safe = Array.isArray(recommendations) ? recommendations : []

  const handleViewAll = () => {
    onViewAll?.()
    window.setTimeout(() => document.getElementById('full-recommendations-section')?.scrollIntoView({ behavior: 'smooth' }), 0)
  }

  return (
    <article className="bento-card grid-area--recommendations" aria-label={c.title}>
      <div className="bento-card__header">
        <h3 className="bento-card__title">{c.title}</h3>
        {status === 'ready' && safe.length > 0 && <span className="reco-card__count">{safe.length}</span>}
      </div>
      <div className="bento-card__body">
        <p className="reco-card__live-source"><span />{c.subtitle}</p>
        {status === 'pending' || status === 'loading' ? <p className="reco-card__state">{c.searching}</p> : null}
        {status === 'unavailable' ? <p className="reco-card__state reco-card__state--error" title={error}>{c.unavailable}</p> : null}
        {status === 'ready' && safe.length === 0 ? <p className="reco-card__state">{c.empty}</p> : null}
        <div className="reco-card__product-list">
          {safe.slice(0, 3).map((rec, i) => (
            <div key={`${rec?.brand}-${rec?.shade_code}-${i}`} className="reco-product-item">
              <span className="reco-product-item__shade-dot" style={{ backgroundColor: rec?.shade_hex || '#c68b6e' }} />
              <div className="reco-product-item__info"><p className="reco-product-item__brand">{rec?.brand}</p><p className="reco-product-item__shade">{rec?.shade_name} {rec?.shade_code}</p></div>
              <span className="reco-product-item__price">{rec?.price_range}</span>
            </div>
          ))}
        </div>
        {safe.length > 0 && <button type="button" className="reco-card__cta" onClick={handleViewAll}>{c.view} ({safe.length}) →</button>}
      </div>
    </article>
  )
}
