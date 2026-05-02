# Shopping Cart with useReducer - Day 41 Project

## Project Overview
A complete shopping cart application demonstrating useReducer for complex state management combined with Context API.

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
- useReducer with actions (ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART)
- Action types as constants
- Payload for action data
- Combined with Context API
- LocalStorage persistence
- Derived state (itemCount, totalPrice)

## File Structure
src/
├── reducers/
│ └── cartReducer.js
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
└── App.jsx



## Reducer Actions

| Action | Payload | Description |
|--------|---------|-------------|
| ADD_ITEM | { product } | Add item to cart |
| REMOVE_ITEM | { id } | Remove item from cart |
| UPDATE_QUANTITY | { id, quantity } | Update item quantity |
| CLEAR_CART | none | Clear entire cart |

## Setup Instructions


cd day-41-cart-usereducer
npm install
npm run dev