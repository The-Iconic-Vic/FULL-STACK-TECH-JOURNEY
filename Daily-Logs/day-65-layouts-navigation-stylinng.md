# 📅 Day 65: Layouts, Navigation & Styling

**Date:** June 2, 2026  
**Author:** Victor Innocent (@TheIconicVic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Root Layouts, Nested Layouts, Navigation Components, Active Links, Styling Options

---

## 📋 Learning Objectives

- ✅ Understand root layout vs nested layouts
- ✅ Create layouts that persist across navigation
- ✅ Build a dashboard layout with sidebar
- ✅ Use `Link` component for client-side navigation
- ✅ Implement active link highlighting with `usePathname`
- ✅ Use `useRouter` for programmatic navigation
- ✅ Apply styling with Tailwind CSS and CSS Modules

---

## 🎯 Part 1: Root & Nested Layouts

### What are Layouts?

Layouts are components that **wrap multiple pages** and persist across navigation. Unlike regular components, layouts **do not re-render** when the user navigates between pages.

```tsx
// app/layout.tsx - Root Layout (wraps EVERY page)
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navigation />    {/* Persists across ALL pages */}
        <main>{children}</main>  {/* Page content changes */}
        <Footer />        {/* Persists across ALL pages */}
      </body>
    </html>
  )
}
```

### Root Layout vs Nested Layouts

| Layout Type | Location | Wraps | Persistence |
|-------------|----------|-------|-------------|
| **Root Layout** | `app/layout.tsx` | ALL pages | Never re-renders |
| **Nested Layout** | `app/segment/layout.tsx` | Pages in that segment | Persists within segment |

```tsx
// app/dashboard/layout.tsx - Nested Layout (only for /dashboard/*)
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />       {/* Persists across dashboard pages */}
      <main>{children}</main>  {/* /dashboard, /dashboard/settings, etc. */}
    </div>
  )
}
```

### Layout Hierarchy Example

```
app/
├── layout.tsx              # Root layout (Navbar + Footer)
├── page.tsx                # Uses root layout
├── about/
│   └── page.tsx            # Uses root layout
├── blog/
│   ├── layout.tsx          # Blog layout (sidebar)
│   ├── page.tsx            # Uses blog layout (inside root)
│   └── [slug]/
│       └── page.tsx        # Uses blog layout (inside root)
└── dashboard/
    ├── layout.tsx          # Dashboard layout (sidebar + header)
    ├── page.tsx            # Uses dashboard layout
    └── settings/
        └── page.tsx        # Uses dashboard layout
```

---

## 🔗 Part 2: Navigation

### Link Component

```tsx
import Link from 'next/link'

// Basic usage
<Link href="/about">About</Link>

// With active styling (using usePathname)
'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link href={href} className={isActive ? 'active' : ''}>
      {children}
    </Link>
  )
}

// Replace current history entry (instead of push)
<Link href="/about" replace>About</Link>

// Prefetch (default true, disable for rarely visited pages)
<Link href="/about" prefetch={false}>About</Link>

// External link (use regular <a> tag)
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  External
</a>
```

### useRouter for Programmatic Navigation

```tsx
'use client'
import { useRouter } from 'next/navigation'

function LoginButton() {
  const router = useRouter()
  
  const handleLogin = async () => {
    await login()
    router.push('/dashboard')  // Navigate to dashboard
  }
  
  return <button onClick={handleLogin}>Login</button>
}
```

### useRouter Methods

| Method | Description |
|--------|-------------|
| `router.push(href)` | Navigate to new URL (adds to history) |
| `router.replace(href)` | Navigate replacing current history |
| `router.back()` | Go back one entry |
| `router.forward()` | Go forward one entry |
| `router.refresh()` | Refresh current route (re-fetch data) |
| `router.prefetch(href)` | Prefetch a route |

### redirect() Function (Server Components)

```tsx
// app/page.tsx (Server Component)
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const user = await getCurrentUser()
  
  if (!user) {
    redirect('/login')  // Redirect to login
  }
  
  return <div>Welcome back!</div>
}
```

---

## 🎨 Part 3: Styling Options

### Option 1: Tailwind CSS (Default Setup)

```tsx
// app/page.tsx
export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-blue-600">Hello World</h1>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Click Me
      </button>
    </div>
  )
}
```

### Option 2: CSS Modules

```css
/* styles/Home.module.css */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #2563eb;
}

.button {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
}

.button:hover {
  background-color: #2563eb;
}
```

```tsx
// app/page.tsx
import styles from '@/styles/Home.module.css'

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Hello World</h1>
      <button className={styles.button}>Click Me</button>
    </div>
  )
}
```

### Option 3: Global CSS

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom global styles */
body {
  font-family: 'Inter', sans-serif;
}

.btn-primary {
  @apply bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700;
}
```

```tsx
// Any component can use global classes
<button className="btn-primary">Click Me</button>
```

---

## 🏗️ Part 4: Complete Implementation

### Root Layout with Navigation and Footer

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'Welcome to my portfolio website',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

### Navigation Component with Active Links

```tsx
// components/Navigation.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/contact', label: 'Contact' },
  { href: '/blog', label: 'Blog' },
]

