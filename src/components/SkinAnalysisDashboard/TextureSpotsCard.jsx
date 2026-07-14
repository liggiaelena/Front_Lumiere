/**
 * TextureSpotsCard.jsx
 * Lumière — Right column, Row 1.
 *
 * This card corresponds to the previous version's "Detected imperfections"
 * (t.result.imperfectionsTitle). It renders the list of detected imperfections
 * along with their region and intensity badges.
 */
import { useLanguage } from '../../i18n/LanguageContext.jsx'

export default function TextureSpotsCard({ imperfeicoes }) {
  const { t } = useLanguage()

  const safe = Array.isArray(imperfeicoes) ? imperfeicoes : []

  return (
    <article className="bento-card grid-area--texture-spots" aria-label="Detected imperfections card">
      {/* Header */}
      <div className="bento-card__header">
        <h3 className="bento-card__title">
          {t.result.imperfectionsTitle ?? 'Detected imperfections'}
        </h3>
      </div>

      <div className="bento-card__body">
        {safe.length > 0 ? (
          <ul className="analysis-result__imperfeicoes-list" role="list" style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
            {safe.map((imp, i) => (
              <li 
                key={i} 
                className="analysis-result__imperfeicoes-item"
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: 'var(--spacing-xs) 0', 
                  borderBottom: '1px solid var(--color-accent-light)' 
                }}
                role="listitem"
              >
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-primary)' }}>
                  {t.imperfections?.[imp.tipo] ?? imp.tipo}
                </span>
                <div className="analysis-result__imperfeicoes-badges" style={{ display: 'flex', gap: 'var(--spacing-xs)', alignItems: 'center' }}>
                  <span 
                    className="analysis-result__badge analysis-result__badge--regiao"
                    style={{ 
                      fontSize: '0.7rem', 
                      padding: '2px 8px', 
                      borderRadius: '99px', 
                      backgroundColor: 'var(--color-accent-light)', 
                      color: 'var(--color-primary)',
                      fontWeight: 600
                    }}
                  >
                    {t.regions?.[imp.regiao] ?? imp.regiao}
                  </span>
                  <span 
                    className={`analysis-result__badge analysis-result__badge--${imp.intensidade}`}
                    style={{ 
                      fontSize: '0.7rem', 
                      padding: '2px 8px', 
                      borderRadius: '99px', 
                      backgroundColor: imp.intensidade === 'alta' ? 'var(--color-error-light)' : 'var(--color-background)', 
                      color: imp.intensidade === 'alta' ? 'var(--color-error)' : 'var(--color-text-muted)',
                      fontWeight: 600
                    }}
                  >
                    {t.intensity?.[imp.intensidade] ?? imp.intensidade}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: 'var(--color-success)', fontWeight: 600, fontSize: '0.875rem', margin: 0 }}>
            ✓ {t.result.noImperfections ?? 'No imperfections detected'}
          </p>
        )}
      </div>
    </article>
  )
}
