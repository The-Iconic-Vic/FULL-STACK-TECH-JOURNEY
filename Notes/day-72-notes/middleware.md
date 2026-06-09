# 📘 Middleware in Next.js

## 🎯 What is Middleware?

Middleware is code that executes **before a request completes**. It runs on the Edge Runtime and can intercept, modify, or respond to requests before they reach your pages, API routes, or static files.

```ts
// middleware.ts at project root (NOT inside app/)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Runs before every matched request
  console.log(`Request to: ${request.nextUrl.pathname}`)
  return NextResponse.next()
}
```

---

## 📁 Part 1: Middleware Fundamentals

### File Location

Middleware must be placed at the **root of your project**, not inside the `app` directory.

```
project-root/
├── app/
├── public/
├── middleware.ts    # ← Here
├── next.config.ts
└── package.json
```

### Execution Order

```
Request → next.config.ts (redirects/rewrites) → Middleware → Route/Page
```

### Edge Runtime

Middleware runs on the Edge Runtime, which has different APIs than Node.js. It supports:

- `fetch` API
- `Request` and `Response` objects
- Web standard APIs
- Limited Node.js compatibility

---

## 🔧 Part 2: NextRequest and NextResponse

### NextRequest Properties

```ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // URL information
  const { pathname, search, origin } = request.nextUrl
  const searchParams = request.nextUrl.searchParams
  
  // Headers
  const userAgent = request.headers.get('user-agent')
  const referer = request.headers.get('referer')
  const ip = request.headers.get('x-forwarded-for')
  
  // Cookies
  const token = request.cookies.get('auth-token')
  const allCookies = request.cookies.getAll()
  
  // Method
  const method = request.method
  
  // Geolocation (Edge only)
  const country = request.geo?.country
  const city = request.geo?.city
  
  return NextResponse.next()
}
```

### NextResponse Methods

| Method | Description |
|--------|-------------|
| `NextResponse.next()` | Continue to the requested route |
| `NextResponse.redirect(url)` | Redirect to another URL (302 by default) |
| `NextResponse.rewrite(url)` | Show content from another URL, keep original URL |
| `NextResponse.json(data, options)` | Return JSON response directly |

```ts
// Continue
return NextResponse.next()

// Redirect
return NextResponse.redirect(new URL('/login', request.url))

// Rewrite (URL stays /old but shows /new content)
return NextResponse.rewrite(new URL('/new', request.url))

// Direct JSON response
return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
```

### Adding Headers and Cookies

```ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Add headers
  response.headers.set('X-Custom-Header', 'value')
  response.headers.set('X-Frame-Options', 'DENY')
  
  // Set cookie
  response.cookies.set('session', 'value', {
    httpOnly: true,
    secure: true,
    maxAge: 60 * 60 * 24,
    path: '/',
  })
  
  // Delete cookie
  response.cookies.delete('old-cookie')
  
  return response
}
```

---

## 🗺️ Part 3: Matcher Configuration

### Basic Matcher

```ts
export const config = {
  matcher: '/dashboard/:path*',  // Only runs on /dashboard and subpaths
}
```

### Multiple Matchers

```ts
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/api/protected/:path*',
  ],
}
```

### Excluding Routes with Negative Lookahead

```ts
// Run on all routes EXCEPT those matching the pattern
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)',
  ],
}
```

### Matcher Syntax

| Pattern | Matches |
|---------|---------|
| `/dashboard` | Exact match |
| `/dashboard/:path*` | /dashboard, /dashboard/settings, /dashboard/profile/123 |
| `/api/:path*` | /api/users, /api/posts/1 |
| `/blog/:slug` | /blog/post-1, /blog/hello-world |
| `/:path*/:path*` | Two-level dynamic routes |

---

## 🔐 Part 4: Authentication Middleware

