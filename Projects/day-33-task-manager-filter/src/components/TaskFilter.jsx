import styles from './TaskFilter.module.css'

function TaskFilter({ currentFilter, onFilterChange }) {
  const filters = [
    { value: 'all', label: 'All', icon: '📋' },
    { value: 'active', label: 'Active', icon: '🔄' },
    { value: 'completed', label: 'Completed', icon: '✅' }
  ]

  return (
    <div className={styles.filterContainer}>
      {filters.map(filter => (
        <button
          key={filter.value}
          className={`${styles.filterBtn} ${currentFilter === filter.value ? styles.active : ''}`}
          onClick={() => onFilterChange(filter.value)}
        >
          <span className={styles.icon}>{filter.icon}</span>
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default TaskFilter