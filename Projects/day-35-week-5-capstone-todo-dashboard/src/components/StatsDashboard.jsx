import styles from './StatsDashboard.module.css'

function StatsDashboard({ stats }) {
  return (
    <div className={styles.dashboard}>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{stats.total}</span>
        <span className={styles.statLabel}>Total Tasks</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{stats.active}</span>
        <span className={styles.statLabel}>Active</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{stats.completed}</span>
        <span className={styles.statLabel}>Completed</span>
      </div>
      <div className={styles.statCard}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${stats.percent}%` }}></div>
        </div>
        <span className={styles.statLabel}>{stats.percent}% Complete</span>
      </div>
    </div>
  )
}

export default StatsDashboard