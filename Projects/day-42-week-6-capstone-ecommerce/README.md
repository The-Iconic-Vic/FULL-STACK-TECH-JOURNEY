# E-commerce Storefront - Week 6 Capstone

## Project Overview
A complete e-commerce storefront built with React, featuring product listing, shopping cart, checkout flow, and global state management using Context + useReducer.

## Technologies Used
- React 18
- React Router DOM v6
- Context API + useReducer
- CSS Modules
- FakeStore API

## Features

### Routing ✅
- Home page (/)
- Products page (/products)
- Product detail page (/product/:id)
- Cart page (/cart)
- Checkout page (/checkout)
- 404 page

### API Integration ✅
- Fetch products from FakeStore API
- Product detail by ID
- Loading and error states
- Categories from API

### State Management ✅
- CartContext with useReducer
- Add to cart, remove, update quantity
- Cart persists in localStorage
- Cart count badge in navigation

### Features ✅
- Filter by category
- Sort by price, rating, name
- Search by title/category
- Add/remove from cart
- Cart total calculation
- Checkout form

## Setup Instructions

cd week-6-capstone-ecommerce
npm install
npm run dev