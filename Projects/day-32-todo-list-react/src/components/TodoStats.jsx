import styles from './TodoStats.module.css'

function TodoStats({ todos }) {
  const total = todos.length
  const completed = todos.filter(todo => todo.completed).length
  const active = total - completed
  const percentComplete = total === 0 ? 0 : Math.round((completed / total) * 100)

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
          <div 
            className={styles.progressFill} 
            style={{ width: `${percentComplete}%` }}
          ></div>
        </div>
        <span className={styles.statLabel}>{percentComplete}% Done</span>
      </div>
    </div>
  )
}

export default TodoStats