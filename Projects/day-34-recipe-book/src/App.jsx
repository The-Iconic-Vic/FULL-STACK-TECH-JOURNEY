import { useState } from 'react'
import RecipeList from './components/RecipeList'
import RecipeForm from './components/RecipeForm'
import RecipeSearch from './components/RecipeSearch'
import styles from './App.module.css'

const initialRecipes = [
  {
    id: 1,
    title: 'Spaghetti Carbonara',
    ingredients: ['Spaghetti', 'Eggs', 'Pancetta', 'Parmesan', 'Black Pepper'],
    instructions: '1. Cook pasta\n2. Fry pancetta\n3. Mix eggs and cheese\n4. Combine all',
    favorite: true
  },
  {
    id: 2,
    title: 'Chicken Curry',
    ingredients: ['Chicken', 'Coconut Milk', 'Curry Powder', 'Onion', 'Garlic'],
    instructions: '1. Sauté onions\n2. Add chicken\n3. Add coconut milk\n4. Simmer',
    favorite: false
  },
  {
    id: 3,
    title: 'Caesar Salad',
    ingredients: ['Lettuce', 'Croutons', 'Parmesan', 'Caesar Dressing'],
    instructions: '1. Wash lettuce\n2. Add croutons\n3. Add dressing\n4. Top with parmesan',
    favorite: false
  }
]

function App() {
  const [recipes, setRecipes] = useState(initialRecipes)
  const [searchTerm, setSearchTerm] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingRecipe, setEditingRecipe] = useState(null)

  // Add new recipe
  const addRecipe = (newRecipe) => {
    setRecipes([...recipes, { ...newRecipe, id: Date.now(), favorite: false }])
    setShowForm(false)
  }

  // Update existing recipe
  const updateRecipe = (updatedRecipe) => {
    setRecipes(recipes.map(recipe =>
      recipe.id === updatedRecipe.id ? updatedRecipe : recipe
    ))
    setEditingRecipe(null)
    setShowForm(false)
  }

  // Delete recipe
  const deleteRecipe = (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      setRecipes(recipes.filter(recipe => recipe.id !== id))
    }
  }

  // Toggle favorite
  const toggleFavorite = (id) => {
    setRecipes(recipes.map(recipe =>
      recipe.id === id ? { ...recipe, favorite: !recipe.favorite } : recipe
    ))
  }

  // Edit recipe (open form with data)
  const editRecipe = (recipe) => {
    setEditingRecipe(recipe)
    setShowForm(true)
  }

  // Filter recipes by search term
  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>📖 Recipe Book</h1>
        <p className={styles.subtitle}>Manage your favorite recipes</p>

        <div className={styles.controls}>
          <RecipeSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          <button 
            className={styles.addBtn}
            onClick={() => {
              setEditingRecipe(null)
              setShowForm(true)
            }}
          >
            + Add Recipe
          </button>
        </div>

        {showForm && (
          <RecipeForm
            onSubmit={editingRecipe ? updateRecipe : addRecipe}
            initialData={editingRecipe}
            onCancel={() => {
              setShowForm(false)
              setEditingRecipe(null)
            }}
          />
        )}

        <RecipeList
          recipes={filteredRecipes}
          onToggleFavorite={toggleFavorite}
          onEdit={editRecipe}
          onDelete={deleteRecipe}
        />
      </div>
    </div>
  )
}

export default App