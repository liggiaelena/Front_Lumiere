import { useEffect, useRef, useState } from 'react'
import { analyzeImage, getAnalysis, getAnalysisStatus } from '../services/api.js'
import { useLanguage } from '../i18n/LanguageContext.jsx'

const TERMINAL_FAILURES = new Set(['failed', 'cancelled', 'expired'])

function wait(milliseconds, signal) {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(resolve, milliseconds)
    signal?.addEventListener('abort', () => {
      window.clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    }, { once: true })
  })
}

export function useAnalysis({ setStep, onJobAccepted }) {
  const { t, lang } = useLanguage()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)
  const [jobStatus, setJobStatus] = useState(null)
  const controllerRef = useRef(null)

  useEffect(() => () => controllerRef.current?.abort(), [])

  async function pollUntilReady(analysisId) {
    controllerRef.current?.abort()
    const controller = new AbortController()
    controllerRef.current = controller
    let networkDelay = 2000

    while (!controller.signal.aborted) {
      try {
        const status = await getAnalysisStatus(analysisId, { signal: controller.signal })
        setJobStatus(status)
        networkDelay = 2000
        if (status.analysis_status === 'ready') {
          const data = await getAnalysis(analysisId)
          setResult(data)
          setStep('result')
          setLoading(false)
          return data
        }
        if (TERMINAL_FAILURES.has(status.analysis_status)) {
          const terminalError = new Error(status.analysis_error || 'Analysis could not be completed.')
          terminalError.isTerminal = true
          throw terminalError
        }
        await wait((status.poll_after_seconds || 2) * 1000, controller.signal)
      } catch (err) {
        if (err?.name === 'AbortError' || err?.code === 'ERR_CANCELED') return null
        if (err?.isTerminal || err?.response?.status === 404 || err?.response?.status === 403) throw err
        await wait(networkDelay, controller.signal)
        networkDelay = Math.min(networkDelay * 2, 15000)
      }
    }
    return null
  }

  async function analyze(file) {
    setLoading(true)
    setError(null)
    setJobStatus({ analysis_status: 'uploading', analysis_stage: 'uploading' })
    setStep('analyzing')
    try {
      const job = await analyzeImage(file, lang)
      setJobStatus(job)
      onJobAccepted?.(job)
      await pollUntilReady(job.id)
    } catch (err) {
      const message = err?.response?.status === 429
        ? (err.response.data?.detail?.message || 'The analysis queue is full. Please try again shortly.')
        : err?.response?.status === 413
          ? t.errors.tooLarge
          : err?.response?.status === 422
            ? t.errors.noFace
            : (err?.message || t.errors.generic)
      setError(message)
      setStep('preview')
      setLoading(false)
    }
  }

  async function resumeAnalysis(analysisId) {
    setLoading(true)
    setError(null)
    setStep('loading-result')
    try {
      return await pollUntilReady(analysisId)
    } catch (err) {
      setError(err?.message || t.errors.generic)
      setLoading(false)
      throw err
    }
  }

  function reset() {
    controllerRef.current?.abort()
    setLoading(false)
    setError(null)
    setResult(null)
    setJobStatus(null)
  }

  function showResult(data) {
    controllerRef.current?.abort()
    setError(null)
    setResult(data)
    setJobStatus({ analysis_status: 'ready', analysis_stage: 'ready' })
    setStep('result')
  }

  return { loading, error, result, jobStatus, analyze, reset, showResult, resumeAnalysis }
}
