import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      setToken(storedToken)
      fetchUser(storedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const fetchUser = async (authToken) => {
    try {
      const response = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` }
      })
      setUser(response.data.user)
    } catch (err) {
      console.error('Failed to fetch user:', err)
      localStorage.removeItem('token')
      setToken(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    setError(null)
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token: newToken, user: userData } = response.data
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('token', newToken)
      return response.data
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
      throw err
    }
  }

  const register = async (name, email, password) => {
    setError(null)
    try {
      const response = await api.post('/auth/register', { name, email, password })
      const { token: newToken, user: userData } = response.data
      setToken(newToken)
      setUser(userData)
      localStorage.setItem('token', newToken)
      return response.data
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed')
      throw err
    }
  }

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('token')
  }

  const value = {
    token,
    user,
    loading,
    error,
    login,
    register,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}