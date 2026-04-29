import { useState, useEffect, useCallback, useRef } from 'react'

// Simple cache object
const cache = new Map()

/**
 * Custom hook for fetching data with caching
 * @param {string} url - API endpoint
 * @param {object} options - Fetch options (method, headers, etc.)
 * @returns {object} - { data, loading, error, refetch }
 */
function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)

  const fetchData = useCallback(async () => {
    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    // Check cache first
    const cacheKey = `${url}-${JSON.stringify(options)}`
    if (cache.has(cacheKey)) {
      console.log(`📦 Cache hit for: ${url}`)
      setData(cache.get(cacheKey))
      setLoading(false)
      return
    }

    console.log(`🌐 Fetching: ${url}`)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      
      // Store in cache
      cache.set(cacheKey, result)
      console.log(`💾 Cached: ${url}`)
      
      setData(result)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [url, options])

  const refetch = useCallback(() => {
    // Clear cache for this URL before refetch
    const cacheKey = `${url}-${JSON.stringify(options)}`
    cache.delete(cacheKey)
    fetchData()
  }, [url, options, fetchData])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData])

  return { data, loading, error, refetch }
}

export default useFetch