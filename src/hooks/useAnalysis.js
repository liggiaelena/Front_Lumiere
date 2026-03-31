import { useState } from 'react'
import { analyzeImage } from '../services/api.js'
import { mockAnalysisResponse } from '../mocks/analysisResponse.js'

const USE_MOCK = true

export function useAnalysis({ setStep }) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [result, setResult] = useState(null)

  async function analyze(file) {
    setLoading(true)
    setError(null)
    setStep('analyzing')

    try {
      let data

      if (USE_MOCK) {
        await new Promise((resolve) => setTimeout(resolve, 2000))
        data = mockAnalysisResponse
      } else {
        data = await analyzeImage(file)
      }

      setResult(data)
      setStep('result')
    } catch (err) {
      const message =
        err?.response?.status === 413
          ? 'Image too large. Please use an image smaller than 10MB.'
          : err?.response?.status === 422
          ? 'Could not detect a face in the image. Please try another photo.'
          : 'Error analyzing the image. Check your connection and try again.'

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
