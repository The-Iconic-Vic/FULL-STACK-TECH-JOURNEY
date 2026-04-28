import 'react'
import styles from './ErrorState.module.css'

function ErrorState({ error, onRetry }) {
  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <h3 className={styles.errorTitle}>Failed to Load Users</h3>
      <p className={styles.errorMessage}>{error}</p>
      <div className={styles.errorActions}>
        <button className={styles.retryBtn} onClick={onRetry}>
          🔄 Try Again
        </button>
      </div>
    </div>
  )
}

export default ErrorState