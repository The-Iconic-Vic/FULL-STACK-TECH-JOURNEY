import { useState } from 'react'
import styles from './Counter.module.css'

function Counter() {
  // useState hook - returns [currentState, setterFunction]
  const [count, setCount] = useState(0)

  // Event handlers
  const handleIncrement = () => {
    setCount(count + 1)
  }

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1)
    }
  }

  const handleReset = () => {
    setCount(0)
  }

  // Determine if decrement button should be disabled
  const isDecrementDisabled = count === 0

  return (
    <div className={styles.counter}>
      <h1 className={styles.title}>Interactive Counter</h1>
      
      <div className={styles.display}>
        <span className={styles.count}>{count}</span>
      </div>

      <div className={styles.buttons}>
        <button 
          className={styles.btn}
          onClick={handleDecrement}
          disabled={isDecrementDisabled}
        >
          − Decrement
        </button>
        
        <button 
          className={`${styles.btn} ${styles.reset}`}
          onClick={handleReset}
        >
          Reset
        </button>
        
        <button 
          className={`${styles.btn} ${styles.increment}`}
          onClick={handleIncrement}
        >
          Increment +
        </button>
      </div>

      <div className={styles.info}>
        <p>💡 State changes trigger re-renders</p>
        <p>Count: {count} | {count === 0 ? 'Minimum reached' : count > 10 ? 'Getting high!' : 'Keep going!'}</p>
      </div>
    </div>
  )
}

export default Counter