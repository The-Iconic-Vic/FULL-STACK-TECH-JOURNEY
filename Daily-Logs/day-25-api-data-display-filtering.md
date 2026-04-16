**File:** `daily-logs/day-25-api-data-display-filtering.md`

```markdown
# 📅 Day 25: Working with API Data - Display & Filtering

**Date:** April 16, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 1 - MERN Foundation  
**Topics:** Displaying API Data, Filtering, Searching, Sorting, Pagination

---

## 📋 Learning Objectives

- ✅ Fetch arrays of items from an API
- ✅ Use `map()` to convert API data into HTML
- ✅ Render dynamic lists and grids
- ✅ Add loading skeletons/spinners for better UX
- ✅ Implement search/filtering on fetched data
- ✅ Sort results by different criteria
- ✅ Implement pagination (Load More and page navigation)

---

## 📊 Part 1: Displaying API Data

### Fetching and Displaying Data Pattern

```javascript
async function fetchAndDisplay() {
    try {
        // 1. Show loading state
        showLoading();
        
        // 2. Fetch data from API
        const response = await fetch('https://api.example.com/items');
        const items = await response.json();
        
        // 3. Transform data to HTML using map()
        const html = items.map(item => `
            <div class="card">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
            </div>
        `).join('');
        
        // 4. Insert into DOM
        container.innerHTML = html;
        
    } catch (error) {
        showError(error);
    } finally {
        hideLoading();
    }
}
```

---

### Using `map()` to Create HTML

`map()` is perfect for transforming an array of data into an array of HTML strings.

```javascript
// Without map (manual loop - verbose)
let html = '';
for (let i = 0; i < posts.length; i++) {
    html += `<div class="post">${posts[i].title}</div>`;
}

// With map (clean and functional)
const html = posts.map(post => `
    <div class="post-card">
        <h3 class="post-title">${escapeHtml(post.title)}</h3>
        <p class="post-body">${escapeHtml(post.body)}</p>
    </div>
`).join('');
```

**Why `map()` is great for this:**
- Creates a new array without mutating original
- Clean functional syntax
- Easy to chain with filters
- Perfect for React-like patterns

---

### Loading States

#### Loading Spinner
```css
.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

#### Loading Skeleton
```css
.skeleton-card {
    background: #f0f0f0;
    border-radius: 8px;
    padding: 20px;
    animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-card::before {
    content: '';
    display: block;
    height: 20px;
    background: #e0e0e0;
    margin-bottom: 10px;
    border-radius: 4px;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
```

```javascript
function showSkeleton() {
    container.innerHTML = `
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
        <div class="skeleton-card"></div>
    `;
}
```

---

## 🔍 Part 2: Filtering & Searching

### Search Filter

```javascript
let allItems = [];
let searchTerm = '';

function filterItems() {
    const filtered = allItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    renderItems(filtered);
}

searchInput.addEventListener('input', (e) => {
    searchTerm = e.target.value;
    filterItems();
});
```

### Category Filter

```javascript
let currentCategory = 'all';

function filterByCategory() {
    let filtered = [...allItems];
    
    if (currentCategory !== 'all') {
        filtered = filtered.filter(item => item.category === currentCategory);
    }
    
    // Apply search filter as well
    if (searchTerm) {
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    renderItems(filtered);
}

categorySelect.addEventListener('change', (e) => {
    currentCategory = e.target.value;
    filterByCategory();
});
```

### Multiple Filters Combined

```javascript
function applyFilters() {
    let filtered = [...allItems];
    
    // Apply search
    if (searchTerm) {
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Apply category
    if (currentCategory !== 'all') {
        filtered = filtered.filter(item => item.category === currentCategory);
    }
    
    // Apply price range
    if (minPrice) {
        filtered = filtered.filter(item => item.price >= minPrice);
    }
    if (maxPrice) {
        filtered = filtered.filter(item => item.price <= maxPrice);
    }
    
    renderItems(filtered);
}
```

---

### Sorting

```javascript
let currentSort = 'title-asc';

function sortItems(items) {
    const sorted = [...items];
    
    switch(currentSort) {
        case 'title-asc':
            sorted.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'title-desc':
            sorted.sort((a, b) => b.title.localeCompare(a.title));
            break;
        case 'date-asc':
            sorted.sort((a, b) => new Date(a.date) - new Date(b.date));
            break;
        case 'date-desc':
            sorted.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
        case 'price-asc':
            sorted.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            sorted.sort((a, b) => b.price - a.price);
            break;
    }
    
    return sorted;
}

function applyFiltersAndSort() {
    let filtered = [...allItems];
    
    // Apply filters
    if (searchTerm) {
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    // Apply sort
    filtered = sortItems(filtered);
    
    renderItems(filtered);
}

sortSelect.addEventListener('change', (e) => {
    currentSort = e.target.value;
    applyFiltersAndSort();
});
```

