import styles from './FilterBar.module.css'

function FilterBar({ filter, onFilterChange, sortBy, onSortChange, searchTerm, onSearchChange }) {
  const filters = [
    { value: 'all', label: 'All', icon: '📋' },
    { value: 'active', label: 'Active', icon: '🔄' },
    { value: 'completed', label: 'Completed', icon: '✅' }
  ]

  return (
    <div className={styles.filterBar}>
      <div className={styles.filterButtons}>
        {filters.map(f => (
          <button
            key={f.value}
            className={`${styles.filterBtn} ${filter === f.value ? styles.active : ''}`}
            onClick={() => onFilterChange(f.value)}
          >
            {f.icon} {f.label}
          </button>
        ))}
      </div>
      
      <div className={styles.rightControls}>
        <input
          type="text"
          className={styles.search}
          placeholder="🔍 Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <select className={styles.sort} value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
          <option value="date-asc">📅 Due Date (Earliest)</option>
          <option value="date-desc">📅 Due Date (Latest)</option>
          <option value="priority">⚠️ Priority (High to Low)</option>
          <option value="alpha-asc">🔤 Title (A-Z)</option>
          <option value="alpha-desc">🔤 Title (Z-A)</option>
        </select>
      </div>
    </div>
  )
}

export default FilterBar