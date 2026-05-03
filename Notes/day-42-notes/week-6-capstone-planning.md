# 📘 Week 6 Capstone Planning

## Project Overview

Build a complete, production-ready E-commerce Storefront application demonstrating mastery of all React concepts learned in Weeks 5-6: React Router, Context API, useReducer, custom hooks, API integration, and advanced state management.

---

## 📋 Requirements Checklist

### Routing (React Router)

| Route | Component | Status | Implementation |
|-------|-----------|--------|----------------|
| `/` | HomePage | ✅ | Hero section, features |
| `/products` | ProductsPage | ✅ | Product grid with filters |
| `/product/:id` | ProductDetailPage | ✅ | Single product view |
| `/cart` | CartPage | ✅ | Cart management |
| `/checkout` | CheckoutPage | ✅ | Order form |
| `*` | NotFoundPage | ✅ | 404 error page |

### API Integration

| Feature | Status | Implementation |
|---------|--------|----------------|
| Fetch products | ✅ | `useFetch` custom hook |
| Product detail | ✅ | Fetch by ID |
| Loading states | ✅ | Spinner component |
| Error states | ✅ | Error message with retry |
| Categories | ✅ | Extracted from API |

### State Management

| Feature | Status | Implementation |
|---------|--------|----------------|
| CartContext | ✅ | Central cart state |
| useReducer actions | ✅ | ADD, REMOVE, UPDATE, CLEAR |
| localStorage persistence | ✅ | Save/load cart |
| Cart badge | ✅ | Dynamic count in navbar |

### Features

| Feature | Status | Implementation |
|---------|--------|----------------|
| Filter by category | ✅ | Dropdown filter |
| Sort by price/rating/name | ✅ | Sort dropdown |
| Search by title | ✅ | Search input |
| Add/remove from cart | ✅ | Cart buttons |
| Cart total calculation | ✅ | Derived state |
| Checkout form | ✅ | Form with validation |

---

## 🏗️ Component Architecture

### Component Tree

```
App (CartProvider, Router)
├── Navbar
│   └── CartIcon
├── HomePage
├── ProductsPage
│   ├── ProductFilter
│   └── ProductCard (multiple)
├── ProductDetailPage
│   └── Add to Cart
├── CartPage
│   └── CartItem (multiple)
├── CheckoutPage
│   └── OrderSummary
└── NotFoundPage
```

### Component Responsibilities

| Component | Props | State | Responsibilities |
|-----------|-------|-------|-------------------|
| App | none | none | Routes, providers |
| Navbar | none | none | Navigation, cart badge |
| ProductsPage | none | filters, sort, search | Product listing |
| ProductFilter | filters, sort, search handlers | none | Filter/sort/search UI |
| ProductCard | product | none | Display single product |
| ProductDetailPage | none | quantity | Product details, add to cart |
| CartPage | none | none | Cart display, management |
| CartItem | item, handlers | none | Single cart item |
| CheckoutPage | none | formData, submitted | Checkout form |
| NotFoundPage | none | none | 404 page |

---

## 📊 State Management (CartContext + useReducer)

### Action Types

```javascript
export const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART'
}
```

### Reducer Function

```javascript
export const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const existing = state.find(item => item.id === action.payload.product.id)
      if (existing) {
        return state.map(item =>
          item.id === action.payload.product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...state, { ...action.payload.product, quantity: 1 }]
    }
    
    case CART_ACTIONS.REMOVE_ITEM:
      return state.filter(item => item.id !== action.payload.id)
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      if (action.payload.quantity <= 0) {
        return state.filter(item => item.id !== action.payload.id)
      }
      return state.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      )
    
    case CART_ACTIONS.CLEAR_CART:
      return []
    
    default:
      return state
  }
}
```

### Context Provider

```javascript
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product } })
  }

  const removeFromCart = (id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } })
  }

  const updateQuantity = (id, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART })
  }

  const itemCount = state.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = state.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemCount,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}
```

---

## 🎨 Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Primary | Purple | `#667eea` |
| Primary dark | Dark purple | `#5a67d8` |
| Success | Green | `#28a745` |
| Danger | Red | `#dc3545` |
| Warning | Yellow | `#ffc107` |
| Background | Light gray | `#f5f7fa` |
| Text primary | Dark blue | `#1a1a2e` |
| Text secondary | Gray | `#666` |

### Typography

| Element | Font Size | Weight |
|---------|-----------|--------|
| Hero title | 2.5rem | 700 |
| Page title | 2rem | 600 |
| Section title | 1.5rem | 600 |
| Card title | 0.875rem | 600 |
| Body text | 0.875rem | 400 |
| Small text | 0.75rem | 400 |

### Spacing

| Element | Spacing |
|---------|---------|
| Container padding | 2rem (desktop), 1rem (mobile) |
| Card gap | 1.5rem (desktop), 1rem (mobile) |
| Section margin | 2rem |
| Button padding | 0.75rem 1.5rem |

### Breakpoints