---

## 📄 Part 3: Pagination

### Load More (Incremental) Pagination

```javascript
let allItems = [];
let visibleCount = 10;

function renderItems() {
    const itemsToShow = allItems.slice(0, visibleCount);
    
    const html = itemsToShow.map(item => `
        <div class="card">${item.title}</div>
    `).join('');
    
    container.innerHTML = html;
    
    // Disable button if all items shown
    loadMoreBtn.disabled = visibleCount >= allItems.length;
    showingCountSpan.textContent = itemsToShow.length;
    totalCountSpan.textContent = allItems.length;
}

function loadMore() {
    visibleCount += 10;
    renderItems();
}

loadMoreBtn.addEventListener('click', loadMore);
```

### Page Navigation (Previous/Next)

```javascript
let currentPage = 1;
const itemsPerPage = 10;

function renderPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = allItems.slice(start, end);
    
    const html = pageItems.map(item => `
        <div class="card">${item.title}</div>
    `).join('');
    
    container.innerHTML = html;
    
    // Update buttons
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = end >= allItems.length;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
}

function nextPage() {
    currentPage++;
    renderPage();
}

function prevPage() {
    currentPage--;
    renderPage();
}
```

### Combined: Load More with Filtering

```javascript
let allPosts = [];
let displayedPosts = [];
let visibleCount = 10;
let currentSearchTerm = '';
let currentSort = 'title-asc';

function applyFiltersAndSort() {
    let filtered = [...allPosts];
    
    // Search filter
    if (currentSearchTerm) {
        filtered = filtered.filter(post => 
            post.title.toLowerCase().includes(currentSearchTerm.toLowerCase())
        );
    }
    
    // Sort
    filtered.sort((a, b) => {
        if (currentSort === 'title-asc') return a.title.localeCompare(b.title);
        if (currentSort === 'title-desc') return b.title.localeCompare(a.title);
        return 0;
    });
    
    displayedPosts = filtered;
    visibleCount = 10;
    renderPosts();
}

function renderPosts() {
    const postsToShow = displayedPosts.slice(0, visibleCount);
    
    const html = postsToShow.map(post => `
        <div class="post-card">
            <h3>${escapeHtml(post.title)}</h3>
            <p>${escapeHtml(post.body)}</p>
        </div>
    `).join('');
    
    container.innerHTML = html;
    loadMoreBtn.disabled = visibleCount >= displayedPosts.length;
}
```

---

## 📝 Quick Reference

### Display Pattern
```javascript
// Fetch → map() → render
const html = data.map(item => `<div>${item.name}</div>`).join('');
container.innerHTML = html;
```

### Filter Pattern
```javascript
const filtered = data.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
);
```

### Sort Pattern
```javascript
const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
```

### Pagination Pattern
```javascript
const paginated = allItems.slice(0, visibleCount);
const pageItems = allItems.slice((page-1)*limit, page*limit);
```

### Combined Pattern
```javascript
let processed = [...allData];
processed = applyFilters(processed);
processed = applySort(processed);
const paginated = applyPagination(processed);
render(paginated);
```

---

## ✅ Day 25 Checklist

- [ ] Fetch array data from API
- [ ] Use `map()` to generate HTML for each item
- [ ] Implement loading skeletons or spinners
- [ ] Add search/filter functionality
- [ ] Add sorting functionality
- [ ] Implement pagination (Load More or Prev/Next)
- [ ] Handle errors gracefully
- [ ] Build Enhanced Posts App with all features
- [ ] Build Recipe Finder with TheMealDB API
- [ ] Push code to GitHub

---

## 🔑 Key Takeaways

1. **`map()` is perfect for rendering lists** — transforms data to HTML
2. **Always show loading states** — improves user experience
3. **Filter and sort without mutating original data** — use spread operator `[...data]`
4. **Combine filters with logical AND** — chain multiple `.filter()` calls
5. **Pagination prevents overwhelming the user** — with large datasets
6. **Search should be case-insensitive** — use `.toLowerCase()`
7. **Escape HTML when displaying user/API data** — prevents XSS
8. **Loading skeletons feel faster than spinners** — perceived performance

---

*Day 25 - Working with API Data - Display & Filtering*
```