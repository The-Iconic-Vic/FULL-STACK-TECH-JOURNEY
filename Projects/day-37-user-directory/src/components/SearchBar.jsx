import 'react'
import styles from './SearchBar.module.css'

function SearchBar({ searchTerm, onSearchChange, onRefresh }) {
  return (
    <div className={styles.searchBar}>
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="🔍 Search by name, email, or company..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button 
            className={styles.clearBtn}
            onClick={() => onSearchChange('')}
          >
            ✕
          </button>
        )}
      </div>
      <button className={styles.refreshBtn} onClick={onRefresh}>
        🔄 Refresh
      </button>
    </div>
  )
}

export default SearchBar