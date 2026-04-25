import { useState } from 'react'
import styles from './RecipeForm.module.css'

function RecipeForm({ onSubmit, initialData, onCancel }) {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    ingredients: initialData?.ingredients?.join(', ') || '',
    instructions: initialData?.instructions || ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const ingredientsArray = formData.ingredients
      .split(',')
      .map(ing => ing.trim())
      .filter(ing => ing)
    
    const recipeData = {
      title: formData.title,
      ingredients: ingredientsArray,
      instructions: formData.instructions
    }
    
    if (initialData) {
      onSubmit({ ...recipeData, id: initialData.id, favorite: initialData.favorite })
    } else {
      onSubmit(recipeData)
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h3 className={styles.title}>
        {initialData ? '✏️ Edit Recipe' : '➕ Add New Recipe'}
      </h3>
      
      <div className={styles.field}>
        <label>Recipe Title</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="e.g., Spaghetti Carbonara"
        />
      </div>
      
      <div className={styles.field}>
        <label>Ingredients (comma-separated)</label>
        <textarea
          name="ingredients"
          value={formData.ingredients}
          onChange={handleChange}
          required
          placeholder="e.g., Pasta, Eggs, Bacon, Parmesan"
          rows={3}
        />
      </div>
      
      <div className={styles.field}>
        <label>Instructions</label>
        <textarea
          name="instructions"
          value={formData.instructions}
          onChange={handleChange}
          required
          placeholder="Step-by-step instructions..."
          rows={5}
        />
      </div>
      
      <div className={styles.actions}>
        <button type="submit" className={styles.submitBtn}>
          {initialData ? 'Update Recipe' : 'Add Recipe'}
        </button>
        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  )
}

export default RecipeForm