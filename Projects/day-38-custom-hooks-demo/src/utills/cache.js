// Simple cache utility for useFetch hook
export const cache = new Map()

export const getCached = (key) => cache.get(key)
export const setCached = (key, value) => cache.set(key, value)
export const clearCache = () => cache.clear()
export const deleteCached = (key) => cache.delete(key)