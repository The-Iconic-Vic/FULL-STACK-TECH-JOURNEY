import styles from './TaskStats.module.css'

function TaskStats({ tasks }) {
  const total = tasks.length
  const completed = tasks.filter(task => task.completed).length
  const active = total - completed
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div className={styles.stats}>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{total}</span>
        <span className={styles.statLabel}>Total</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{active}</span>
        <span className={styles.statLabel}>Active</span>
      </div>
      <div className={styles.statCard}>
        <span className={styles.statValue}>{completed}</span>
        <span className={styles.statLabel}>Completed</span>
      </div>
      <div className={styles.statCard}>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${percent}%` }}></div>
        </div>
        <span className={styles.statLabel}>{percent}% Done</span>
      </div>
    </div>
  )
}

export default TaskStats