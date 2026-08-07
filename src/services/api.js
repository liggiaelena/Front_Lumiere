import axios from 'axios'
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
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
