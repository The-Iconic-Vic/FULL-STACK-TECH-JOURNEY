import RecipeCard from './RecipeCard'
import styles from './RecipeList.module.css'

function RecipeList({ recipes, onToggleFavorite, onEdit, onDelete }) {
  if (recipes.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📖</div>
        <h3>No recipes found</h3>
        <p>Try adjusting your search or add a new recipe</p>
      </div>
    )
  }

  return (
    <div className={styles.grid}>
      {recipes.map(recipe => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onToggleFavorite={onToggleFavorite}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default RecipeList