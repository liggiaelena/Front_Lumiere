import { useState } from 'react'
import { analyzeImage } from '../services/api.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

export function useAnalysis({ setStep }) {
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  async function analyze(file) {
    setLoading(true)
    setError(null)
    setStep('analyzing')

    try {
      const data = await analyzeImage(file)
      setResult(data)
      setStep('result')
    } catch (err) {
      const message =
        err?.response?.status === 413
          ? t.errors.tooLarge
          : err?.response?.status === 422
          ? t.errors.noFace
          : t.errors.generic

      setError(message)
      setStep('preview')
    } finally {
      setLoading(false)
    }
  }

  function reset() {
    setLoading(false)
    setError(null)
    setResult(null)
  }

  return { loading, error, result, analyze, reset }
}
