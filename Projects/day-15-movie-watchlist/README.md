# Movie Watchlist - Day 15 Project

## Project Overview
An interactive movie watchlist manager demonstrating JavaScript array methods including push, pop, forEach, filter, and map.

## Skills Practiced
- Creating arrays of objects
- `push()` - add movie to watchlist
- `pop()` - remove last movie
- `forEach()` - loop through and display movies
- `filter()` - find movies with rating > 4
- `map()` - extract ratings for average calculation
- `length` property
- `reduce()` - sum ratings for average

## File Structure
day-15-movie-watchlist/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Array Methods Used

| Method | Purpose | Example |
|--------|---------|---------|
| `push()` | Add movie to array | `movies.push({ title, rating })` |
| `pop()` | Remove last movie | `movies.pop()` |
| `forEach()` | Loop through movies | `movies.forEach(movie => { })` |
| `filter()` | Find high-rated movies | `movies.filter(m => m.rating > 4)` |
| `map()` | Extract ratings | `movies.map(m => m.rating)` |
| `reduce()` | Sum ratings | `ratings.reduce((sum, r) => sum + r, 0)` |
| `length` | Get movie count | `movies.length` |

## Key JavaScript Code

```javascript
// Array of objects
let movies = [
    { title: "Inception", rating: 5 },
    { title: "The Matrix", rating: 5 }
];

// Add movie (push)
movies.push({ title: "Interstellar", rating: 4 });

// Remove last movie (pop)
const removed = movies.pop();

// Filter high-rated movies
const highRated = movies.filter(movie => movie.rating > 4);

// Calculate average rating (map + reduce)
const avgRating = movies.map(m => m.rating).reduce((sum, r) => sum + r, 0) / movies.length;

// Loop through movies (forEach)
movies.forEach(movie => {
    console.log(`${movie.title}: ${movie.rating} stars`);
});
Features
Add movies with title and rating

Remove last movie

Filter to show only 4+ star movies

Reset to show all movies

Display stars based on rating

Average rating calculation

Total movie count

Enter key support