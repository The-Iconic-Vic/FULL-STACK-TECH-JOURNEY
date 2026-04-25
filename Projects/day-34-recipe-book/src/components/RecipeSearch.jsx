import styles from './RecipeSearch.module.css'

function RecipeSearch({ searchTerm, onSearchChange }) {
  return (
    <div className={styles.search}>
      <input
        type="text"
        className={styles.input}
        placeholder="🔍 Search recipes by title..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  )
}

export default RecipeSearch