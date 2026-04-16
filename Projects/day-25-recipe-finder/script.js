// ============================================
// RECIPE FINDER APP
// Demonstrating: API data fetching, display, filtering, modal details
// ============================================

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const areaFilter = document.getElementById('area-filter');
const loadingSpinner = document.getElementById('loading-spinner');
const resultsCount = document.getElementById('results-count');
const recipeCountSpan = document.getElementById('recipe-count');
const recipesGrid = document.getElementById('recipes-grid');
const modal = document.getElementById('recipe-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

// State
let currentRecipes = [];

// ============================================
// SEARCH RECIPES BY INGREDIENT
// ============================================
async function searchRecipes(ingredient) {
    if (!ingredient.trim()) {
        alert('Please enter an ingredient');
        return;
    }
    
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE}/filter.php?i=${ingredient}`);
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        currentRecipes = data.meals || [];
        
        applyFilters();
        
    } catch (error) {
        console.error('Error fetching recipes:', error);
        recipesGrid.innerHTML = '<div class="empty-state">❌ Failed to load recipes. Please try again.</div>';
        resultsCount.classList.add('hidden');
    } finally {
        hideLoading();
    }
}

// ============================================
// FETCH RECIPE DETAILS BY ID
// ============================================
async function fetchRecipeDetails(id) {
    showLoading();
    
    try {
        const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
        const data = await response.json();
        const meal = data.meals[0];
        showRecipeModal(meal);
    } catch (error) {
        console.error('Error fetching recipe details:', error);
        alert('Failed to load recipe details');
    } finally {
        hideLoading();
    }
}

// ============================================
// APPLY FILTERS (Area/Cuisine)
// ============================================
async function applyFilters() {
    const selectedArea = areaFilter.value;
    
    let filteredRecipes = [...currentRecipes];
    
    if (selectedArea !== 'all') {
        // Need to fetch full details for area filtering
        const filtered = [];
        for (const recipe of filteredRecipes) {
            const details = await fetchBriefDetails(recipe.idMeal);
            if (details && details.strArea === selectedArea) {
                filtered.push(recipe);
            }
        }
        filteredRecipes = filtered;
    }
    
    displayRecipes(filteredRecipes);
}

// ============================================
// FETCH BRIEF DETAILS (for area filtering)
// ============================================
async function fetchBriefDetails(id) {
    try {
        const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
        const data = await response.json();
        return data.meals ? data.meals[0] : null;
    } catch (error) {
        console.error('Error fetching details:', error);
        return null;
    }
}

// ============================================
// DISPLAY RECIPES USING map()
// ============================================
function displayRecipes(recipes) {
    if (!recipes || recipes.length === 0) {
        recipesGrid.innerHTML = '<div class="empty-state">No recipes found. Try another ingredient!</div>';
        resultsCount.classList.add('hidden');
        return;
    }
    
    // Using map() to create HTML for each recipe
    const recipesHTML = recipes.map(recipe => `
        <div class="recipe-card" data-id="${recipe.idMeal}">
            <img class="recipe-image" src="${recipe.strMealThumb}" alt="${recipe.strMeal}">
            <div class="recipe-info">
                <div class="recipe-title">${escapeHtml(recipe.strMeal)}</div>
                <div class="recipe-category">Click for details →</div>
            </div>
        </div>
    `).join('');
    
    recipesGrid.innerHTML = recipesHTML;
    recipeCountSpan.textContent = recipes.length;
    resultsCount.classList.remove('hidden');
    
    // Add click listeners to cards
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            fetchRecipeDetails(id);
        });
    });
}

// ============================================
// SHOW RECIPE DETAILS MODAL
// ============================================
function showRecipeModal(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push(`${measure} ${ingredient}`);
        }
    }
    
    modalBody.innerHTML = `
        <img class="modal-recipe-image" src="${meal.strMealThumb}" alt="${meal.strMeal}">
        <h2 class="modal-recipe-title">${escapeHtml(meal.strMeal)}</h2>
        <div class="modal-recipe-category">📍 ${meal.strArea || 'Unknown'} Cuisine | ${meal.strCategory || 'Various'}</div>
        
        <div class="modal-section">
            <h4>🛒 Ingredients</h4>
            <ul>
                ${ingredients.map(ing => `<li>${escapeHtml(ing)}</li>`).join('')}
            </ul>
        </div>
        
        <div class="modal-section">
            <h4>📖 Instructions</h4>
            <p>${escapeHtml(meal.strInstructions)}</p>
        </div>
        
        ${meal.strYoutube ? `
            <div class="modal-section">
                <h4>🎥 Video Tutorial</h4>
                <a href="${meal.strYoutube}" target="_blank" rel="noopener noreferrer">Watch on YouTube →</a>
            </div>
        ` : ''}
    `;
    
    modal.classList.remove('hidden');
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================
function showLoading() {
    loadingSpinner.classList.remove('hidden');
    recipesGrid.innerHTML = '';
    resultsCount.classList.add('hidden');
}

function hideLoading() {
    loadingSpinner.classList.add('hidden');
}

function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// ============================================
// EVENT LISTENERS
// ============================================
searchBtn.addEventListener('click', () => {
    searchRecipes(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchRecipes(searchInput.value);
    }
});

areaFilter.addEventListener('change', () => {
    if (currentRecipes.length > 0) {
        applyFilters();
    }
});

closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// ============================================
// INITIALIZATION (Load default)
// ============================================
searchRecipes('chicken');