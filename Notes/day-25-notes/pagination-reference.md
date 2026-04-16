# 📘 Pagination Reference

## Types of Pagination

| Type | Description | Best For |
|------|-------------|----------|
| Load More | Incremental loading | Infinite scroll, mobile |
| Page Numbers | Traditional numbered pages | Desktop, large datasets |
| Prev/Next | Simple navigation | Small to medium datasets |

---

## Load More (Incremental) Pagination

### Basic Implementation
```javascript
let allItems = [];
let visibleCount = 10;

function renderItems() {
    const itemsToShow = allItems.slice(0, visibleCount);
    
    const html = itemsToShow.map(item => createCard(item)).join('');
    container.innerHTML = html;
    
    // Update button state
    loadMoreBtn.disabled = visibleCount >= allItems.length;
    showingCount.textContent = itemsToShow.length;
    totalCount.textContent = allItems.length;
}

function loadMore() {
    visibleCount += 10;
    renderItems();
}

loadMoreBtn.addEventListener('click', loadMore);
Load More with Filtering
javascript
let allItems = [];
let displayedItems = [];
let visibleCount = 10;
let currentFilter = 'all';

function applyFilters() {
    let filtered = [...allItems];
    
    if (currentFilter !== 'all') {
        filtered = filtered.filter(item => item.category === currentFilter);
    }
    
    displayedItems = filtered;
    visibleCount = 10;
    renderItems();
}

function renderItems() {
    const itemsToShow = displayedItems.slice(0, visibleCount);
    container.innerHTML = itemsToShow.map(createCard).join('');
    loadMoreBtn.disabled = visibleCount >= displayedItems.length;
}

function loadMore() {
    visibleCount += 10;
    renderItems();
}
Infinite Scroll (Load on Scroll)
javascript
let isLoading = false;

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    
    if (scrollTop + clientHeight >= scrollHeight - 100 && !isLoading) {
        if (visibleCount < displayedItems.length) {
            loadMore();
        }
    }
});

function loadMore() {
    isLoading = true;
    
    // Simulate loading delay
    setTimeout(() => {
        visibleCount += 10;
        renderItems();
        isLoading = false;
    }, 500);
}
Page Number Pagination
Basic Page Navigation
javascript
let currentPage = 1;
const itemsPerPage = 10;
let totalPages = 0;

function calculateTotalPages() {
    totalPages = Math.ceil(allItems.length / itemsPerPage);
}

function renderPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = allItems.slice(start, end);
    
    container.innerHTML = pageItems.map(createCard).join('');
    renderPageNumbers();
}

function goToPage(page) {
    currentPage = Math.max(1, Math.min(page, totalPages));
    renderPage();
}

function renderPageNumbers() {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(`
            <button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">
                ${i}
            </button>
        `);
    }
    paginationContainer.innerHTML = pageNumbers.join('');
    
    // Add event listeners
    document.querySelectorAll('.page-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            goToPage(parseInt(btn.dataset.page));
        });
    });
}
Prev/Next Buttons
javascript
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        renderPage();
    }
}

prevBtn.addEventListener('click', prevPage);
nextBtn.addEventListener('click', nextPage);
Pagination with Filtering
javascript
let allItems = [];
let filteredItems = [];
let currentPage = 1;
const itemsPerPage = 10;

function applyFilters() {
    let filtered = [...allItems];
    
    if (searchTerm) {
        filtered = filtered.filter(item => 
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    filteredItems = filtered;
    currentPage = 1;
    renderPage();
}

function renderPage() {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageItems = filteredItems.slice(start, end);
    
    container.innerHTML = pageItems.map(createCard).join('');
    updatePaginationControls();
}

function updatePaginationControls() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
}
Dynamic Items Per Page
javascript
let itemsPerPage = 10;

function changeItemsPerPage(value) {
    itemsPerPage = parseInt(value);
    currentPage = 1;
    renderPage();
}

perPageSelect.addEventListener('change', (e) => {
    changeItemsPerPage(e.target.value);
});
Pagination with API (Server-side)
javascript
let currentPage = 1;
let totalPages = 0;

async function fetchPage(page) {
    showLoading();
    
    try {
        const response = await fetch(`${API_URL}?_page=${page}&_limit=10`);
        const items = await response.json();
        totalPages = parseInt(response.headers.get('X-Total-Count')) / 10;
        
        renderItems(items);
        renderPagination();
        
    } catch (error) {
        showError(error);
    } finally {
        hideLoading();
    }
}

function goToPage(page) {
    currentPage = page;
    fetchPage(currentPage);
}
Cached Pagination (Client-side)
javascript
class PaginationCache {
    constructor() {
        this.cache = new Map();
    }
    
    async getPage(url, page) {
        const cacheKey = `${url}_page_${page}`;
        
        if (this.cache.has(cacheKey)) {
            return this.cache.get(cacheKey);
        }
        
        const response = await fetch(`${url}?_page=${page}&_limit=10`);
        const data = await response.json();
        
        this.cache.set(cacheKey, data);
        return data;
    }
    
    clear() {
        this.cache.clear();
    }
}
UI Components
Pagination Component
javascript
class Pagination {
    constructor(container, totalItems, itemsPerPage = 10) {
        this.container = container;
        this.totalItems = totalItems;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = 1;
        this.totalPages = Math.ceil(totalItems / itemsPerPage);
        this.render();
    }
    
    render() {
        const html = `
            <div class="pagination">
                <button class="prev" ${this.currentPage === 1 ? 'disabled' : ''}>Previous</button>
                <span class="page-info">Page ${this.currentPage} of ${this.totalPages}</span>
                <button class="next" ${this.currentPage === this.totalPages ? 'disabled' : ''}>Next</button>
            </div>
        `;
        
        this.container.innerHTML = html;
        this.attachEvents();
    }
    
    attachEvents() {
        this.container.querySelector('.prev')?.addEventListener('click', () => {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.onPageChange?.(this.currentPage);
                this.render();
            }
        });
        
        this.container.querySelector('.next')?.addEventListener('click', () => {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.onPageChange?.(this.currentPage);
                this.render();
            }
        });
    }
    
    onPageChange(callback) {
        this.onPageChange = callback;
    }
}
Load More Button Component
javascript
class LoadMoreButton {
    constructor(button, onLoadMore) {
        this.button = button;
        this.onLoadMore = onLoadMore;
        this.isLoading = false;
        this.hasMore = true;
        this.attachEvents();
    }
    
    attachEvents() {
        this.button.addEventListener('click', async () => {
            if (this.isLoading || !this.hasMore) return;
            
            this.isLoading = true;
            this.button.textContent = 'Loading...';
            
            const hasMore = await this.onLoadMore();
            this.hasMore = hasMore;
            
            this.isLoading = false;
            this.button.textContent = hasMore ? 'Load More' : 'All Loaded';
            if (!hasMore) this.button.disabled = true;
        });
    }
}
Performance Tips
Tip	Why
Use slice() for pagination	Doesn't modify original array
Render only visible items	Reduces DOM size
Cache paginated data	Avoids re-filtering
Use virtual scrolling for huge lists	Only renders visible rows
Debounce scroll events	Prevents excessive calculations
Show loading indicators	Improves perceived performance