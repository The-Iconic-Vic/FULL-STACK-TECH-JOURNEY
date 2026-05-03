# 📚 Day 42 Resources - Week 6 Capstone

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React Router Docs | https://reactrouter.com/en/main |
| React Context Docs | https://react.dev/reference/react/useContext |
| React useReducer Docs | https://react.dev/reference/react/useReducer |
| React Custom Hooks | https://react.dev/learn/reusing-logic-with-custom-hooks |
| FakeStore API Docs | https://fakestoreapi.com/docs |
| CSS Modules | https://github.com/css-modules/css-modules |
| Vite Docs | https://vitejs.dev/guide/ |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| Full E-commerce with React | https://youtu.be/2wCpkOk2uCg |
| Shopping Cart with Context & useReducer | https://youtu.be/2wCpkOk2uCg |
| React Router v6 Tutorial | https://youtu.be/1i0R_E7roTE |
| useReducer Hook Tutorial | https://youtu.be/6ThXsUwLWvc |
| Custom Hooks Tutorial | https://youtu.be/6ThXsUwLWvc |

## 🛠️ APIs for Practice

| API | Endpoint | Description |
|-----|----------|-------------|
| FakeStore API | `https://fakestoreapi.com/products` | All products |
| FakeStore API | `https://fakestoreapi.com/products/{id}` | Single product |
| FakeStore API | `https://fakestoreapi.com/products/categories` | Categories |
| DummyJSON | `https://dummyjson.com/products` | Alternative products API |
| DummyJSON | `https://dummyjson.com/products/{id}` | Single product |

## 📝 Capstone Checklist

### Setup Phase
- [ ] Create project with Vite
- [ ] Install dependencies (react, react-dom, react-router-dom)
- [ ] Set up folder structure
- [ ] Configure React Router

### State Management Phase
- [ ] Create CartContext with createContext
- [ ] Define cartReducer with action types
- [ ] Add localStorage persistence
- [ ] Create useCart custom hook

### API Integration Phase
- [ ] Create useFetch custom hook
- [ ] Fetch products on ProductsPage
- [ ] Fetch single product on ProductDetailPage
- [ ] Add loading and error states

### Component Development Phase
- [ ] Build Navbar with CartIcon
- [ ] Build HomePage hero and features
- [ ] Build ProductCard component
- [ ] Build ProductFilter component (search, category, sort)
- [ ] Build ProductDetailPage with quantity selector
- [ ] Build CartPage with cart items
- [ ] Build CheckoutPage with form
- [ ] Build NotFoundPage

### Styling Phase
- [ ] Add CSS Modules for each component
- [ ] Make responsive with media queries
- [ ] Add loading spinner styles
- [ ] Add error message styles

### Testing Phase
- [ ] Test all routes
- [ ] Test cart functionality (add, remove, update)
- [ ] Test filter, sort, search
- [ ] Test localStorage persistence
- [ ] Test responsive layout (mobile, tablet, desktop)

## ✅ Common Patterns Summary

### useFetch Hook
```javascript
function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => setLoading(false))
    
    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}
```

### Cart Reducer Pattern
```javascript
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existing = state.find(item => item.id === action.payload.id)
      if (existing) {
        return state.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...state, { ...action.payload, quantity: 1 }]
    
    case 'REMOVE_ITEM':
      return state.filter(item => item.id !== action.payload)
    
    default:
      return state
  }
}
```

### Filter/Sort Pattern
```javascript
const filteredItems = useMemo(() => {
  let result = [...items]
  
  if (category !== 'all') {
    result = result.filter(item => item.category === category)
  }
  
  if (searchTerm) {
    result = result.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }
  
  switch(sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
  }
  
  return result
}, [items, category, searchTerm, sortBy])
```

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `react-router-dom` not found | Not installed | `npm install react-router-dom` |
| Images not loading | Invalid URL | Add `onError` fallback image |
| Cart not persisting | No localStorage | Add save/load in reducer |
| Filter not updating | Stale closure | Use `useMemo` with correct deps |
| Context undefined | Missing Provider | Wrap app with Provider |
| AbortController error | No cleanup | Return abort in useEffect |
| CORS error | API doesn't allow | Use CORS-enabled API |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| Advanced React Patterns | https://react.dev/learn/keeping-components-pure |
| React Performance Optimization | https://react.dev/learn/render-and-commit |
| Deploying React to Netlify | https://www.netlify.com/blog/2020/12/02/deploy-a-react-app-in-minutes/ |
| Deploying React to Vercel | https://vercel.com/docs/frameworks/react |

