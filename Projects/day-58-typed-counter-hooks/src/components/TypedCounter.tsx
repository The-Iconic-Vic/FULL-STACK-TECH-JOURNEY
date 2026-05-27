import React, { useReducer, useState, useRef } from 'react'
import { CounterState, CounterAction } from '../types'

const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1, error: null }
    case 'DECREMENT':
      return { ...state, count: state.count - 1, error: null }
    case 'RESET':
      return { ...state, count: 0, error: null }
    case 'SET_COUNT':
      return { ...state, count: action.payload, error: null }
    case 'SET_LOADING':
      return { ...state, loading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false }
    default:
      return state
  }
}

const initialState: CounterState = {
  count: 0,
  loading: false,
  error: null
}

const TypedCounter: React.FC = () => {
  const [state, dispatch] = useReducer(counterReducer, initialState)
  const [inputValue, setInputValue] = useState<string>('')
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSetValue = () => {
    const num = parseInt(inputValue)
    if (!isNaN(num)) {
      dispatch({ type: 'SET_COUNT', payload: num })
      setInputValue('')
      inputRef.current?.focus()
    } else {
      dispatch({ type: 'SET_ERROR', payload: 'Please enter a valid number' })
    }
  }

  const simulateAsyncOperation = () => {
    dispatch({ type: 'SET_LOADING', payload: true })
    
    setTimeout(() => {
      dispatch({ type: 'INCREMENT' })
      dispatch({ type: 'SET_LOADING', payload: false })
    }, 1000)
  }

  return (
    <div className="card">
      <h2>📊 useReducer Counter</h2>
      <p className="info-text">Typed state + discriminated union actions</p>
      
      <div className={`display ${state.loading ? 'loading' : ''}`}>
        {state.count}
      </div>
      
      {state.error && <div className="error-message">{state.error}</div>}
      
      <div className="button-group">
        <button 
          className="btn btn-danger" 
          onClick={() => dispatch({ type: 'DECREMENT' })}
          disabled={state.loading}
        >
          - Decrement
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={() => dispatch({ type: 'RESET' })}
          disabled={state.loading}
        >
          Reset
        </button>
        <button 
          className="btn btn-success" 
          onClick={() => dispatch({ type: 'INCREMENT' })}
          disabled={state.loading}
        >
          Increment +
        </button>
      </div>
      
      <div className="input-group">
        <input
          ref={inputRef}
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Set custom value"
          disabled={state.loading}
        />
        <button className="btn btn-primary" onClick={handleSetValue} disabled={state.loading}>
          Set
        </button>
      </div>
      
      <div className="button-group">
        <button className="btn btn-primary" onClick={simulateAsyncOperation} disabled={state.loading}>
          {state.loading ? 'Loading...' : 'Async Increment (1s)'}
        </button>
      </div>
      
      <div className="code-block">
        <pre>{`type CounterState = {
  count: number;
  loading: boolean;
  error: string | null;
};

type CounterAction =
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'RESET' }
  | { type: 'SET_COUNT'; payload: number }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };

const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT' });`}</pre>
      </div>
    </div>
  )
}

export default TypedCounter