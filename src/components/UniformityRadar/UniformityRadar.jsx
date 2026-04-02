import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip,
} from 'recharts'
import './UniformityRadar.css'
import { useLanguage } from '../../i18n/LanguageContext.jsx'

const REGION_ORDER = ['testa', 'bochecha_e', 'bochecha_d', 'nariz', 'queixo']

export default function UniformityRadar({ regioes }) {
  const { t } = useLanguage()

  const data = REGION_ORDER
    .filter((k) => regioes[k])
    .map((k) => ({
      region: t.regions[k] ?? k,
      score: regioes[k].uniformidade ?? 0,
      fullMark: 10,
    }))

  if (data.length < 3) return null

  return (
    <div className="uniformity-radar">
      <p className="uniformity-radar__title">Skin Uniformity Map</p>
      <ResponsiveContainer width="100%" height={260}>
        <RadarChart data={data} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="var(--color-border)" />
          <PolarAngleAxis
            dataKey="region"
            tick={{ fill: 'var(--color-text-muted)', fontSize: 12 }}
          />
          <Radar
            dataKey="score"
            stroke="var(--color-accent)"
            fill="var(--color-accent)"
            fillOpacity={0.25}
            strokeWidth={2}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: '8px',
              fontSize: '0.8rem',
              color: 'var(--color-text)',
            }}
            formatter={(value) => [`${value}/10`, 'Uniformity']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  )
}
