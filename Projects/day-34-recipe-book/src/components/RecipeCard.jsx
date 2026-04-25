import styles from './RecipeCard.module.css'

function RecipeCard({ recipe, onToggleFavorite, onEdit, onDelete }) {
  return (
    <div className={`${styles.card} ${recipe.favorite ? styles.favorite : ''}`}>
      <div className={styles.header}>
        <h3 className={styles.title}>{recipe.title}</h3>
        <button 
          className={styles.favoriteBtn}
          onClick={() => onToggleFavorite(recipe.id)}
        >
          {recipe.favorite ? '★' : '☆'}
        </button>
      </div>
      
      <div className={styles.ingredients}>
        <strong>Ingredients:</strong>
        <ul>
          {recipe.ingredients.map((ing, idx) => (
            <li key={idx}>{ing}</li>
          ))}
        </ul>
      </div>
      
      <div className={styles.instructions}>
        <strong>Instructions:</strong>
        <p>{recipe.instructions.substring(0, 100)}...</p>
      </div>
      
      <div className={styles.actions}>
        <button className={styles.editBtn} onClick={() => onEdit(recipe)}>
          ✏️ Edit
        </button>
        <button className={styles.deleteBtn} onClick={() => onDelete(recipe.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  )
}

export default RecipeCard