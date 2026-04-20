import React from 'react'
import styles from './Greeting.module.css'

function Greeting() {
  const name = "Victor Innocent"
  
  return (
    <div className={styles.card}>
      <div className={styles.icon}>👋</div>
      <h2 className={styles.title}>Hello, {name}!</h2>
      <p className={styles.message}>
        Welcome to your first React component! 
        This is a functional component using JSX.
      </p>
      <p className={styles.note}>
        🚀 built with React + Vite
      </p>
    </div>
  )
}

export default Greeting