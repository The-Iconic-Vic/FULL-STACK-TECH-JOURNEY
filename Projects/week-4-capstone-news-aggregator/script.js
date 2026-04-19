// ============================================
// NEWS AGGREGATOR APP
// Week 4 Capstone Project
// API: GNews API (free, no API key required)
// ============================================

const API_BASE = 'https://gnews.io/api/v4';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const newsGrid = document.getElementById('news-grid');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error-message');
const filterBtns = document.querySelectorAll('.filter-btn');
const countrySelect = document.getElementById('country-select');
const savedToggle = document.getElementById('saved-toggle');
const savedArticlesDiv = document.getElementById('saved-articles');
const savedCountSpan = document.getElementById('saved-count');

// State
let currentCategory = 'general';
let currentSearchQuery = '';
let currentCountry = 'us';
let savedArticles = [];

// ============================================
// SAVED ARTICLES FUNCTIONS
// ============================================
function loadSavedArticles() {
    const saved = localStorage.getItem('savedNews');
    if (saved) {
        savedArticles = JSON.parse(saved);
        updateSavedUI();
    }
}

function saveArticle(article) {
    if (!savedArticles.some(a => a.url === article.url)) {
        savedArticles.push({
            title: article.title,
            url: article.url,
            image: article.image,
            source: article.source,
            publishedAt: article.publishedAt
        });
        localStorage.setItem('savedNews', JSON.stringify(savedArticles));
        updateSavedUI();
    }
}

function removeSavedArticle(url) {
    savedArticles = savedArticles.filter(a => a.url !== url);
    localStorage.setItem('savedNews', JSON.stringify(savedArticles));
    updateSavedUI();
    
    // Refresh current view if showing saved
    if (savedArticlesDiv.classList.contains('hidden')) {
        fetchNews();
    }
}

function updateSavedUI() {
    savedCountSpan.textContent = savedArticles.length;
    
    if (savedArticles.length === 0) {
        savedArticlesDiv.innerHTML = '<div class="empty-state">No saved articles</div>';
    } else {
        savedArticlesDiv.innerHTML = savedArticles.map(article => `
            <div class="saved-article">
                <span class="saved-article-title" data-url="${article.url}">${escapeHtml(article.title)}</span>
                <button class="remove-saved" data-url="${article.url}">Remove</button>
            </div>
        `).join('');
        
        // Add click listeners
        document.querySelectorAll('.saved-article-title').forEach(title => {
            title.addEventListener('click', () => {
                window.open(title.dataset.url, '_blank');
            });
        });
        
        document.querySelectorAll('.remove-saved').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeSavedArticle(btn.dataset.url);
            });
        });
    }
}

// ============================================
// UI FUNCTIONS
// ============================================
function showLoading() {
    loadingDiv.classList.remove('hidden');
    newsGrid.innerHTML = '';
    errorDiv.classList.add('hidden');
}

function hideLoading() {
    loadingDiv.classList.add('hidden');
}

function showError(message) {
    errorDiv.classList.remove('hidden');
    errorDiv.textContent = message;
    newsGrid.innerHTML = '';
}

function showNews(articles) {
    if (!articles || articles.length === 0) {
        newsGrid.innerHTML = '<div class="empty-state">No news articles found.</div>';
        return;
    }
    
    newsGrid.innerHTML = articles.map(article => {
        const isSaved = savedArticles.some(a => a.url === article.url);
        return `
            <div class="news-card">
                <img class="news-image" src="${article.image || 'https://via.placeholder.com/400x200?text=No+Image'}" alt="${article.title}">
                <div class="news-content">
                    <h3 class="news-title">${escapeHtml(article.title)}</h3>
                    <p class="news-description">${escapeHtml(article.description || 'No description available.')}</p>
                    <div class="news-meta">
                        <span>${escapeHtml(article.source?.name || 'Unknown')}</span>
                        <span>${new Date(article.publishedAt).toLocaleDateString()}</span>
                    </div>
                    <div class="news-meta" style="margin-top: 0.5rem;">
                        <a href="${article.url}" target="_blank" class="read-link">Read full article →</a>
                        <button class="save-article ${isSaved ? 'saved' : ''}" data-url="${article.url}" data-title="${article.title}" data-image="${article.image}" data-source="${article.source?.name}" data-date="${article.publishedAt}">
                            ${isSaved ? '✓ Saved' : '📌 Save'}
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Add save button listeners
    document.querySelectorAll('.save-article').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const article = {
                title: btn.dataset.title,
                url: btn.dataset.url,
                image: btn.dataset.image,
                source: btn.dataset.source,
                publishedAt: btn.dataset.date
            };
            saveArticle(article);
            btn.textContent = '✓ Saved';
            btn.classList.add('saved');
        });
    });
}

// ============================================
// API CALL
// ============================================
async function fetchNews() {
    showLoading();
    
    try {
        let url = '';
        
        if (currentSearchQuery) {
            url = `${API_BASE}/search?q=${encodeURIComponent(currentSearchQuery)}&lang=en&country=${currentCountry}&max=20`;
        } else {
            url = `${API_BASE}/top-headlines?category=${currentCategory}&lang=en&country=${currentCountry}&max=20`;
        }
        
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        showNews(data.articles);
        
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to load news. Please try again.');
    } finally {
        hideLoading();
    }
}

// ============================================
// HELPER FUNCTIONS
// ============================================
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
    const query = searchInput.value.trim();
    if (query) {
        currentSearchQuery = query;
        currentCategory = '';
        filterBtns.forEach(btn => btn.classList.remove('active'));
        fetchNews();
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.category;
        currentSearchQuery = '';
        searchInput.value = '';
        fetchNews();
    });
});

countrySelect.addEventListener('change', () => {
    currentCountry = countrySelect.value;
    fetchNews();
});

savedToggle.addEventListener('click', () => {
    savedArticlesDiv.classList.toggle('hidden');
    updateSavedUI();
});

// ============================================
// INITIALIZATION
// ============================================
loadSavedArticles();
fetchNews();