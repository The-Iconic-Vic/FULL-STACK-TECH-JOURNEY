const API_BASE = 'http://localhost:5000/api'

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token')
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  }
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  console.log(`API Request: ${API_BASE}${endpoint}`, { method: options.method || 'GET' })
  
  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  })
  
  const data = await response.json()
  console.log('API Response:', data)
  
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    throw new Error(data.error || 'Request failed')
  }
  
  return data
}

export default apiFetch