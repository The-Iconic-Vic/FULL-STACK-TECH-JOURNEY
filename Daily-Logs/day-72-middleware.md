# 📅 Day 72: Middleware

**Date:** June 9, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Middleware, Authentication, Route Protection, Request/Response Transformation, Edge Runtime

---

## 📋 Learning Objectives

- ✅ Create middleware.ts at the root of the project
- ✅ Use NextRequest and NextResponse for request/response handling
- ✅ Configure matcher to specify which routes trigger middleware
- ✅ Implement authentication checks using cookies
- ✅ Redirect unauthenticated users to login page
- ✅ Add security headers to all responses
- ✅ Implement request logging and rate limiting

---

## 🎯 Part 1: Middleware Basics

### What is Middleware?

Middleware is code that runs **before a request completes**. It can inspect, modify, or respond to requests before they reach your pages or API routes.

```ts
// middleware.ts at the root of your project
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Runs for every matched route
  console.log(`[${request.method}] ${request.nextUrl.pathname}`)
  
  return NextResponse.next() // Continue to the page
}
```

### When Middleware Runs

Middleware runs **before**:
- Pages (Server and Client Components)
- API routes
- Static files (if configured)
- `next/image` optimization

Middleware runs **after**:
- `next.config.ts` redirects/rewrites

### Middleware File Location

```
project-root/
├── app/
├── public/
├── middleware.ts    # ← Must be at root level, NOT inside app/
├── next.config.ts
└── package.json
```

---

## 🔧 Part 2: NextRequest and NextResponse

### NextRequest Properties

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // URL information
  const url = request.nextUrl
  const pathname = url.pathname
  const searchParams = url.searchParams
  const origin = url.origin
  
  // Headers
  const userAgent = request.headers.get('user-agent')
  const referer = request.headers.get('referer')
  
  // Cookies
  const token = request.cookies.get('auth-token')
  const allCookies = request.cookies.getAll()
  
  // IP Address (may be forwarded)
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  
  // Method
  const method = request.method
  
  console.log(`${method} ${pathname} - IP: ${ip}`)
  
  return NextResponse.next()
}

