// ============================================
// ENHANCED POSTS APP
// Demonstrating: API data display, map(), filter(), sort(), pagination
// ============================================

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// DOM Elements
const postsContainer = document.getElementById('posts-container');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const loadMoreBtn = document.getElementById('load-more-btn');
const showingCountSpan = document.getElementById('showing-count');
const totalCountSpan = document.getElementById('total-count');

// State
let allPosts = [];
let displayedPosts = [];
let visibleCount = 10;
let currentSearchTerm = '';
let currentSort = 'title-asc';

// ============================================
// FETCH POSTS
// ============================================
async function fetchPosts() {
    showSkeleton();
    
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        allPosts = await response.json();
        totalCountSpan.textContent = allPosts.length;
        
        applyFiltersAndSort();
    } catch (error) {
        console.error('Error fetching posts:', error);
        postsContainer.innerHTML = '<div class="empty-state">❌ Failed to load posts. Please try again.</div>';
    }
}

// ============================================
// SHOW SKELETON LOADER
// ============================================
function showSkeleton() {
    postsContainer.innerHTML = `
        <div class="skeleton-loader">
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
            <div class="skeleton-card"></div>
        </div>
    `;
}

// ============================================
// APPLY FILTERS AND SORT
// ============================================
function applyFiltersAndSort() {
    let filtered = [...allPosts];
    
    // Apply search filter
    if (currentSearchTerm) {
        const term = currentSearchTerm.toLowerCase();
        filtered = filtered.filter(post => 
            post.title.toLowerCase().includes(term)
        );
    }
    
    // Apply sort
    filtered.sort((a, b) => {
        switch(currentSort) {
            case 'title-asc':
                return a.title.localeCompare(b.title);
            case 'title-desc':
                return b.title.localeCompare(a.title);
            case 'id-asc':
                return a.id - b.id;
            case 'id-desc':
                return b.id - a.id;
            default:
                return 0;
        }
    });
    
    displayedPosts = filtered;
    visibleCount = 10;
    renderPosts();
}

// ============================================
// RENDER POSTS USING map()
// ============================================
function renderPosts() {
    const postsToShow = displayedPosts.slice(0, visibleCount);
    
    if (postsToShow.length === 0) {
        postsContainer.innerHTML = '<div class="empty-state">No posts match your search.</div>';
        showingCountSpan.textContent = '0';
        loadMoreBtn.disabled = true;
        return;
    }
    
    // Using map() to create HTML for each post
    const postsHTML = postsToShow.map(post => `
        <div class="post-card">
            <div class="post-title">${escapeHtml(post.title)}</div>
            <div class="post-body">${escapeHtml(post.body)}</div>
            <div class="post-id">Post ID: ${post.id}</div>
        </div>
    `).join('');
    
    postsContainer.innerHTML = postsHTML;
    showingCountSpan.textContent = postsToShow.length;
    
    // Disable load more button if all posts are shown
    loadMoreBtn.disabled = visibleCount >= displayedPosts.length;
}

// ============================================
// LOAD MORE POSTS
// ============================================
function loadMorePosts() {
    visibleCount += 10;
    renderPosts();
}

// ============================================
// HELPER: Escape HTML
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
searchInput.addEventListener('input', (e) => {
    currentSearchTerm = e.target.value;
    applyFiltersAndSort();
});

sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    applyFiltersAndSort();
});

loadMoreBtn.addEventListener('click', loadMorePosts);

// ============================================
// INITIALIZATION
// ============================================
fetchPosts();