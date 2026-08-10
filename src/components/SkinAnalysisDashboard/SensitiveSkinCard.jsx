import { useLanguage } from '../../i18n/LanguageContext.jsx'

const COPY = {
  en: { label: 'Allergen exclusions', desc: 'GPT will reject products with selected ingredients or insufficient ingredient evidence.', on: 'Active', off: 'Off', empty: 'No exclusion options available.', apply: 'Search again with filters', updating: 'Searching current sources…' },
  zh: { label: '过敏原排除', desc: 'GPT 会排除含所选成分或缺少可靠成分证据的商品。', on: '已启用', off: '关闭', empty: '没有可选的排除项。', apply: '应用筛选并重新搜索', updating: '正在搜索当前来源…' },
}

export default function SensitiveSkinCard({ enabled, allergens = [], selectedAllergens = [], loading = false, error = '', onEnabledChange, onAllergenChange, onApply }) {
  const { lang } = useLanguage()
  const c = COPY[lang] || COPY.en
  return (
    <article className="bento-card grid-area--sensitive-skin" aria-label={c.label}>
      <div className="bento-card__body">
        <div className="sensitive-skin-card__inner">
          <div className="sensitive-skin-card__icon-area" aria-hidden="true">◉</div>
          <div className="sensitive-skin-card__text"><p className="sensitive-skin-card__label">{c.label}</p><p className="sensitive-skin-card__desc">{c.desc}</p></div>
          <label className="toggle-switch" htmlFor="sensitive-skin-toggle" aria-label={`${c.label}: ${enabled ? c.on : c.off}`}>
            <input type="checkbox" id="sensitive-skin-toggle" className="toggle-switch__input" checked={enabled} onChange={(event) => onEnabledChange?.(event.target.checked)} />
            <span className="toggle-switch__slider" />
          </label>
        </div>
        {enabled && <div className="sensitive-skin-card__allergens" aria-live="polite">
          {allergens.length === 0 ? <p className="sensitive-skin-card__status">{c.empty}</p> : allergens.map((allergen) => (
            <label className="sensitive-skin-card__allergen" key={allergen}><input type="checkbox" checked={selectedAllergens.includes(allergen)} disabled={loading} onChange={(event) => onAllergenChange?.(allergen, event.target.checked)} /><span>{allergen}</span></label>
          ))}
          <button type="button" className="reco-card__cta" disabled={loading} onClick={() => onApply?.()}>{loading ? c.updating : c.apply}</button>
          {error && <p className="sensitive-skin-card__status sensitive-skin-card__status--error">{error}</p>}
        </div>}
      </div>
    </article>
  )
}
