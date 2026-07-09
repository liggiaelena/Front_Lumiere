import axios from 'axios'
import { mockAnalysisResponse } from '../mocks/analysisResponse.js'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
})

function buildMockAnalysisResponse() {
  return mockAnalysisResponse
}

export async function analyzeImage(file, lang = 'en') {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const response = await api.post(`/api/analyze?lang=${lang}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  } catch (error) {
    if (import.meta.env.DEV) {
      return buildMockAnalysisResponse(lang)
    }

    throw error
  }
}