| Breakpoint | Target | Layout Changes |
|------------|--------|----------------|
| > 768px | Desktop | 4 product columns, 2-column cart |
| ≤ 768px | Tablet | 2-3 product columns, reduced padding |
| ≤ 700px | Mobile | 1 product column, stacked cart |
| ≤ 600px | Small mobile | Form responsive |

---

## 📱 Responsive Design

### CSS Modules Pattern

```css
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .grid {
    gap: 1rem;
  }
}
```

### Cart Page Responsive

```css
.cart {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

@media (max-width: 800px) {
  .cart {
    grid-template-columns: 1fr;
  }
  
  .summary {
    position: static;
  }
}
```

---

## ⚡ Key Functions

### useFetch Hook

```javascript
function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)

  const fetchData = useCallback(async () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    const controller = new AbortController()
    abortControllerRef.current = controller

    setLoading(true)
    setError(null)

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const result = await response.json()
      setData(result)
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message)
      }
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    fetchData()
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [fetchData])

  return { data, loading, error, refetch: fetchData }
}
```

### Filter, Sort, Search Logic

```javascript
const filteredProducts = useMemo(() => {
  if (!products) return []
  
  let filtered = [...products]
  
  // Category filter
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category === selectedCategory)
  }
  
  // Search filter
  if (searchTerm) {
    const term = searchTerm.toLowerCase()
    filtered = filtered.filter(p => 
      p.title.toLowerCase().includes(term) ||
      p.category.toLowerCase().includes(term)
    )
  }
  
  // Sort
  switch(sortBy) {
    case 'price-asc': filtered.sort((a, b) => a.price - b.price); break
    case 'price-desc': filtered.sort((a, b) => b.price - a.price); break
    case 'rating-desc': filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0)); break
    case 'title-asc': filtered.sort((a, b) => a.title.localeCompare(b.title)); break
  }
  
  return filtered
}, [products, selectedCategory, sortBy, searchTerm])
```

### Cart Totals

```javascript
const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
const shipping = 5.99
const tax = totalPrice * 0.1
const grandTotal = totalPrice + shipping + tax
```

---

## 🧪 Deployment

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Deploy to Netlify/Vercel

- Connect GitHub repository
- Build command: `npm run build`
- Publish directory: `dist`

---

## 🔑 Key Decisions

| Decision | Rationale |
|----------|-----------|
| Context + useReducer for cart | Global state, predictable updates |
| useFetch custom hook | Reusable API logic with AbortController |
| CSS Modules | Scoped styles, no conflicts |
| FakeStore API | Free, no API key required |
| localStorage for cart | Persists across sessions |
| useMemo for filtering | Performance optimization |
| ProductFilter component | Reusable filter UI |
| ErrorMessage with retry | Better UX on failure |

---

## 🚀 Future Enhancements

- [ ] User authentication (login/register)
- [ ] Wishlist functionality
- [ ] Product reviews and ratings
- [ ] Related products on detail page
- [ ] Pagination on products page
- [ ] Dark/light theme toggle
- [ ] Product image gallery
- [ ] Order history
- [ ] Payment integration (Stripe)
```

---

**File:** `resources/day-42-resources.md`

```markdown
# 📚 Day 42 Resources - Week 6 Capstone

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React Router Docs | https://reactrouter.com/en/main |
| React Context Docs | https://react.dev/reference/react/useContext |
| React useReducer Docs | https://react.dev/reference/react/useReducer |
| FakeStore API | https://fakestoreapi.com/docs |
| CSS Modules | https://github.com/css-modules/css-modules |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| E-commerce with React | https://youtu.be/2wCpkOk2uCg |
| Shopping Cart with Context | https://youtu.be/2wCpkOk2uCg |
| React Router Tutorial | https://youtu.be/1i0R_E7roTE |
| useReducer Tutorial | https://youtu.be/6ThXsUwLWvc |

## 🛠️ APIs Used

| API | Endpoint | Use |
|-----|----------|-----|
| FakeStore API | `https://fakestoreapi.com/products` | All products |
| FakeStore API | `https://fakestoreapi.com/products/{id}` | Single product |
| FakeStore API | `https://fakestoreapi.com/products/categories` | Categories |

## ✅ Capstone Checklist

### Setup Phase
- [ ] Create project with Vite
- [ ] Install dependencies
- [ ] Set up React Router
- [ ] Create folder structure

### Development Phase
- [ ] Create CartContext with useReducer
- [ ] Create useFetch custom hook
- [ ] Build Navbar component
- [ ] Build HomePage
- [ ] Build ProductsPage with filters
- [ ] Build ProductDetailPage
- [ ] Build CartPage
- [ ] Build CheckoutPage
- [ ] Build NotFoundPage
- [ ] Add loading states
- [ ] Add error handling
- [ ] Make responsive

### Testing Phase
- [ ] Test all routes
- [ ] Test add/remove cart
- [ ] Test filter/sort/search
- [ ] Test localStorage persistence
- [ ] Test responsive layout

## 🐛 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| `react-router-dom` not found | `npm install react-router-dom` |
| Images not loading | Add `onError` fallback |
| Cart not persisting | Check localStorage save/load |
| Filter not working | Use `useMemo` with correct deps |
| Context undefined | Wrap app with Provider |