### Basic Auth Middleware

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const protectedRoutes = ['/dashboard', '/dashboard/:path*']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value
  const isAuthenticated = !!token
  
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route.endsWith(':path*')) {
      const base = route.replace('/:path*', '')
      return pathname === base || pathname.startsWith(base + '/')
    }
    return pathname === route
  })
  
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
```

### Role-Based Authorization

```ts
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value
  const userRole = request.cookies.get('user-role')?.value
  
  // Admin routes protection
  if (pathname.startsWith('/admin')) {
    if (!token || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  return NextResponse.next()
}
```

### Login Page Redirection (Already Authenticated)

```ts
// Redirect logged-in users away from login page
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value
  
  if (authRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  return NextResponse.next()
}
```

---

## ⚡ Part 5: Advanced Patterns

### Security Headers

```ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  const headers = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
    'Content-Security-Policy': "default-src 'self'",
  }
  
  for (const [key, value] of Object.entries(headers)) {
    response.headers.set(key, value)
  }
  
  return response
}
```

### Request Logging

```ts
export function middleware(request: NextRequest) {
  const { method, nextUrl } = request
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  console.log(`[${new Date().toISOString()}] ${method} ${nextUrl.pathname} - ${ip}`)
  
  return NextResponse.next()
}
```

### Rate Limiting (Edge)

```ts
// lib/rate-limit.ts
interface Store {
  [key: string]: number[]
}

const store: Store = {}

export function rateLimit(ip: string, limit: number = 10, windowMs: number = 60000) {
  const now = Date.now()
  const windowStart = now - windowMs
  
  if (!store[ip]) store[ip] = []
  store[ip] = store[ip].filter(t => t > windowStart)
  
  if (store[ip].length >= limit) return false
  
  store[ip].push(now)
  return true
}
```

```ts
// middleware.ts
import { rateLimit } from '@/lib/rate-limit'

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const allowed = rateLimit(ip, 20, 60000)
    
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests' },
        { status: 429 }
      )
    }
  }
  
  return NextResponse.next()
}
```

### Geolocation

```ts
export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US'
  
  // Country-specific redirect
  if (country === 'NG') {
    return NextResponse.redirect(new URL('/ng', request.url))
  }
  
  // Set country cookie
  const response = NextResponse.next()
  response.cookies.set('country', country)
  
  return response
}
```

### A/B Testing

```ts
export function middleware(request: NextRequest) {
  const variant = request.cookies.get('ab-test')?.value || (Math.random() < 0.5 ? 'A' : 'B')
  
  const response = NextResponse.next()
  response.cookies.set('ab-test', variant)
  
  // Rewrite home page to variant-specific version
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL(`/variants/${variant}`, request.url))
  }
  
  return response
}
```

---

## 📊 Quick Reference

### Middleware API Summary

| Concept | Syntax |
|---------|--------|
| Continue | `NextResponse.next()` |
| Redirect | `NextResponse.redirect(url)` |
| Rewrite | `NextResponse.rewrite(url)` |
| JSON response | `NextResponse.json(data, { status })` |
| Get cookie | `request.cookies.get('name')` |
| Set cookie | `response.cookies.set('name', 'value', options)` |
| Get header | `request.headers.get('name')` |
| Set header | `response.headers.set('name', 'value')` |

### Matcher Patterns

| Pattern | Description |
|---------|-------------|
| `/dashboard` | Exact match |
| `/dashboard/:path*` | Route and all subpaths |
| `/api/:path*` | All API routes |
| `/:path*/:path*` | Two-level dynamic |
| `/((?!exclude).*)` | Exclude specific patterns |

### Edge Runtime Limitations

| Supported | Not Supported |
|-----------|---------------|
| `fetch` | `fs` (file system) |
| `Request`/`Response` | `path` module |
| Web APIs | `crypto` Node.js methods |
| `TextEncoder`/`TextDecoder` | `process.cwd()` |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Middleware not running | Wrong file location | Place at project root, NOT in app/ |
| Infinite redirect | Auth route also protected | Ensure login route is excluded |
| Cookies undefined | Wrong access method | Use `request.cookies.get()` |
| Edge runtime error | Using Node.js API | Use Edge-compatible alternatives |
| Performance issues | Heavy computation | Keep middleware lightweight |

---

## 🔑 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Middleware runs before requests** | Intercept before pages/API routes |
| **Place at project root** | NOT inside app/ directory |
| **Use matcher to limit routes** | Prevents unnecessary execution |
| **Edge Runtime only** | No Node.js specific APIs |
| **Authentication is primary use case** | Protect routes, check cookies |
| **Can add security headers globally** | Apply to all responses |
| **Use rewrite for A/B testing** | Show different content, same URL |

