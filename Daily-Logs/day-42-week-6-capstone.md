# 📅 Day 42: Week 6 Capstone - E-commerce Storefront

**Date:** May 3, 2026  
**Author:** Victor Innocent (@TheIconicVic_)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topic:** Week 6 Capstone - Complete E-commerce Storefront

---

## 📋 Project Overview

This is the Week 6 Capstone project – a complete, production-ready E-commerce Storefront application combining everything learned in Weeks 5-6: React Router, Context API, useReducer, custom hooks, API integration, and advanced state management.

---

## 🎯 Capstone Requirements Checklist

### Routing (React Router) ✅

| Route | Component | Status |
|-------|-----------|--------|
| `/` | HomePage | ✅ |
| `/products` | ProductsPage | ✅ |
| `/product/:id` | ProductDetailPage | ✅ |
| `/cart` | CartPage | ✅ |
| `/checkout` | CheckoutPage | ✅ |
| `*` | NotFoundPage | ✅ |

### API Integration ✅

| Feature | Implementation |
|---------|----------------|
| Fetch products | `useFetch` custom hook |
| Product detail | Fetch by ID |
| Loading states | Spinner component |
| Error states | Error message with retry |
| Categories | Extracted from API data |

### State Management (Context + useReducer) ✅

| Feature | Implementation |
|---------|----------------|
| CartContext | Central cart state |
| useReducer | ADD_ITEM, REMOVE_ITEM, UPDATE_QUANTITY, CLEAR_CART |
| localStorage | Cart persistence |
| Cart badge | Dynamic count in navbar |

### Features ✅

| Feature | Implementation |
|---------|----------------|
| Filter by category | Dropdown filter |
| Sort by price, rating, name | Sort dropdown |
| Search by title | Search input |
| Add/remove from cart | Cart buttons |
| Cart total calculation | Derived state |
| Checkout form | Form with validation |
| Quantity selector | Product detail page |

### Advanced Features ✅

| Feature | Status |
|---------|--------|
| Product reviews display | Rating stars with count |
| Related products | Planned |
| Pagination | Planned |

---

## 🏗️ Project Structure

```
week-6-capstone-ecommerce/
├── src/
│   ├── contexts/
│   │   └── CartContext.jsx
│   ├── reducers/
│   │   └── cartReducer.js
│   ├── hooks/
│   │   └── useFetch.js
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProductDetailPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CartIcon.jsx
│   │   ├── ProductCard.jsx
│   │   ├── ProductFilter.jsx
│   │   ├── LoadingSpinner.jsx
│   │   └── ErrorMessage.jsx
│   ├── utils/
│   │   └── helpers.js
│   └── App.jsx
├── package.json
└── README.md
```

---

## 📝 Page Components

### HomePage
- Hero section with call-to-action
- Features section (shipping, payment, returns, support)
- Navigation to products page

### ProductsPage
- Fetches all products from FakeStore API
- Product filtering by category
- Product sorting (price, rating, name)
- Search by title/category
- Product grid display with ProductCard components
- Loading spinner and error states

### ProductDetailPage
- Fetches single product by ID from URL parameter
- Quantity selector (1-99)
- Add to cart with selected quantity
- Product image, title, category, rating, price, description
- Back button navigation

### CartPage
- Displays all items in cart
- Update quantity per item
- Remove individual items
- Clear entire cart
- Cart summary with subtotal, shipping, tax, total
- Proceed to checkout button

### CheckoutPage
- Multi-section form (personal info, shipping, payment)
- Order summary with actual cart items
- Form validation (HTML5 required)
- Order confirmation screen on submit
- Clears cart after order

### NotFoundPage
- 404 error page for unknown routes
- Link back to home

---

## ⚡ Key Components

### CartContext (Context + useReducer)

```javascript
// Reducer actions
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
}

// Reducer function
export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      // Add or increment quantity
    case CART_ACTIONS.REMOVE_ITEM:
      // Filter out item
    case CART_ACTIONS.UPDATE_QUANTITY:
      // Update quantity or remove if <= 0
    case CART_ACTIONS.CLEAR_CART:
      return []
    default:
      return state
  }
}
```

### useFetch Custom Hook

```javascript
function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)

  // Fetch with AbortController for cleanup
  // Returns { data, loading, error, refetch }
}
```

### ProductCard Component

- Displays product image, title, rating, price
- Add to cart button
- Link to product detail page
- Truncated title for long names
- Rating stars display

### ProductFilter Component

- Search input (debounced in parent)
- Category dropdown (dynamic from API)
- Sort dropdown (price, rating, name)

---

## 🎨 CSS Features

### CSS Modules
- Scoped styles for each component
- No class name conflicts

### Responsive Design
- Mobile breakpoint at 768px
- Grid layout adjusts for screen size
- Cart page responsive layout

### Loading States
- Spinner animation
- Centered loading indicator

### Error States
- Error message with retry button
- User-friendly error display

---

## 📱 Responsive Breakpoints

| Breakpoint | Layout Changes |
|------------|----------------|
| > 768px | Desktop: 4 product columns, 2-column cart |
| ≤ 768px | Tablet: 2-3 product columns, reduced padding |
| ≤ 700px | Mobile: 1 product column, stacked cart layout |
| ≤ 600px | Checkout form responsive |

---

## 📊 Data Flow

```
ProductsPage
    │
    ├── useFetch → products array
    ├── ProductFilter → filters, sort, search
    ├── filteredProducts → useMemo
    └── ProductCard → display individual product

ProductDetailPage
    │
    ├── useParams → get id from URL
    ├── useFetch → single product
    └── Add to Cart → dispatches to CartContext

CartPage
    │
    ├── useCart → cart state, functions
    ├── updateQuantity → dispatch UPDATE_QUANTITY
    ├── removeFromCart → dispatch REMOVE_ITEM
    └── clearCart → dispatch CLEAR_CART

CheckoutPage
    │
    ├── useCart → cart data, totalPrice
    ├── Form → collects user info
    └── Submit → clears cart, shows confirmation
```

---

## 🧪 Testing Checklist

### Routing
- [x] Home page loads at `/`
- [x] Products page loads at `/products`
- [x] Product detail loads at `/product/:id`
- [x] Cart page loads at `/cart`
- [x] Checkout page loads at `/checkout`
- [x] 404 page for unknown routes

### API Integration
- [x] Products fetch on mount
- [x] Loading spinner displays
- [x] Error message on failure
- [x] Retry button works
- [x] Product detail loads correctly

### Cart Functionality
- [x] Add item to cart
- [x] Update quantity
- [x] Remove item
- [x] Clear cart
- [x] Cart persists after refresh
- [x] Cart badge updates

### Filter/Sort/Search
- [x] Filter by category
- [x] Sort by price (low-high, high-low)
- [x] Sort by rating
- [x] Sort by name
- [x] Search by title

### Checkout
- [x] Form validation
- [x] Order summary display
- [x] Place order button
- [x] Success screen
- [x] Cart cleared after order

### Responsive
- [x] Desktop layout
- [x] Mobile layout
- [x] Tablet layout

---

## 🔑 Key Takeaways

1. **React Router enables multi-page apps** - seamless navigation without page reloads
2. **Context + useReducer = Mini Redux** - powerful global state management
3. **Custom hooks like useFetch** make API calls reusable across components
4. **localStorage persistence** keeps cart data across sessions
5. **Dynamic filtering, sorting, searching** with useMemo for performance
6. **Loading and error states** are essential for good UX
7. **CSS Modules** prevent style conflicts
8. **Responsive design** is critical for e-commerce

