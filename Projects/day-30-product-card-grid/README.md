# Product Card Grid - Day 30 Project

## Project Overview
A responsive product catalog grid built with React components demonstrating:
- Component composition
- JSX syntax and rules
- CSS Modules for styling
- Props passing
- State management (add to cart)

## File Structure
day-30-product-card-grid/
├── src/
│ ├── components/
│ │ ├── ProductCard.jsx
│ │ ├── ProductCard.module.css
│ │ ├── Card.jsx
│ │ ├── Avatar.jsx
│ │ ├── Title.jsx
│ │ └── Description.jsx
│ ├── App.jsx
│ ├── App.module.css
│ └── main.jsx
├── package.json
├── index.html
└── README.md

text

## JSX Features Demonstrated

| Feature | Example |
|---------|---------|
| Embedding JavaScript | `{product.name}` |
| Conditional rendering | `{isAdded ? '✓ Added!' : 'Add to Cart'}` |
| Fragments | `<>...</>` |
| className | `className={styles.card}` |
| Self-closing tags | `<ProductCard />` |
| Comments | `{/* Comment */}` |

## Components

| Component | Purpose |
|-----------|---------|
| App | Main container, renders grid of products |
| ProductCard | Displays individual product |
| Card | Reusable card wrapper |
| Avatar | Circular image component |
| Title | Reusable heading component |
| Description | Text description component |

## Styling Methods Used
- **CSS Modules** - Scoped component styles
- **CSS Grid** - Product grid layout
- **Inline styles** - Dynamic button states

## Setup Instructions
```bash
cd day-30-product-card-grid
npm install
npm run dev
