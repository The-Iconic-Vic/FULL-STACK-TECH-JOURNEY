import React from 'react'
import Counter from './components/Counter'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Counter />
      </div>
    </div>
  )
}

export default App