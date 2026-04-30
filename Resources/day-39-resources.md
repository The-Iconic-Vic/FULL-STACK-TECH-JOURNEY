# 📚 Day 39 Resources - React Router

## 📖 Official Documentation

| Resource | Link |
|----------|------|
| React Router Official Docs | https://reactrouter.com/en/main |
| React Router Tutorial | https://reactrouter.com/en/main/start/tutorial |
| React Router API Reference | https://reactrouter.com/en/main/start/concepts |
| MDN: History API | https://developer.mozilla.org/en-US/docs/Web/API/History_API |

## 🎥 Video Tutorials

| Topic | Link |
|-------|------|
| React Router v6 Tutorial | https://youtu.be/1i0R_E7roTE |
| React Router Crash Course | https://youtu.be/Ul3y1LXxzdU |
| Nested Routes Tutorial | https://youtu.be/4jlpZ5xhyu4 |
| Protected Routes | https://youtu.be/oUjOjZ0tJqY |

## 📝 React Router Cheatsheet

### Setup
```bash
npm install react-router-dom
```

```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'

<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
</BrowserRouter>
```

### Navigation
```jsx
import { Link, NavLink, useNavigate } from 'react-router-dom'

<Link to="/about">About</Link>

<NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>
  Home
</NavLink>

const navigate = useNavigate()
navigate('/contact')
navigate(-1)  // back
```

### URL Parameters
```jsx
import { useParams, useSearchParams } from 'react-router-dom'

// Path param: /user/:id
const { id } = useParams()

// Query param: ?q=search
const [searchParams, setSearchParams] = useSearchParams()
const query = searchParams.get('q')
```

## ✅ Common Patterns Summary

| Pattern | Code |
|---------|------|
| Basic Route | `<Route path="/about" element={<About />} />` |
| Dynamic Route | `<Route path="/user/:id" element={<User />} />` |
| Nested Route | `<Route path="/" element={<Layout />}><Route path="about" element={<About />} /></Route>` |
| 404 Route | `<Route path="*" element={<NotFound />} />` |
| Index Route | `<Route index element={<Dashboard />} />` |
| Active Link | `<NavLink className={({ isActive }) => isActive ? 'active' : ''}>` |

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Blank page | Missing BrowserRouter | Wrap app with BrowserRouter |
| Links cause full reload | Using `<a>` instead of Link | Use `<Link>` component |
| Active link not working | Missing end prop on root | Add `end` prop to root NavLink |
| useParams returns undefined | Route not defined properly | Check route path definition |
| Nested route not rendering | Missing Outlet | Add `<Outlet />` in parent |

## 📚 Further Reading

| Topic | Link |
|-------|------|
| React Router vs Next.js | https://reactrouter.com/en/main/start/faq |
| Code Splitting with Routes | https://reactrouter.com/en/main/route/lazy |
| Server Rendering | https://reactrouter.com/en/main/guides/ssr |
| Remix vs React Router | https://remix.run/docs/en/main/guides/comparison |

