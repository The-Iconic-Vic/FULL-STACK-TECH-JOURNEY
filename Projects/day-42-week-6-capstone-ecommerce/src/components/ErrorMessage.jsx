import React from 'react'
import styles from './ErrorMessage.module.css'

function ErrorMessage({ message, onRetry }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <h3 className={styles.errorTitle}>Something went wrong</h3>
      <p className={styles.errorMessage}>{message}</p>
      <button className={styles.retryBtn} onClick={onRetry}>
        Try Again
      </button>
    </div>
  )
}

export default ErrorMessage