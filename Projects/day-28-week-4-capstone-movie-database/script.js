// ============================================
// MOVIE DATABASE APP
// Week 4 Capstone Project
// API: The Movie Database (TMDB)
// ============================================

const API_KEY = '16f8bce6e4626ae45171c418ac873b5f'; // Replace with your TMDB API key
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';

// DOM Elements
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const moviesGrid = document.getElementById('movies-grid');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error-message');
const categoryBtns = document.querySelectorAll('.category-btn');
const paginationDiv = document.getElementById('pagination');
const prevPageBtn = document.getElementById('prev-page');
const nextPageBtn = document.getElementById('next-page');
const pageInfoSpan = document.getElementById('page-info');
const modal = document.getElementById('movie-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

// State
let currentCategory = 'popular';
let currentPage = 1;
let totalPages = 1;
let currentSearchQuery = '';
let watchlist = [];

// ============================================
// WATCHLIST FUNCTIONS
// ============================================
function loadWatchlist() {
    const saved = localStorage.getItem('movieWatchlist');
    if (saved) {
        watchlist = JSON.parse(saved);
    }
}

function saveWatchlist() {
    localStorage.setItem('movieWatchlist', JSON.stringify(watchlist));
}

function isInWatchlist(movieId) {
    return watchlist.some(m => m.id === movieId);
}

function addToWatchlist(movie) {
    if (!isInWatchlist(movie.id)) {
        watchlist.push({
            id: movie.id,
            title: movie.title,
            poster_path: movie.poster_path,
            release_date: movie.release_date,
            vote_average: movie.vote_average
        });
        saveWatchlist();
        
        // Refresh if on watchlist page
        if (currentCategory === 'watchlist') {
            loadWatchlistMovies();
        }
    }
}

function removeFromWatchlist(movieId) {
    watchlist = watchlist.filter(m => m.id !== movieId);
    saveWatchlist();
    
    if (currentCategory === 'watchlist') {
        loadWatchlistMovies();
    }
}

function toggleWatchlist(movie) {
    if (isInWatchlist(movie.id)) {
        removeFromWatchlist(movie.id);
    } else {
        addToWatchlist(movie);
    }
}

// ============================================
// UI FUNCTIONS
// ============================================
function showLoading() {
    loadingDiv.classList.remove('hidden');
    moviesGrid.innerHTML = '';
    errorDiv.classList.add('hidden');
}

function hideLoading() {
    loadingDiv.classList.add('hidden');
}

function showError(message) {
    errorDiv.classList.remove('hidden');
    errorDiv.textContent = message;
    moviesGrid.innerHTML = '';
    paginationDiv.classList.add('hidden');
}

function showMovies(movies, totalPagesCount) {
    if (!movies || movies.length === 0) {
        moviesGrid.innerHTML = '<div class="empty-state">No movies found.</div>';
        paginationDiv.classList.add('hidden');
        return;
    }
    
    totalPages = totalPagesCount;
    
    moviesGrid.innerHTML = movies.map(movie => `
        <div class="movie-card" data-id="${movie.id}">
            <img class="movie-poster" src="${movie.poster_path ? IMAGE_BASE + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Poster'}" alt="${movie.title}">
            <div class="movie-info">
                <div class="movie-title">${escapeHtml(movie.title)}</div>
                <div class="movie-year">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</div>
                <div class="movie-rating">⭐ ${movie.vote_average?.toFixed(1) || 'N/A'}</div>
            </div>
        </div>
    `).join('');
    
    // Add click listeners
    document.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const id = card.dataset.id;
            fetchMovieDetails(id);
        });
    });
    
    // Update pagination
    if (totalPages > 1) {
        paginationDiv.classList.remove('hidden');
        pageInfoSpan.textContent = `Page ${currentPage} of ${totalPages}`;
        prevPageBtn.disabled = currentPage === 1;
        nextPageBtn.disabled = currentPage === totalPages;
    } else {
        paginationDiv.classList.add('hidden');
    }
}

function showMovieModal(movie, credits) {
    const isInWL = isInWatchlist(movie.id);
    
    modalBody.innerHTML = `
        <div class="modal-movie">
            <img class="modal-poster" src="${movie.poster_path ? IMAGE_BASE + movie.poster_path : 'https://via.placeholder.com/300x450?text=No+Poster'}" alt="${movie.title}">
            <div class="modal-details">
                <h2 class="modal-title">${escapeHtml(movie.title)}</h2>
                <div class="modal-meta">
                    ${movie.release_date?.split('-')[0] || 'N/A'} | ${movie.runtime || '?'} min | ⭐ ${movie.vote_average?.toFixed(1) || 'N/A'}
                </div>
                <div class="modal-overview">${escapeHtml(movie.overview) || 'No overview available.'}</div>
                <div class="modal-cast">
                    <strong>Cast:</strong> ${credits?.cast?.slice(0, 5).map(c => c.name).join(', ') || 'N/A'}
                </div>
                <button class="watchlist-btn ${isInWL ? 'in-watchlist' : ''}" data-id="${movie.id}">
                    ${isInWL ? '✓ In Watchlist' : '➕ Add to Watchlist'}
                </button>
            </div>
        </div>
    `;
    
    const watchlistBtn = modalBody.querySelector('.watchlist-btn');
    watchlistBtn.addEventListener('click', () => {
        toggleWatchlist(movie);
        showMovieModal(movie, credits);
    });
    
    modal.classList.remove('hidden');
}

