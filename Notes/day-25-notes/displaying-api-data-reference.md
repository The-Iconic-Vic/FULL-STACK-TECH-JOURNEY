# 📘 Displaying API Data Reference

## The Display Pattern

The core pattern for displaying API data in the DOM:

```javascript
async function displayData() {
    // 1. Show loading state
    showLoading();
    
    try {
        // 2. Fetch data
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // 3. Transform to HTML using map()
        const html = data.map(item => createCard(item)).join('');
        
        // 4. Insert into DOM
        container.innerHTML = html;
        
    } catch (error) {
        showError(error);
    } finally {
        hideLoading();
    }
}
Using map() for HTML Generation
Basic Card Creation
javascript
function createCards(items) {
    return items.map(item => `
        <div class="card">
            <h3 class="card-title">${escapeHtml(item.title)}</h3>
            <p class="card-description">${escapeHtml(item.description)}</p>
            <span class="card-price">$${item.price}</span>
        </div>
    `).join('');
}
Complex Card with Conditional Content
javascript
function createProductCard(product) {
    return `
        <div class="product-card ${product.inStock ? '' : 'out-of-stock'}">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${escapeHtml(product.name)}</h3>
                <p class="product-price">$${product.price}</p>
                ${product.discount ? `<span class="product-discount">${product.discount}% OFF</span>` : ''}
                ${product.inStock 
                    ? '<button class="add-to-cart">Add to Cart</button>' 
                    : '<span class="out-of-stock-label">Out of Stock</span>'}
            </div>
        </div>
    `;
}
Grid Layout
javascript
function createGrid(items, columns = 3) {
    const cards = items.map(item => createCard(item)).join('');
    return `<div class="grid grid-${columns}">${cards}</div>`;
}
Loading States
Loading Spinner
javascript
function showSpinner() {
    container.innerHTML = `
        <div class="spinner-container">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;
}

// CSS
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
Loading Skeleton
javascript
function showSkeleton(count = 6) {
    const skeletons = Array(count).fill().map(() => `
        <div class="skeleton-card">
            <div class="skeleton-image"></div>
            <div class="skeleton-title"></div>
            <div class="skeleton-text"></div>
            <div class="skeleton-text short"></div>
        </div>
    `).join('');
    
    container.innerHTML = `<div class="skeleton-grid">${skeletons}</div>`;
}

// CSS
.skeleton-card {
    background: #f0f0f0;
    border-radius: 8px;
    overflow: hidden;
    animation: pulse 1.5s ease-in-out infinite;
}

.skeleton-image {
    height: 150px;
    background: #e0e0e0;
}

.skeleton-title {
    height: 20px;
    background: #e0e0e0;
    margin: 12px;
    width: 80%;
}

.skeleton-text {
    height: 14px;
    background: #e0e0e0;
    margin: 8px 12px;
}

.skeleton-text.short {
    width: 60%;
}

@keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
}
Progress Bar (for large datasets)
javascript
function showProgressBar(current, total) {
    const percent = (current / total) * 100;
    progressBar.style.width = `${percent}%`;
    progressText.textContent = `Loading... ${Math.round(percent)}%`;
}
Error States
javascript
function showError(message) {
    container.innerHTML = `
        <div class="error-state">
            <div class="error-icon">⚠️</div>
            <h3>Something went wrong</h3>
            <p>${escapeHtml(message)}</p>
            <button onclick="location.reload()">Try Again</button>
        </div>
    `;
}

function showEmptyState(message = 'No items found') {
    container.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">📭</div>
            <p>${escapeHtml(message)}</p>
        </div>
    `;
}
Performance Optimizations
Batch DOM Updates
javascript
// BAD: Multiple DOM updates
items.forEach(item => {
    container.innerHTML += createCard(item);  // Reflows each time!
});

// GOOD: Build string, update once
const html = items.map(item => createCard(item)).join('');
container.innerHTML = html;  // Single reflow
Virtual Scrolling (for huge lists)
javascript
class VirtualScroll {
    constructor(container, items, itemHeight = 100) {
        this.container = container;
        this.items = items;
        this.itemHeight = itemHeight;
        this.visibleCount = Math.ceil(container.clientHeight / itemHeight);
        this.setupScroll();
    }
    
    setupScroll() {
        this.container.addEventListener('scroll', () => this.render());
        this.render();
    }
    
    render() {
        const scrollTop = this.container.scrollTop;
        const startIndex = Math.floor(scrollTop / this.itemHeight);
        const endIndex = startIndex + this.visibleCount;
        
        const visibleItems = this.items.slice(startIndex, endIndex);
        const offset = startIndex * this.itemHeight;
        
        const html = visibleItems.map(item => this.createItem(item)).join('');
        this.container.innerHTML = `<div style="padding-top: ${offset}px">${html}</div>`;
    }
}
Data Transformation
Before Display
javascript
function transformData(rawData) {
    return rawData.map(item => ({
        id: item.id,
        title: item.title || 'Untitled',
        description: item.body?.substring(0, 100) || '',
        date: new Date(item.createdAt).toLocaleDateString(),
        url: `/items/${item.id}`,
        isNew: Date.now() - new Date(item.createdAt) < 86400000
    }));
}
Formatting Helpers
javascript
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function truncateText(text, maxLength = 100) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

function formatPrice(price, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(price);
}
Complete Example: Product Gallery
javascript
class ProductGallery {
    constructor(containerId, apiUrl) {
        this.container = document.getElementById(containerId);
        this.apiUrl = apiUrl;
        this.products = [];
        this.init();
    }
    
    async init() {
        await this.fetchProducts();
        this.render();
    }
    
    async fetchProducts() {
        this.showSkeleton();
        try {
            const response = await fetch(this.apiUrl);
            this.products = await response.json();
        } catch (error) {
            this.showError(error.message);
        }
    }
    
    render() {
        const html = this.products.map(product => `
            <div class="product-card" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h3>${escapeHtml(product.name)}</h3>
                <p class="price">${formatPrice(product.price)}</p>
                <button class="view-details">View Details</button>
            </div>
        `).join('');
        
        this.container.innerHTML = `<div class="products-grid">${html}</div>`;
        this.attachEventListeners();
    }
    
    attachEventListeners() {
        this.container.querySelectorAll('.product-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = card.dataset.id;
                this.showDetails(id);
            });
        });
    }
    
    showSkeleton() {
        this.container.innerHTML = `
            <div class="skeleton-grid">
                ${Array(6).fill().map(() => `
                    <div class="skeleton-card">
                        <div class="skeleton-image"></div>
                        <div class="skeleton-title"></div>
                        <div class="skeleton-price"></div>
                    </div>
                `).join('')}
            </div>
        `;
    }
}