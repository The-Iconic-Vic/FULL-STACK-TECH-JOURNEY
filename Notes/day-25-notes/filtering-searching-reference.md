# 📘 Filtering & Searching Reference

## Basic Search

### Case-Insensitive Search
```javascript
function searchItems(items, searchTerm) {
    if (!searchTerm) return items;
    
    const term = searchTerm.toLowerCase();
    return items.filter(item => 
        item.title.toLowerCase().includes(term)
    );
}
Search Multiple Fields
javascript
function searchMultipleFields(items, searchTerm) {
    if (!searchTerm) return items;
    
    const term = searchTerm.toLowerCase();
    return items.filter(item => 
        item.title.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term) ||
        item.tags.some(tag => tag.toLowerCase().includes(term))
    );
}
Debounced Search
javascript
let debounceTimer;

function debouncedSearch(searchTerm) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        performSearch(searchTerm);
    }, 300);
}

searchInput.addEventListener('input', (e) => {
    debouncedSearch(e.target.value);
});
Category Filtering
Single Category Filter
javascript
function filterByCategory(items, category) {
    if (category === 'all') return items;
    return items.filter(item => item.category === category);
}
Multiple Category Filter (Checkboxes)
javascript
let activeCategories = new Set();

function updateCategoryFilter(category, isChecked) {
    if (isChecked) {
        activeCategories.add(category);
    } else {
        activeCategories.delete(category);
    }
    applyFilters();
}

function filterByCategories(items) {
    if (activeCategories.size === 0) return items;
    return items.filter(item => activeCategories.has(item.category));
}
Price Range Filter
javascript
let minPrice = 0;
let maxPrice = Infinity;

function filterByPrice(items) {
    return items.filter(item => 
        item.price >= minPrice && item.price <= maxPrice
    );
}

// With slider
priceSlider.addEventListener('input', (e) => {
    maxPrice = parseInt(e.target.value);
    priceDisplay.textContent = `$${maxPrice}`;
    applyFilters();
});
Rating Filter
javascript
let minRating = 0;

function filterByRating(items) {
    if (minRating === 0) return items;
    return items.filter(item => item.rating >= minRating);
}

// Star rating filter
function createStarFilter() {
    for (let i = 1; i <= 5; i++) {
        const star = document.createElement('button');
        star.textContent = '⭐'.repeat(i);
        star.addEventListener('click', () => {
            minRating = i;
            applyFilters();
            updateStarButtons(i);
        });
    }
}
Date Range Filter
javascript
let startDate = null;
let endDate = null;

function filterByDate(items) {
    let filtered = [...items];
    
    if (startDate) {
        filtered = filtered.filter(item => new Date(item.date) >= startDate);
    }
    if (endDate) {
        filtered = filtered.filter(item => new Date(item.date) <= endDate);
    }
    
    return filtered;
}

// Date inputs
startDateInput.addEventListener('change', (e) => {
    startDate = new Date(e.target.value);
    applyFilters();
});
Sorting
Basic Sort
javascript
function sortByTitle(items, ascending = true) {
    const sorted = [...items];
    sorted.sort((a, b) => {
        return ascending 
            ? a.title.localeCompare(b.title)
            : b.title.localeCompare(a.title);
    });
    return sorted;
}
Multiple Sort Options
javascript
let sortField = 'title';
let sortDirection = 'asc';

function sortItems(items) {
    const sorted = [...items];
    
    sorted.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        
        if (sortField === 'price') {
            aVal = Number(aVal);
            bVal = Number(bVal);
        }
        
        if (sortField === 'date') {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
        }
        
        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
        return 0;
    });
    
    return sorted;
}

sortSelect.addEventListener('change', (e) => {
    const [field, direction] = e.target.value.split('-');
    sortField = field;
    sortDirection = direction;
    applyFilters();
});
Sort Buttons
javascript
function createSortButton(field, label) {
    const btn = document.createElement('button');
    let direction = 'asc';
    
    btn.textContent = `${label} ↑↓`;
    btn.addEventListener('click', () => {
        direction = direction === 'asc' ? 'desc' : 'asc';
        sortField = field;
        sortDirection = direction;
        btn.textContent = `${label} ${direction === 'asc' ? '↑' : '↓'}`;
        applyFilters();
    });
    
    return btn;
}
Combined Filtering
Complete Filter System
javascript
class FilterSystem {
    constructor(data) {
        this.originalData = data;
        this.filters = {
            search: '',
            category: 'all',
            minPrice: 0,
            maxPrice: Infinity,
            minRating: 0,
            sortBy: 'title',
            sortDirection: 'asc'
        };
    }
    
    applyFilters() {
        let filtered = [...this.originalData];
        
        // Search filter
        if (this.filters.search) {
            const term = this.filters.search.toLowerCase();
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(term) ||
                item.description.toLowerCase().includes(term)
            );
        }
        
        // Category filter
        if (this.filters.category !== 'all') {
            filtered = filtered.filter(item => 
                item.category === this.filters.category
            );
        }
        
        // Price filter
        filtered = filtered.filter(item =>
            item.price >= this.filters.minPrice &&
            item.price <= this.filters.maxPrice
        );
        
        // Rating filter
        if (this.filters.minRating > 0) {
            filtered = filtered.filter(item =>
                item.rating >= this.filters.minRating
            );
        }
        
        // Sort
        filtered.sort((a, b) => {
            let aVal = a[this.filters.sortBy];
            let bVal = b[this.filters.sortBy];
            
            if (this.filters.sortBy === 'price') {
                aVal = Number(aVal);
                bVal = Number(bVal);
            }
            
            if (aVal < bVal) return this.filters.sortDirection === 'asc' ? -1 : 1;
            if (aVal > bVal) return this.filters.sortDirection === 'asc' ? 1 : -1;
            return 0;
        });
        
        return filtered;
    }
    
    updateFilter(key, value) {
        this.filters[key] = value;
        return this.applyFilters();
    }
}

// Usage
const filterSystem = new FilterSystem(products);
const filtered = filterSystem.updateFilter('category', 'electronics');
renderProducts(filtered);
Real-time Search with Highlighting
javascript
function highlightText(text, searchTerm) {
    if (!searchTerm) return escapeHtml(text);
    
    const regex = new RegExp(`(${escapeRegex(searchTerm)})`, 'gi');
    return escapeHtml(text).replace(regex, `<mark>$1</mark>`);
}

function escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Usage in render
const highlightedTitle = highlightText(product.title, searchTerm);
Filter Count Display
javascript
function updateFilterCounts(items) {
    const categories = {};
    items.forEach(item => {
        categories[item.category] = (categories[item.category] || 0) + 1;
    });
    
    for (const [category, count] of Object.entries(categories)) {
        const element = document.querySelector(`.filter-category[data-category="${category}"]`);
        if (element) {
            element.querySelector('.count').textContent = `(${count})`;
        }
    }
}
URL Query Parameters (Shareable Filters)
javascript
function updateURL(filters) {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== 'all' && value !== '') {
            params.set(key, value);
        }
    });
    const newURL = `${window.location.pathname}?${params.toString()}`;
    window.history.pushState({}, '', newURL);
}

function loadFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    return {
        search: params.get('search') || '',
        category: params.get('category') || 'all',
        sortBy: params.get('sortBy') || 'title',
        sortDirection: params.get('sortDirection') || 'asc'
    };
}