export default function Navigation() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold text-blue-600">
            My Portfolio
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-blue-600 transition ${
                  pathname === item.href
                    ? 'text-blue-600 font-semibold border-b-2 border-blue-600'
                    : 'text-gray-600'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`hover:text-blue-600 transition ${
                  pathname === item.href
                    ? 'text-blue-600 font-semibold'
                    : 'text-gray-600'
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
```

### Footer Component

```tsx
// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; 2026 Victor Innocent. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a href="https://twitter.com/TheIconicVic" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            Twitter
          </a>
          <a href="https://github.com/VictorInnocent" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            GitHub
          </a>
          <a href="https://linkedin.com/in/victor-innocent" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
```

### Dashboard Layout (Nested Layout)

```tsx
// app/dashboard/layout.tsx
import Sidebar from '@/components/Sidebar'
import DashboardNav from '@/components/DashboardNav'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardNav />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
```

### Sidebar Component

```tsx
// components/Sidebar.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
  { href: '/dashboard', label: 'Overview', icon: '📊' },
  { href: '/dashboard/profile', label: 'Profile', icon: '👤' },
  { href: '/dashboard/settings', label: 'Settings', icon: '⚙️' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
      </div>
      <nav className="mt-4">
        {sidebarItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-6 py-3 hover:bg-gray-100 transition ${
              pathname === item.href
                ? 'bg-blue-50 text-blue-600 border-r-4 border-blue-600'
                : 'text-gray-600'
            }`}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
```

### Blog Layout with Sidebar

```tsx
// app/blog/layout.tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Blog Content */}
        <main className="flex-1">{children}</main>
        
        {/* Sidebar */}
        <aside className="md:w-80">
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-lg mb-4">About This Blog</h3>
            <p className="text-gray-600 text-sm">
              I document my journey as a developer, sharing insights and lessons learned.
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6 mt-6">
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>Next.js</li>
              <li>TypeScript</li>
              <li>React</li>
              <li>Web Development</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  )
}
```

---

## 📊 Quick Reference

| Concept | Syntax |
|---------|--------|
| Root Layout | `app/layout.tsx` |
| Nested Layout | `app/segment/layout.tsx` |
| Client Navigation | `<Link href="/path">` |
| Active Link | `usePathname()` |
| Programmatic Nav | `useRouter().push()` |
| Server Redirect | `redirect()` |
| Tailwind Classes | `className="..."` |
| CSS Modules | `import styles from './file.module.css'` |

---

## ✅ Day 65 Checklist

- [ ] Understand root layout vs nested layouts
- [ ] Create Navigation component with `Link`
- [ ] Implement active link highlighting with `usePathname`
- [ ] Add mobile hamburger menu
- [ ] Create Footer component
- [ ] Build nested dashboard layout with sidebar
- [ ] Build nested blog layout with sidebar
- [ ] Apply Tailwind CSS for styling
- [ ] Use CSS Modules for component-specific styles
- [ ] Test layout persistence across navigation
- [ ] Push code to GitHub


