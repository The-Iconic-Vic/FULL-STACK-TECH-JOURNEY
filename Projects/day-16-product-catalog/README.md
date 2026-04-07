# Product Catalog - Day 16 Project

## Project Overview
An interactive product catalog demonstrating JavaScript objects, arrays of objects, and array methods like filter() and map().

## Skills Practiced
- Creating objects with `{}` syntax
- Object properties (name, price, category, inStock)
- Arrays of objects
- `filter()` - in stock and under $50 filters
- `map()` - generate product cards dynamically
- `find()` - find product by id (commented example)
- Dynamic DOM manipulation

## File Structure
day-16-product-catalog/
├── index.html
├── style.css
├── script.js
└── README.md

text

## Object Structure
```javascript
{
    id: 1,
    name: "Wireless Headphones",
    price: 79.99,
    category: "Electronics",
    inStock: true
}
Array Methods Used
Method	Purpose	Example
filter()	Filter by stock/price	products.filter(p => p.inStock === true)
map()	Generate product cards	products.map(p => generateCard(p)).join('')
find()	Find product by id (demo)	products.find(p => p.id === 3)
Key JavaScript Code
javascript
// Array of objects
const products = [
    { name: "Headphones", price: 79.99, inStock: true },
    { name: "Mouse", price: 29.99, inStock: false }
];

// Filter products
const inStock = products.filter(p => p.inStock === true);
const under50 = products.filter(p => p.price < 50);

// Map to HTML
const productCards = products.map(product => `
    <div class="product-card">
        <h3>${product.name}</h3>
        <p>$${product.price}</p>
    </div>
`).join('');

// Find specific product
const product = products.find(p => p.id === 3);


Features
Display products as cards with images, prices, categories

Filter: All Products

Filter: In Stock Only

Filter: Under $50

Dynamic product count display

Category-based icons

Stock status badges (In Stock/Out of Stock)

Responsive grid layout