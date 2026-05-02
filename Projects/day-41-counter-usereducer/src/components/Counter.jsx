import React, { useReducer, useState } from 'react'
import { counterReducer, ACTIONS } from '../reducers/counterReducer'
import styles from './Counter.module.css'

function Counter() {
  // useReducer returns [state, dispatch]
  const [state, dispatch] = useReducer(counterReducer, { count: 0 })
  const [inputValue, setInputValue] = useState('')

  const handleSetValue = () => {
    const num = parseInt(inputValue)
    if (!isNaN(num)) {
      dispatch({ type: ACTIONS.SET_VALUE, payload: num })
      setInputValue('')
    }
  }

  return (
    <div className={styles.counter}>
      <h1 className={styles.title}>🎯 useReducer Counter</h1>
      
      <div className={styles.display}>
        <span className={styles.count}>{state.count}</span>
      </div>

      <div className={styles.buttons}>
        <button 
          className={styles.btn}
          onClick={() => dispatch({ type: ACTIONS.DECREMENT })}
        >
          - Decrement
        </button>
        <button 
          className={`${styles.btn} ${styles.reset}`}
          onClick={() => dispatch({ type: ACTIONS.RESET })}
        >
          Reset
        </button>
        <button 
          className={`${styles.btn} ${styles.increment}`}
          onClick={() => dispatch({ type: ACTIONS.INCREMENT })}
        >
          Increment +
        </button>
      </div>

      <div className={styles.setValue}>
        <input
          type="number"
          className={styles.input}
          placeholder="Set custom value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSetValue()}
        />
        <button 
          className={styles.setBtn}
          onClick={handleSetValue}
        >
          Set Value
        </button>
      </div>

      <div className={styles.info}>
        <h3>📖 How useReducer Works</h3>
        <div className={styles.codeBlock}>
          <pre>{`
// Reducer function
function counterReducer(state, action) {
  switch(action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 }
    case 'DECREMENT':
      return { count: state.count - 1 }
    default:
      return state
  }
}

// In component
const [state, dispatch] = useReducer(counterReducer, { count: 0 })

// Dispatch actions
dispatch({ type: 'INCREMENT' })
dispatch({ type: 'SET_VALUE', payload: 10 })
          `}</pre>
        </div>
        <div className={styles.comparison}>
          <div className={styles.useStateBox}>
            <h4>useState</h4>
            <p>✓ Simple state updates</p>
            <p>✓ Best for independent values</p>
            <p>✗ Can get messy with complex logic</p>
          </div>
          <div className={styles.useReducerBox}>
            <h4>useReducer</h4>
            <p>✓ Complex state transitions</p>
            <p>✓ Predictable updates via actions</p>
            <p>✓ Easy to test</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Counter