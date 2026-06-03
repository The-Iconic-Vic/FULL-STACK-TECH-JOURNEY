# 📘 Server & Client Components in Next.js

## 🎯 Core Concept

Next.js 14 introduces a new mental model for React components. By default, **every component is a Server Component** unless explicitly marked otherwise with `'use client'`. This represents a fundamental shift from traditional React where everything runs in the browser.

---

## 🖥️ Server Components

### Definition

Server Components are React components that execute **exclusively on the server** during rendering. They never send their source code or logic to the client.

```tsx
// This is a Server Component (no directive needed)
export default async function ServerComponent() {
  // This code NEVER reaches the browser
  const data = await db.query('SELECT * FROM users')
  return <div>{data.map(user => <UserCard key={user.id} user={user} />)}</div>
}
```

### Key Characteristics

| Characteristic | Description |
|----------------|-------------|
| **Execution Environment** | Server only (Node.js runtime) |
| **Bundle Size** | Zero bytes sent to client |
| **Code Accessibility** | Server-only code, never exposed |
| **Data Fetching** | Direct database/API access |
| **Rendering** | Generates HTML on the server |
| **Hydration** | Not interactive, no hydration |

### What Server Components CAN Do

```tsx
// ✅ Direct database access
import { db } from '@/lib/db'
const users = await db.user.findMany()

// ✅ File system operations
import { readFile } from 'fs/promises'
const content = await readFile('./data.txt', 'utf-8')

// ✅ Access environment variables (server-only)
const apiKey = process.env.SECRET_API_KEY

// ✅ Use async/await for data fetching
const data = await fetch('https://api.example.com/data')

// ✅ Import server-only modules
import serverOnlyModule from '@/lib/server-utils'

// ✅ Render other Server Components
return <OtherServerComponent />

// ✅ Pass data to Client Components
return <ClientComponent data={serverData} />
```

### What Server Components CANNOT Do

```tsx
// ❌ React hooks that require state
import { useState, useEffect, useReducer } from 'react'

// ❌ Browser APIs
window.localStorage
document.querySelector
navigator.geolocation

// ❌ Event handlers
<button onClick={() => console.log('clicked')}>

// ❌ Context providers (but can consume on client)
<ThemeProvider>

// ❌ useRouter from next/navigation
import { useRouter } from 'next/navigation'

// ❌ Custom hooks that use client features
function useWindowSize() { ... }
```

---

## 🎨 Client Components

### Definition

Client Components are traditional React components that run on both the server (for initial HTML) and the client (for interactivity). They must be explicitly marked with the `'use client'` directive.

```tsx
// app/components/InteractiveWidget.tsx
'use client'  // MUST be the first line in the file

import { useState } from 'react'

export default function InteractiveWidget() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <button onClick={() => setIsOpen(!isOpen)}>
      {isOpen ? 'Close' : 'Open'}
    </button>
  )
}
```

### When to Use Client Components

| Scenario | Example |
|----------|---------|
| **Interactive UI Elements** | Buttons, forms, dropdowns, modals, tabs |
| **State Management** | useState, useReducer, Zustand, Redux |
| **Lifecycle Effects** | useEffect for side effects |
| **Browser APIs** | localStorage, sessionStorage, IndexedDB |
| **Event Listeners** | onClick, onChange, onScroll, onKeyDown |
| **Custom Hooks with Client Features** | useWindowSize, useLocalStorage, useMediaQuery |
| **React Context Consumers** | ThemeContext, AuthContext |
| **Third-party Libraries** | Framer Motion, React Query (for client fetching) |

### Performance Characteristics

```tsx
// ✅ GOOD - Only the interactive part is a Client Component
// app/page.tsx (Server Component)
import ClientSearch from './ClientSearch'

export default async function Page() {
  const data = await fetchData()
  return (
    <div>
      <ServerRenderedContent data={data} />
      <ClientSearch />  {/* Only this is sent to client */}
    </div>
  )
}

// ❌ BAD - Entire page becomes Client Component
'use client'
import { useState } from 'react'

export default function Page() {
  // All code now in client bundle
  // Larger bundle size, slower initial load
}
```

