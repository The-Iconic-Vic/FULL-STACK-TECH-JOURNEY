// ============================================
// PRODUCT CATALOG
// Demonstrating: Array of Objects, filter(), map()
// ============================================

// Array of product objects
const products = [
    { id: 1, name: "Wireless Headphones", price: 79.99, category: "Electronics", inStock: true },
    { id: 2, name: "Mechanical Keyboard", price: 129.99, category: "Electronics", inStock: true },
    { id: 3, name: "Wireless Mouse", price: 29.99, category: "Electronics", inStock: false },
    { id: 4, name: "USB-C Cable", price: 12.99, category: "Accessories", inStock: true },
    { id: 5, name: "Laptop Stand", price: 45.99, category: "Accessories", inStock: true },
    { id: 6, name: "Desk Lamp", price: 34.99, category: "Office", inStock: false },
    { id: 7, name: "Notebook Set", price: 9.99, category: "Office", inStock: true },
    { id: 8, name: "Coffee Mug", price: 14.99, category: "Kitchen", inStock: true }
];

// DOM Elements
const productsGrid = document.getElementById('products-grid');
const showingCountSpan = document.getElementById('showing-count');
const totalCountSpan = document.getElementById('total-count');
const filterBtns = document.querySelectorAll('.filter-btn');

// Current active filter
let currentFilter = 'all';

// ============================================
// FUNCTION: Generate product card HTML using map()
// ============================================
function generateProductCard(product) {
    const stockStatus = product.inStock ? 'In Stock' : 'Out of Stock';
    const stockClass = product.inStock ? 'stock-in' : 'stock-out';
    
    return `
        <div class="product-card">
            <div class="product-image">
                ${getCategoryIcon(product.category)}
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <div>
                    <span class="product-category">${product.category}</span>
                    <span class="product-stock ${stockClass}">${stockStatus}</span>
                </div>
            </div>
        </div>
    `;
}

// Helper function to get icon based on category
function getCategoryIcon(category) {
    switch(category) {
        case 'Electronics': return '📱';
        case 'Accessories': return '🔌';
        case 'Office': return '📎';
        case 'Kitchen': return '☕';
        default: return '📦';
    }
}

// ============================================
// FUNCTION: Filter products based on current filter
// ============================================
function filterProducts() {
    let filteredProducts = [...products];
    
    if (currentFilter === 'in-stock') {
        // Using filter() to get products in stock
        filteredProducts = products.filter(product => product.inStock === true);
    } else if (currentFilter === 'under50') {
        // Using filter() to get products under $50
        filteredProducts = products.filter(product => product.price < 50);
    }
    
    return filteredProducts;
}

// ============================================
// FUNCTION: Render products using map()
// ============================================
function renderProducts() {
    const filteredProducts = filterProducts();
    
    // Update stats
    showingCountSpan.textContent = filteredProducts.length;
    totalCountSpan.textContent = products.length;
    
    // Check if no products to show
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<div class="empty-message">No products match your filter.</div>';
        return;
    }
    
    // Using map() to generate HTML for all products
    const productsHTML = filteredProducts.map(product => generateProductCard(product)).join('');
    productsGrid.innerHTML = productsHTML;
}

// ============================================
// FUNCTION: Handle filter button clicks
// ============================================
function handleFilterClick(filterValue) {
    currentFilter = filterValue;
    
    // Update active button styling
    filterBtns.forEach(btn => {
        if (btn.getAttribute('data-filter') === filterValue) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Re-render products
    renderProducts();
}

// ============================================
// EVENT LISTENERS
// ============================================
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filterValue = btn.getAttribute('data-filter');
        handleFilterClick(filterValue);
    });
});

// ============================================
// INITIALIZATION
// ============================================
renderProducts();

// ============================================
// ADDITIONAL DEMONSTRATION: find() method
// (Commented - shows how to find a specific product)
// ============================================
// Example of using find() to get a product by id:
// const product = products.find(p => p.id === 3);
// console.log(product); // { id: 3, name: "Wireless Mouse", price: 29.99, ... }