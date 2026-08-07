import { useEffect, useState } from 'react'
import { getAnalysis, getHistory } from '../../services/api.js'
import { useLanguage } from '../../i18n/LanguageContext.jsx'
import './AnalysisHistory.css'

const COPY = {
  en: { title: 'Analysis history', empty: 'No saved analyses yet.', new: 'New analysis', view: 'View report', error: 'History could not be loaded.' },
  pt: { title: 'Histórico de análises', empty: 'Ainda não há análises guardadas.', new: 'Nova análise', view: 'Ver relatório', error: 'Não foi possível carregar o histórico.' },
  fr: { title: 'Historique des analyses', empty: 'Aucune analyse enregistrée.', new: 'Nouvelle analyse', view: 'Voir le rapport', error: "Impossible de charger l’historique." },
  zh: { title: '分析历史', empty: '尚无已保存的分析。', new: '新分析', view: '查看报告', error: '无法加载历史记录。' },
  tw: { title: '分析歷史', empty: '尚無已儲存的分析。', new: '新分析', view: '查看報告', error: '無法載入歷史記錄。' },
  tr: { title: 'Analiz geçmişi', empty: 'Henüz kayıtlı analiz yok.', new: 'Yeni analiz', view: 'Raporu görüntüle', error: 'Geçmiş yüklenemedi.' },
}

export default function AnalysisHistory({ onSelect, onNewAnalysis }) {
  const { lang } = useLanguage()
  const labels = COPY[lang] ?? COPY.en
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [openingId, setOpeningId] = useState(null)

  useEffect(() => {
    getHistory()
      .then(setItems)
      .catch(() => setError(labels.error))
      .finally(() => setLoading(false))
  }, [labels.error])

  async function openReport(id) {
    setOpeningId(id)
    setError('')
    try {
      onSelect(await getAnalysis(id))
    } catch {
      setError(labels.error)
      setOpeningId(null)
    }
  }

  return (
    <section className="history-page">
      <div className="history-page__heading">
        <h2>{labels.title}</h2>
        <button type="button" onClick={onNewAnalysis}>{labels.new}</button>
      </div>
      {error && <p className="history-page__status history-page__status--error">{error}</p>}
      {loading && <p className="history-page__status" aria-live="polite">…</p>}
      {!loading && !error && items.length === 0 && (
        <p className="history-page__status">{labels.empty}</p>
      )}
      <div className="history-page__grid">
        {items.map((item) => (
          <article className="history-card" key={item.id}>
            <div className="history-card__swatch" style={{ backgroundColor: item.tom_geral_hex || '#ddd' }} />
            <div>
              <time dateTime={item.created_at}>{new Intl.DateTimeFormat(lang, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(item.created_at))}</time>
              <p>Fitzpatrick {item.tom_geral_fitzpatrick ?? '—'} · {item.subtom_predominante || '—'}</p>
            </div>
            <button type="button" disabled={openingId === item.id} onClick={() => openReport(item.id)}>
              {openingId === item.id ? '…' : labels.view}
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}
