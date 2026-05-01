# Shopping Cart with Context - Day 40 Project

## Project Overview
A fully functional shopping cart demonstrating React Context API for state management across multiple components.

## Features
- Add products to cart
- Update quantities
- Remove items from cart
- Clear entire cart
- Cart count badge in navbar
- Cart summary with totals
- Persistent cart (localStorage)
- Product listing page
- Empty cart state

## Key Concepts
- Context for global cart state
- Custom hook `useCart()` for consuming context
- Provider wrapping entire app
- No prop drilling - any component can access cart

## File Structure
src/
├── contexts/
│ └── CartContext.jsx
├── components/
│ ├── Navbar.jsx
│ ├── CartIcon.jsx
│ ├── ProductCard.jsx
│ └── CartItem.jsx
├── pages/
│ ├── ProductsPage.jsx
│ └── CartPage.jsx
├── App.jsx
└── main.jsx

text

## Setup Instructions

```bash
cd day-40-shopping-cart-context
npm install
npm run dev