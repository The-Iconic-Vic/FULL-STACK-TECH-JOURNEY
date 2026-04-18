// ============================================
// ENHANCED RECIPE FINDER
// Demonstrating: Error handling, cache, offline support, retry
// ============================================

const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const areaFilter = document.getElementById('area-filter');
const statusMessage = document.getElementById('status-message');
const resultsCount = document.getElementById('results-count');
const recipeCountSpan = document.getElementById('recipe-count');
const recipesGrid = document.getElementById('recipes-grid');
const retryContainer = document.getElementById('retry-container');
const retryBtn = document.getElementById('retry-btn');
const modal = document.getElementById('recipe-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

// State
let currentSearchTerm = '';
let currentRecipes = [];

// ============================================
// CACHE MANAGEMENT
// ============================================
function getCacheKey(ingredient, area) {
    return `recipe_cache_${ingredient}_${area}`;
}

function saveToCache(ingredient, area, data) {
    const cacheKey = getCacheKey(ingredient, area);
    const cacheData = {
        timestamp: Date.now(),
        data: data,
        ingredient: ingredient,
        area: area
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
}

function loadFromCache(ingredient, area) {
    const cacheKey = getCacheKey(ingredient, area);
    const cached = localStorage.getItem(cacheKey);
    
    if (cached) {
        const cacheData = JSON.parse(cached);
        // Cache valid for 1 hour
        if (Date.now() - cacheData.timestamp < 60 * 60 * 1000) {
            return cacheData.data;
        }
        // Remove expired cache
        localStorage.removeItem(cacheKey);
    }
    return null;
}

// ============================================
// ERROR CLASSIFICATION
// ============================================
function classifyError(error) {
    const message = error.message.toLowerCase();
    
    if (!navigator.onLine) {
        return { type: 'offline', userMessage: '📡 No internet connection. Showing cached results (if available).' };
    }
    
    if (message.includes('fetch') || message.includes('network')) {
        return { type: 'network', userMessage: '📡 Network error. Please check your connection.' };
    }
    
    if (message.includes('429') || message.includes('rate')) {
        return { type: 'ratelimit', userMessage: '⏰ API rate limit reached. Please wait a moment and try again.' };
    }
    
    if (message.includes('404')) {
        return { type: 'notfound', userMessage: '🔍 No recipes found for that ingredient.' };
    }
    
    if (message.includes('500')) {
        return { type: 'server', userMessage: '⚠️ Server error. Please try again later.' };
    }
    
    return { type: 'unknown', userMessage: `❌ An error occurred: ${error.message}` };
}

// ============================================
// API CALL WITH ERROR HANDLING
// ============================================
async function searchRecipes(ingredient) {
    if (!ingredient.trim()) {
        showStatus('Please enter an ingredient', 'warning');
        return null;
    }
    
    const selectedArea = areaFilter.value;
    
    // Check cache first
    const cached = loadFromCache(ingredient, selectedArea);
    if (cached) {
        showStatus('📦 Loaded from cache', 'success');
        return cached;
    }
    
    showStatus('🔍 Searching for recipes...', 'loading');
    
    try {
        const response = await fetch(`${API_BASE}/filter.php?i=${ingredient}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        let recipes = data.meals || [];
        
        // Filter by area if needed
        if (selectedArea !== 'all' && recipes.length > 0) {
            recipes = await filterByArea(recipes, selectedArea);
        }
        
        // Save to cache
        saveToCache(ingredient, selectedArea, recipes);
        
        showStatus(`✅ Found ${recipes.length} recipes`, 'success');
        return recipes;
        
    } catch (error) {
        const { type, userMessage } = classifyError(error);
        showStatus(userMessage, 'error');
        
        // Try to get cached results even if expired
        const expiredCache = getExpiredCache(ingredient, selectedArea);
        if (expiredCache) {
            showStatus('📦 Showing cached results (offline mode)', 'warning');
            return expiredCache;
        }
        
        return null;
    }
}

// Helper to get expired cache
function getExpiredCache(ingredient, area) {
    const cacheKey = getCacheKey(ingredient, area);
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
        const cacheData = JSON.parse(cached);
        return cacheData.data;
    }
    return null;
}

// ============================================
// FILTER BY AREA (requires additional API calls)
// ============================================
async function filterByArea(recipes, area) {
    const filtered = [];
    for (const recipe of recipes) {
        try {
            const response = await fetch(`${API_BASE}/lookup.php?i=${recipe.idMeal}`);
            const data = await response.json();
            const meal = data.meals?.[0];
            if (meal && meal.strArea === area) {
                filtered.push(recipe);
            }
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    }
    return filtered;
}

// ============================================
// FETCH RECIPE DETAILS
// ============================================
async function fetchRecipeDetails(id) {
    showStatus('Loading recipe details...', 'loading');
    
    try {
        const response = await fetch(`${API_BASE}/lookup.php?i=${id}`);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        const meal = data.meals?.[0];
        
        if (meal) {
            showRecipeModal(meal);
            showStatus('', '');
        } else {
            throw new Error('Recipe not found');
        }
        
    } catch (error) {
        const { userMessage } = classifyError(error);
        showStatus(userMessage, 'error');
        setTimeout(() => showStatus('', ''), 3000);
    }
}

// ============================================
// UI FUNCTIONS
// ============================================
function showStatus(message, type) {
    if (!message) {
        statusMessage.classList.add('hidden');
        return;
    }
    
    statusMessage.classList.remove('hidden');
    statusMessage.className = `status-message ${type}`;
    statusMessage.textContent = message;
}

function showLoading() {
    searchBtn.disabled = true;
    recipesGrid.innerHTML = '<div class="empty-state">⏳ Loading recipes...</div>';
    resultsCount.classList.add('hidden');
    retryContainer.classList.add('hidden');
}

function hideLoading() {
    searchBtn.disabled = false;
}

function displayRecipes(recipes) {
    currentRecipes = recipes;
    
    if (!recipes || recipes.length === 0) {
        recipesGrid.innerHTML = '<div class="empty-state">🍽️ No recipes found. Try another ingredient!</div>';
        resultsCount.classList.add('hidden');
        retryContainer.classList.remove('hidden');
        return;
    }
    
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
    retryContainer.classList.add('hidden');
    
    // Add click listeners
    document.querySelectorAll('.recipe-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            fetchRecipeDetails(id);
        });
    });
}

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
        <div class="modal-recipe-category">📍 ${meal.strArea || 'Unknown'} Cuisine</div>
        
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
// MAIN SEARCH FUNCTION
// ============================================
async function performSearch() {
    const ingredient = searchInput.value.trim();
    currentSearchTerm = ingredient;
    
    if (!ingredient) {
        showStatus('Please enter an ingredient', 'warning');
        return;
    }
    
    showLoading();
    
    const recipes = await searchRecipes(ingredient);
    displayRecipes(recipes || []);
    
    hideLoading();
}

// ============================================
// RETRY FUNCTION
// ============================================
async function retrySearch() {
    if (currentSearchTerm) {
        showLoading();
        const recipes = await searchRecipes(currentSearchTerm);
        displayRecipes(recipes || []);
        hideLoading();
    }
}

// ============================================
// EVENT LISTENERS
// ============================================
searchBtn.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') performSearch();
});
areaFilter.addEventListener('change', () => {
    if (currentSearchTerm) {
        performSearch();
    }
});
retryBtn.addEventListener('click', retrySearch);
closeModal.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
});

// ============================================
// INITIALIZATION
// ============================================
performSearch();