// ============================================
// MOVIE WATCHLIST
// Demonstrating: push(), pop(), forEach(), filter(), map()
// ============================================

// Array to store movie objects
let movies = [
    { title: "Inception", rating: 5 },
    { title: "The Matrix", rating: 5 },
    { title: "Interstellar", rating: 4 }
];

// DOM Elements
const movieTitleInput = document.getElementById('movie-title');
const movieRatingSelect = document.getElementById('movie-rating');
const addBtn = document.getElementById('add-btn');
const removeLastBtn = document.getElementById('remove-last-btn');
const filterHighRatedBtn = document.getElementById('filter-high-rated-btn');
const resetBtn = document.getElementById('reset-btn');
const movieListUl = document.getElementById('movie-list');
const totalCountSpan = document.getElementById('total-count');
const avgRatingSpan = document.getElementById('avg-rating');

// Store current display mode
let currentDisplayMode = 'all'; // 'all' or 'filtered'
let filteredMovies = [];

// ============================================
// FUNCTION: Calculate average rating using map() and reduce()
// ============================================
function calculateAverageRating(movieArray) {
    if (movieArray.length === 0) return 0;
    
    // Using map() to extract ratings, then reduce to sum
    const totalRating = movieArray.map(movie => movie.rating).reduce((sum, rating) => sum + rating, 0);
    return (totalRating / movieArray.length).toFixed(1);
}

// ============================================
// FUNCTION: Display movies using forEach()
// ============================================
function displayMovies(moviesToShow) {
    // Clear the list
    movieListUl.innerHTML = '';
    
    // Check if array is empty
    if (moviesToShow.length === 0) {
        const emptyLi = document.createElement('li');
        emptyLi.className = 'empty-message';
        emptyLi.textContent = 'No movies to display.';
        movieListUl.appendChild(emptyLi);
        return;
    }
    
    // Loop through array using forEach()
    moviesToShow.forEach((movie, index) => {
        const li = document.createElement('li');
        li.className = 'movie-item';
        
        const titleSpan = document.createElement('span');
        titleSpan.className = 'movie-title';
        titleSpan.textContent = movie.title;
        
        const ratingSpan = document.createElement('span');
        ratingSpan.className = 'movie-rating';
        
        // Display stars based on rating
        const stars = '⭐'.repeat(movie.rating);
        ratingSpan.innerHTML = `${stars} <span>(${movie.rating}/5)</span>`;
        
        li.appendChild(titleSpan);
        li.appendChild(ratingSpan);
        movieListUl.appendChild(li);
    });
}

// ============================================
// FUNCTION: Update stats (total count, average rating)
// ============================================
function updateStats() {
    // Update total count using .length property
    totalCountSpan.textContent = movies.length;
    
    // Update average rating using map() and reduce()
    const avgRating = calculateAverageRating(movies);
    avgRatingSpan.textContent = avgRating;
}

// ============================================
// FUNCTION: Refresh the current view
// ============================================
function refreshDisplay() {
    if (currentDisplayMode === 'all') {
        displayMovies(movies);
    } else {
        displayMovies(filteredMovies);
    }
    updateStats();
}

// ============================================
// FUNCTION: Add movie using push()
// ============================================
function addMovie() {
    const title = movieTitleInput.value.trim();
    const rating = parseInt(movieRatingSelect.value);
    
    if (title === '') {
        alert('Please enter a movie title!');
        return;
    }
    
    // Add to end of array using push()
    movies.push({ title: title, rating: rating });
    
    // Clear input
    movieTitleInput.value = '';
    
    // Reset to all view
    currentDisplayMode = 'all';
    
    // Refresh display
    refreshDisplay();
    
    // Focus back on input
    movieTitleInput.focus();
}

// ============================================
// FUNCTION: Remove last movie using pop()
// ============================================
function removeLastMovie() {
    if (movies.length === 0) {
        alert('No movies to remove!');
        return;
    }
    
    // Remove last item using pop()
    const removedMovie = movies.pop();
    console.log(`Removed: ${removedMovie.title}`);
    
    // Reset to all view
    currentDisplayMode = 'all';
    
    // Refresh display
    refreshDisplay();
}

// ============================================
// FUNCTION: Filter movies with rating > 4 using filter()
// ============================================
function showHighRatedMovies() {
    // Use filter() to find movies with rating > 4
    filteredMovies = movies.filter(movie => movie.rating > 4);
    
    if (filteredMovies.length === 0) {
        alert('No movies with rating 4+ stars!');
        return;
    }
    
    currentDisplayMode = 'filtered';
    displayMovies(filteredMovies);
    // Note: stats still show all movies (user knows filter is active)
}

// ============================================
// FUNCTION: Reset to show all movies
// ============================================
function resetToAllMovies() {
    currentDisplayMode = 'all';
    refreshDisplay();
}

// ============================================
// FUNCTION: Enter key support
// ============================================
movieTitleInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addMovie();
    }
});

// ============================================
// EVENT LISTENERS
// ============================================
addBtn.addEventListener('click', addMovie);
removeLastBtn.addEventListener('click', removeLastMovie);
filterHighRatedBtn.addEventListener('click', showHighRatedMovies);
resetBtn.addEventListener('click', resetToAllMovies);

// ============================================
// INITIALIZATION
// ============================================
refreshDisplay();