// ============================================
// API CALLS
// ============================================
async function fetchMovies(endpoint, page = 1) {
    showLoading();
    
    try {
        const url = `${BASE_URL}${endpoint}?api_key=${API_KEY}&page=${page}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        showMovies(data.results, data.total_pages);
        
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to load movies. Please try again.');
    } finally {
        hideLoading();
    }
}

async function searchMovies(query, page = 1) {
    showLoading();
    
    try {
        const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&page=${page}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const data = await response.json();
        showMovies(data.results, data.total_pages);
        
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to search movies. Please try again.');
    } finally {
        hideLoading();
    }
}

async function fetchMovieDetails(id) {
    showLoading();
    
    try {
        const [movieRes, creditsRes] = await Promise.all([
            fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`),
            fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`)
        ]);
        
        const movie = await movieRes.json();
        const credits = await creditsRes.json();
        
        showMovieModal(movie, credits);
        
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to load movie details.');
    } finally {
        hideLoading();
    }
}

function loadWatchlistMovies() {
    if (watchlist.length === 0) {
        moviesGrid.innerHTML = '<div class="empty-state">Your watchlist is empty. Add some movies!</div>';
        paginationDiv.classList.add('hidden');
    } else {
        moviesGrid.innerHTML = watchlist.map(movie => `
            <div class="movie-card" data-id="${movie.id}">
                <img class="movie-poster" src="${movie.poster_path ? IMAGE_BASE + movie.poster_path : 'https://via.placeholder.com/500x750?text=No+Poster'}" alt="${movie.title}">
                <div class="movie-info">
                    <div class="movie-title">${escapeHtml(movie.title)}</div>
                    <div class="movie-year">${movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}</div>
                    <div class="movie-rating">⭐ ${movie.vote_average?.toFixed(1) || 'N/A'}</div>
                </div>
            </div>
        `).join('');
        
        document.querySelectorAll('.movie-card').forEach(card => {
            card.addEventListener('click', () => {
                fetchMovieDetails(card.dataset.id);
            });
        });
        
        paginationDiv.classList.add('hidden');
    }
}

// ============================================
// CATEGORY HANDLING
// ============================================
function setCategory(category) {
    currentCategory = category;
    currentPage = 1;
    currentSearchQuery = '';
    searchInput.value = '';
    
    // Update active button
    categoryBtns.forEach(btn => {
        if (btn.dataset.category === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Load appropriate content
    if (category === 'watchlist') {
        loadWatchlistMovies();
    } else {
        let endpoint = '';
        switch(category) {
            case 'popular':
                endpoint = '/movie/popular';
                break;
            case 'top_rated':
                endpoint = '/movie/top_rated';
                break;
            case 'upcoming':
                endpoint = '/movie/upcoming';
                break;
        }
        fetchMovies(endpoint, currentPage);
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
        currentCategory = 'search';
        currentPage = 1;
        categoryBtns.forEach(btn => btn.classList.remove('active'));
        searchMovies(query, currentPage);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        setCategory(btn.dataset.category);
    });
});

prevPageBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        if (currentSearchQuery) {
            searchMovies(currentSearchQuery, currentPage);
        } else {
            let endpoint = '';
            switch(currentCategory) {
                case 'popular': endpoint = '/movie/popular'; break;
                case 'top_rated': endpoint = '/movie/top_rated'; break;
                case 'upcoming': endpoint = '/movie/upcoming'; break;
            }
            fetchMovies(endpoint, currentPage);
        }
    }
});

nextPageBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        if (currentSearchQuery) {
            searchMovies(currentSearchQuery, currentPage);
        } else {
            let endpoint = '';
            switch(currentCategory) {
                case 'popular': endpoint = '/movie/popular'; break;
                case 'top_rated': endpoint = '/movie/top_rated'; break;
                case 'upcoming': endpoint = '/movie/upcoming'; break;
            }
            fetchMovies(endpoint, currentPage);
        }
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
// INITIALIZATION
// ============================================
loadWatchlist();
setCategory('popular');