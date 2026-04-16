# Enhanced Posts App - Day 25 Project

## Project Overview
An enhanced posts application demonstrating API data fetching, display, filtering, sorting, and pagination.

## Skills Practiced
- `fetch()` - Get data from API
- `map()` - Convert array to HTML elements
- `filter()` - Search/filter by title
- `sort()` - Sort by title or ID
- Pagination - Load more functionality
- Loading skeletons - Visual feedback
- Async/await with error handling

## File Structure
day-25-enhanced-posts-app/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Features

| Feature | Method Used |
|---------|-------------|
| Display posts | `map()` to generate HTML |
| Search by title | `filter()` |
| Sort (A-Z, Z-A, ID) | `sort()` |
| Load more | Pagination with slice |
| Loading skeleton | CSS animation |

## Key Code Patterns

```javascript
// map() to create HTML
const postsHTML = posts.map(post => `
    <div class="post-card">
        <h3>${post.title}</h3>
        <p>${post.body}</p>
    </div>
`).join('');

// filter() for search
const filtered = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm)
);

// sort() for ordering
posts.sort((a, b) => a.title.localeCompare(b.title));

// pagination with slice
const paginated = posts.slice(0, visibleCount);
Data Flow
Fetch all posts from API

Store in allPosts array

Apply filter (search term)

Apply sort

Paginate (slice first N items)

Render with map()