---

## 🧩 Component Composition Pattern

### The Principle: Push Interactivity Down

Keep parent components on the server. Wrap only the interactive leaf components as Client Components.

```tsx
// app/products/page.tsx (Server Component)
import ClientFilterBar from './ClientFilterBar'
import ServerProductList from './ServerProductList'
import ClientCartButton from './ClientCartButton'

export default async function ProductsPage() {
  const products = await getProducts()
  const categories = await getCategories()
  
  return (
    <div>
      <h1>Products</h1>
      
      {/* Interactive filter - Client Component */}
      <ClientFilterBar categories={categories} />
      
      {/* Static product list - Server Component */}
      <ServerProductList products={products} />
      
      {/* Interactive button per product - Client Component */}
      {products.map(product => (
        <div key={product.id}>
          <span>{product.name}</span>
          <ClientCartButton productId={product.id} />
        </div>
      ))}
    </div>
  )
}
```

### Passing Data from Server to Client

```tsx
// app/page.tsx (Server Component)
import ClientDashboard from './ClientDashboard'

export default async function Page() {
  // Fetch data on the server
  const user = await getUser()
  const permissions = await getPermissions()
  const initialSettings = await getSettings()
  
  // Pass as props to Client Component
  return (
    <ClientDashboard 
      user={user}
      permissions={permissions}
      initialSettings={initialSettings}
    />
  )
}
```

```tsx
// app/ClientDashboard.tsx
'use client'

import { useState } from 'react'

interface DashboardProps {
  user: User
  permissions: string[]
  initialSettings: Settings
}

export default function ClientDashboard({ 
  user, 
  permissions, 
  initialSettings 
}: DashboardProps) {
  const [settings, setSettings] = useState(initialSettings)
  
  return (
    <div>
      <h1>Welcome, {user.name}</h1>
      {/* Interactive dashboard with server-fetched data */}
    </div>
  )
}
```

### Server Component with Client Children

```tsx
// app/layout.tsx (Server Component)
import ClientNavbar from './ClientNavbar'
import ClientThemeProvider from './ClientThemeProvider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {/* Client Component can wrap server children */}
        <ClientThemeProvider>
          <ClientNavbar />
          {children}  {/* Can be Server or Client */}
        </ClientThemeProvider>
      </body>
    </html>
  )
}
```

---

## 🔄 Hydration

### What is Hydration?

Hydration is the process where React attaches event listeners to server-rendered HTML on the client, making it interactive.

```tsx
// Flow:
// 1. Server renders HTML → sent to browser
// 2. Browser displays HTML immediately (visible content)
// 3. React downloads and runs client JavaScript
// 4. React "hydrates" the HTML (attaches event listeners)
// 5. Page becomes interactive
```

### Hydration Mismatch

Occurs when the server-rendered HTML doesn't match the client's initial render.

```tsx
// ❌ CAUSES HYDRATION MISMATCH
'use client'

export default function BadComponent() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Server renders: false, Client renders: true
  return <div>{isClient ? 'Client' : 'Server'}</div>
}

// ✅ FIX - Match server and client output
'use client'

export default function GoodComponent() {
  const [isClient, setIsClient] = useState(false)
  
  useEffect(() => {
    setIsClient(true)
  }, [])
  
  // Don't render until client is ready
  if (!isClient) return null
  
  return <div>Client Only Content</div>
}
```

### Common Hydration Mismatch Causes

| Cause | Solution |
|-------|----------|
| Using `window` or `localStorage` in render | Use useEffect to defer |
| Random values (Date.now, Math.random) | Generate on server or use useEffect |
| Different browser/device detection | Check in useEffect, not render |
| Third-party scripts modifying DOM | Use useEffect or suppressHydrationWarning |

---

## 📁 Best Practices

### Do's

