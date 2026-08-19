import axios from 'axios'
// Use the current origin by default so /api requests go through Vite's proxy.
// VITE_API_URL remains available for deployments with a separate API host.
const BASE_URL = import.meta.env.VITE_API_URL || ''

const api = axios.create({
  baseURL: BASE_URL,
  // Photo analysis and live GPT web search can both exceed 30 seconds.
  timeout: 120000,
})

const TOKEN_KEY = 'lumiere_access_token'

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

function saveSession(data) {
  localStorage.setItem(TOKEN_KEY, data.access_token)
  return data.user
}

export function hasSession() {
  return Boolean(localStorage.getItem(TOKEN_KEY))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
}

export async function login({ email, password }) {
  const response = await api.post('/api/auth/login', { email, password })
  return saveSession(response.data)
}

export async function register({ username, email, password }) {
  const response = await api.post('/api/auth/register', { username, email, password })
  return saveSession(response.data)
}

export async function getCurrentUser() {
  const response = await api.get('/api/auth/me')
  return response.data
}

export async function analyzeImage(file, lang = 'en') {
  const formData = new FormData()
  formData.append('file', file)

  const response = await api.post(`/api/analyze?lang=${lang}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export async function getHistory() {
  const response = await api.get('/api/analyze')
  return response.data.items
}

export async function getAnalysis(analysisId) {
  const response = await api.get(`/api/analyze/${encodeURIComponent(analysisId)}`)
  return response.data
}

export async function getAnalysisStatus(analysisId, { signal } = {}) {
  const response = await api.get(`/api/analyze/${encodeURIComponent(analysisId)}/status`, { signal })
  return response.data
}

export async function getCatalogAllergens() {
  const response = await api.get('/api/products/allergens')
  return Array.isArray(response.data?.allergens) ? response.data.allergens : []
}

export async function requestRecommendations(analysisId, excludedAllergens = [], { forceFallback = false, lang = 'en' } = {}) {
  const response = await api.post(`/api/analyze/${encodeURIComponent(analysisId)}/recommendations`, {
    excluded_allergens: excludedAllergens,
    force_fallback: forceFallback,
    lang,
  })
  return response.data
}


export async function getRecommendationStatus(jobId, { signal } = {}) {
  const response = await api.get(`/api/recommendation-jobs/${encodeURIComponent(jobId)}/status`, { signal })
  return response.data
}


export async function getSavedRecommendations(analysisId) {
  const response = await api.get(`/api/analyze/${encodeURIComponent(analysisId)}/recommendations`)
  return response.data
}
