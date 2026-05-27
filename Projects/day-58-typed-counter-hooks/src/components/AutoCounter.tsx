import React, { useState, useRef, useEffect } from 'react'

const AutoCounter: React.FC = () => {
  const [count, setCount] = useState<number>(0)
  const [isRunning, setIsRunning] = useState<boolean>(false)
  
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const previousCountRef = useRef<number>(count)
  const isMountedRef = useRef<boolean>(true)
  
  useEffect(() => {
    previousCountRef.current = count
  }, [count])
  
  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])
  
  const startAutoIncrement = () => {
    if (intervalRef.current) return
    
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      if (isMountedRef.current) {
        setCount(prev => prev + 1)
      }
    }, 500)
  }
  
  const stopAutoIncrement = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
      setIsRunning(false)
    }
  }
  
  const reset = () => {
    setCount(0)
    stopAutoIncrement()
  }
  
  const previousCount = previousCountRef.current
  
  return (
    <div className="card">
      <h2>⏱️ Auto Counter (useRef Demo)</h2>
      <p className="info-text">Mutable refs for interval and previous value</p>
      
      <div className="display">{count}</div>
      
      <div className="button-group">
        <button className="btn btn-success" onClick={startAutoIncrement} disabled={isRunning}>
          Start Auto
        </button>
        <button className="btn btn-danger" onClick={stopAutoIncrement} disabled={!isRunning}>
          Stop
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>
      
      <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#f8f9fa', borderRadius: '8px' }}>
        <p style={{ fontSize: '0.75rem', marginBottom: '0.25rem' }}>
          <strong>Previous count:</strong> {previousCount}
        </p>
        <p style={{ fontSize: '0.75rem' }}>
          <strong>Interval running:</strong> {isRunning ? 'Yes' : 'No'}
        </p>
      </div>
      
      <div className="code-block">
        <pre>{`// Mutable ref (no re-render)
const intervalRef = useRef<NodeJS.Timeout | null>(null);

// Store value across renders
const previousCountRef = useRef<number>(count);

useEffect(() => {
  previousCountRef.current = count;
}, [count]);`}</pre>
      </div>
    </div>
  )
}

export default AutoCounter