```tsx
// ✅ DO: Fetch data directly in Server Components
export default async function Page() {
  const data = await db.query('SELECT * FROM posts')
  return <PostList posts={data} />
}

// ✅ DO: Keep Client Components small and focused
'use client'
export default function LikeButton({ postId }) {
  const [liked, setLiked] = useState(false)
  return <button onClick={() => setLiked(!liked)}>Like</button>
}

// ✅ DO: Pass server data as props to client
export default async function Page() {
  const user = await getUser()
  return <ClientProfile user={user} />
}

// ✅ DO: Use Suspense for loading states
<Suspense fallback={<Loading />}>
  <ServerComponentThatFetches />
</Suspense>
```

### Don'ts

```tsx
// ❌ DON'T: Fetch data in Client Components (use SWR/React Query instead)
'use client'
export default function BadComponent() {
  const [data, setData] = useState(null)
  useEffect(() => {
    fetch('/api/data').then(res => res.json()).then(setData)
  }, [])
  return <div>{data}</div>
}

// ❌ DON'T: Make entire layout client if only small part needs interactivity
'use client'
export default function Layout({ children }) {
  // This makes ALL children client components too
  return <div>{children}</div>
}

// ❌ DON'T: Use 'use client' unnecessarily
export default function StaticComponent() {
  // This doesn't need 'use client'
  return <div>Static content</div>
}
```

---

## 📊 Comparison Table

| Feature | Server Component | Client Component |
|---------|-----------------|------------------|
| **Directive** | None (default) | `'use client'` |
| **Runs On** | Server only | Server + Client (hydrates) |
| **Bundle Size** | 0 bytes to client | Full bundle to client |
| **Data Fetching** | Direct (async/await) | Via API (useEffect or library) |
| **Database Access** | Direct | Via API route |
| **Environment Variables** | Any (including secret) | Only NEXT_PUBLIC_ prefixed |
| **React Hooks** | ❌ No | ✅ Yes (useState, useEffect, etc.) |
| **Event Handlers** | ❌ No | ✅ Yes (onClick, onChange) |
| **Browser APIs** | ❌ No | ✅ Yes (localStorage, window) |
| **SEO** | Excellent | Poor without SSR |
| **Initial Load** | Faster (full HTML) | Slower (empty shell) |
| **Interactivity** | None | Full |

---

## 🚀 Advanced Patterns

### Parallel Data Fetching

```tsx
// app/dashboard/page.tsx
export default async function DashboardPage() {
  // Fetch in parallel
  const [user, posts, analytics] = await Promise.all([
    getUser(),
    getPosts(),
    getAnalytics(),
  ])
  
  return <ClientDashboard user={user} posts={posts} analytics={analytics} />
}
```

### Streaming with Suspense

```tsx
// app/dashboard/page.tsx
import { Suspense } from 'react'
import ClientAnalytics from './ClientAnalytics'
import ServerUserProfile from './ServerUserProfile'
import LoadingSkeleton from './LoadingSkeleton'

export default async function DashboardPage() {
  return (
    <div>
      <Suspense fallback={<LoadingSkeleton />}>
        <ServerUserProfile />
      </Suspense>
      
      <Suspense fallback={<LoadingSkeleton />}>
        <ClientAnalytics />
      </Suspense>
    </div>
  )
}
```

### Context Providers (Client Only)

```tsx
// app/ClientThemeProvider.tsx
'use client'

import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export function ClientThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
```

---

## 🎯 Key Takeaways

| Takeaway | Explanation |
|----------|-------------|
| **Default is Server** | All components are Server unless marked `'use client'` |
| **Server = No Interactivity** | Can't use useState, useEffect, or event handlers |
| **Client = Interactivity** | Add `'use client'` for hooks and browser APIs |
| **Push Interactivity Down** | Keep parent Server, make only interactive children Client |
| **Pass Data as Props** | Server fetches data, passes to Client components |
| **Bundle Size Matters** | Every Client Component adds to client bundle |
| **Hydration Requires Match** | Server and client output must match |

