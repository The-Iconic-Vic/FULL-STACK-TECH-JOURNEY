import 'react'
import styles from './LoadingSkeleton.module.css'

function LoadingSkeleton({ count = 6 }) {
  return (
    <div className={styles.grid}>
      {Array(count).fill().map((_, index) => (
        <div key={index} className={styles.skeletonCard}>
          <div className={styles.skeletonAvatar}></div>
          <div className={styles.skeletonContent}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonText}></div>
            <div className={styles.skeletonButton}></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default LoadingSkeleton