export const config = {
  matcher: '/:path*', // Run on all routes
}
```

### NextResponse Methods

| Method | Purpose |
|--------|---------|
| `NextResponse.next()` | Continue to the requested page |
| `NextResponse.redirect(url)` | Redirect to another URL |
| `NextResponse.rewrite(url)` | Show different content without changing URL |
| `NextResponse.json(data)` | Return JSON response directly |

```ts
// Examples
export function middleware(request: NextRequest) {
  // Continue normally
  return NextResponse.next()
  
  // Redirect to login
  return NextResponse.redirect(new URL('/login', request.url))
  
  // Rewrite (show /content but URL stays /old-path)
  return NextResponse.rewrite(new URL('/content', request.url))
  
  // Return JSON directly (stops middleware chain)
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}
```

### Adding Headers and Cookies

```ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  
  // Set a cookie
  response.cookies.set('last-visit', Date.now().toString(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: '/',
  })
  
  return response
}
```

---

## 🗺️ Part 3: Matcher Configuration

### Basic Matcher

```ts
// middleware.ts
export const config = {
  matcher: '/dashboard/:path*', // Only run on /dashboard and subpaths
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

### Excluding Routes

```ts
// Run on all routes except certain paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder
     * - api/auth (auth API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)',
  ],
}
```

### Positive and Negative Lookahead

```ts
// Run on all routes except login and public assets
export const config = {
  matcher: ['/((?!login|_next/static|favicon.ico).*)'],
}
```

### Match Exact Routes

```ts
export const config = {
  matcher: [
    '/dashboard',           // Exact match
    '/dashboard/:path*',    // All subpaths
    '/api/:path*',          // All API routes
    '/:path*/:path*',       // Two-level dynamic
  ],
}
```

---

## 🔐 Part 4: Authentication Middleware

### Complete Auth Middleware

```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Define protected routes
const protectedRoutes = [
  '/dashboard',
  '/dashboard/:path*',
  '/admin',
  '/admin/:path*',
  '/api/protected/:path*',
]

// Define auth routes (redirect to dashboard if already logged in)
const authRoutes = ['/login', '/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Check for auth token in cookies
  const token = request.cookies.get('auth-token')?.value
  const isAuthenticated = !!token
  
  // Check if current route is protected
  const isProtectedRoute = protectedRoutes.some(route => {
    if (route.endsWith(':path*')) {
      const baseRoute = route.replace('/:path*', '')
      return pathname === baseRoute || pathname.startsWith(baseRoute + '/')
    }
    return pathname === route
  })
  
  // Check if current route is auth route
  const isAuthRoute = authRoutes.includes(pathname)
  
  // Case 1: Protected route but not authenticated → redirect to login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }
  
  // Case 2: Auth route but already authenticated → redirect to dashboard
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }
  
  // Add security headers to all responses
  const response = NextResponse.next()
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico (favicon)
     * - public folder
     * - api/auth (auth API routes)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth).*)',
  ],
}
```

### Role-Based Authorization

```ts
// middleware.ts with role checking
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Get token and user info from cookie
  const token = request.cookies.get('auth-token')?.value
  const userRole = request.cookies.get('user-role')?.value
  
  // Admin routes require admin role
  if (pathname.startsWith('/admin')) {
    if (!token || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/unauthorized', request.url))
    }
  }
  
  // Dashboard routes require any authenticated user
  if (pathname.startsWith('/dashboard') && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}
```

---

## ⚡ Part 5: Advanced Middleware Patterns

### Request Logging

```ts
// middleware.ts
export function middleware(request: NextRequest) {
  const { method, nextUrl } = request
  const { pathname, search } = nextUrl
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  const userAgent = request.headers.get('user-agent') || 'unknown'
  
  console.log(`[${new Date().toISOString()}] ${method} ${pathname}${search} - IP: ${ip} - UA: ${userAgent.slice(0, 50)}`)
  
  return NextResponse.next()
}
```

### Security Headers

```ts
// middleware.ts
export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  
  // Comprehensive security headers
  const securityHeaders = {
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
    'Content-Security-Policy': "default-src 'self'",
  }
  
  for (const [key, value] of Object.entries(securityHeaders)) {
    response.headers.set(key, value)
  }
  
  return response
}
```

### Rate Limiting at Edge

```ts
// lib/rate-limit.ts
interface RateLimitStore {
  [key: string]: number[]
}

const store: RateLimitStore = {}

export function rateLimit(ip: string, limit: number = 10, window: number = 60000) {
  const now = Date.now()
  const windowStart = now - window
  
  if (!store[ip]) {
    store[ip] = []
  }
  
  // Clean old requests
  store[ip] = store[ip].filter(timestamp => timestamp > windowStart)
  
  // Check limit
  if (store[ip].length >= limit) {
    return false
  }
  
  // Add current request
  store[ip].push(now)
  return true
}
```

```ts
// middleware.ts with rate limiting
import { rateLimit } from '@/lib/rate-limit'

export function middleware(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown'
  
  // Rate limit API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const allowed = rateLimit(ip, 20, 60000) // 20 requests per minute
    
    if (!allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }
  }
  
  return NextResponse.next()
}
```

### Geocoding and Localization

```ts
// middleware.ts for geolocation
export function middleware(request: NextRequest) {
  const country = request.geo?.country || 'US'
  const city = request.geo?.city || 'Unknown'
  
  // Redirect based on country
  if (country === 'NG') {
    return NextResponse.redirect(new URL('/ng', request.url))
  }
  
  // Set locale cookie
  const response = NextResponse.next()
  response.cookies.set('country', country)
  
  return response
}
```

### A/B Testing

```ts
// middleware.ts for A/B testing
export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('ab-test')
  let variant = cookie?.value
  
  // Assign variant if not present
  if (!variant) {
    variant = Math.random() < 0.5 ? 'A' : 'B'
  }
  
  const response = NextResponse.next()
  response.cookies.set('ab-test', variant)
  
  // Rewrite to variant-specific page
  if (request.nextUrl.pathname === '/') {
    return NextResponse.rewrite(new URL(`/variants/${variant}`, request.url))
  }
  
  return response
}
```

### Bot Detection

```ts
// middleware.ts for bot detection
const botUserAgents = [
  'Googlebot', 'Bingbot', 'Slurp', 'DuckDuckBot',
  'baiduspider', 'yandexbot', 'facebookexternalhit',
  'Twitterbot', 'LinkedInBot', 'Applebot'
]

export function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || ''
  const isBot = botUserAgents.some(bot => userAgent.includes(bot))
  
  if (isBot) {
    console.log(`Bot detected: ${userAgent.slice(0, 100)}`)
    // Optionally return simplified content
  }
  
  return NextResponse.next()
}
```

---

## 🏗️ Part 6: Complete Authentication Middleware Implementation

### Login Page with Cookie Setting

```tsx
// app/login/actions.ts
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const email = formData.get('email')
  const password = formData.get('password')
  
  // Validate credentials (simplified for demo)
  if (email === 'user@example.com' && password === 'password') {
    // Set auth cookie
    const cookieStore = await cookies()
    cookieStore.set('auth-token', 'mock-jwt-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    })
    
    cookieStore.set('user-role', 'user', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    })
    
    redirect('/dashboard')
  }
  
  return { error: 'Invalid credentials' }
}

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.delete('auth-token')
  cookieStore.delete('user-role')
  redirect('/login')
}
```

```tsx
// app/login/page.tsx
import { login } from './actions'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')
  
  // If already logged in, redirect to dashboard
  if (token) {
    redirect('/dashboard')
  }
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <h1 className="text-3xl font-bold mb-8">Login</h1>
      
      <form action={login} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            defaultValue="user@example.com"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Password</label>
          <input
            type="password"
            name="password"
            defaultValue="password"
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
        
        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Login
        </button>
      </form>
      
      <p className="text-sm text-gray-500 mt-4 text-center">
        Demo credentials: user@example.com / password
      </p>
    </div>
  )
}
```

### Dashboard Page

```tsx
// app/dashboard/page.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { LogoutButton } from '@/components/LogoutButton'

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const token = cookieStore.get('auth-token')
  
  if (!token) {
    redirect('/login')
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <LogoutButton />
      </div>
      
      <div className="bg-green-100 text-green-700 p-4 rounded-lg">
        ✅ You are authenticated! This protected content is only visible to logged-in users.
      </div>
      
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Profile</h2>
          <p className="text-gray-600">Manage your personal information</p>
          <a href="/dashboard/profile" className="text-blue-600 mt-2 inline-block">
            Go to Profile →
          </a>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">Settings</h2>
          <p className="text-gray-600">Configure your preferences</p>
          <a href="/dashboard/settings" className="text-blue-600 mt-2 inline-block">
            Go to Settings →
          </a>
        </div>
      </div>
    </div>
  )
}
```

---

## 📊 Quick Reference

### Middleware API

| Function | Purpose |
|----------|---------|
| `NextResponse.next()` | Continue to requested page |
| `NextResponse.redirect(url)` | Redirect to another URL |
| `NextResponse.rewrite(url)` | Show different content, keep URL |
| `NextResponse.json(data)` | Return JSON response |

### NextRequest Properties

| Property | Description |
|----------|-------------|
| `nextUrl.pathname` | Request path |
| `nextUrl.searchParams` | Query parameters |
| `cookies` | Cookie store |
| `headers` | Request headers |
| `geo` | Geolocation data |
| `ip` | IP address (deprecated) |
| `method` | HTTP method |

### Matcher Patterns

| Pattern | Matches |
|---------|---------|
| `/dashboard/:path*` | /dashboard, /dashboard/settings, etc. |
| `/api/:path*` | All API routes |
| `/blog/:slug` | /blog/post-1, /blog/hello-world |
| `/((?!api/auth).*)` | All except /api/auth |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| Middleware not running | Wrong file location | Place at project root, not in app/ |
| Infinite redirect | Auth check redirecting to itself | Ensure login page is not protected |
| Cookies not accessible | Missing config | Use `request.cookies` not `document.cookie` |
| Headers not applied | Wrong response type | Apply headers to the returned response |
| Performance issues | Too many operations | Keep middleware lightweight, use matcher |
| Edge runtime errors | Using Node.js APIs | Use Edge-compatible APIs only |

---

## ✅ Day 72 Checklist

- [ ] Create `middleware.ts` at project root
- [ ] Configure `matcher` for protected routes
- [ ] Implement authentication check using cookies
- [ ] Redirect unauthenticated users to `/login`
- [ ] Redirect authenticated users away from `/login`
- [ ] Add security headers to all responses
- [ ] Implement request logging
- [ ] Add role-based protection for admin routes
- [ ] Test middleware locally
- [ ] Push code to GitHub

