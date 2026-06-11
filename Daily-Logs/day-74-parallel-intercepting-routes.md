# 📅 Day 74: Parallel & Intercepting Routes

**Date:** June 11, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Parallel Routes, Slots, Intercepting Routes, Modal Pattern, Conditional Routes

---

## 📋 Learning Objectives

- ✅ Use parallel routes with `@folder` convention for multiple page slots
- ✅ Render multiple pages simultaneously on the same layout
- ✅ Implement independent navigation per slot
- ✅ Use `default.tsx` for conditional routes
- ✅ Intercept routes at different levels using `(.)`, `(..)`, `(...)` syntax
- ✅ Build modal pattern combining parallel and intercepting routes

---

## 🎯 Part 1: Parallel Routes

### What are Parallel Routes?

Parallel routes allow you to render **multiple pages simultaneously** within the same layout. Each slot acts as an independent navigation stream.

```tsx
// app/layout.tsx
export default function Layout({
  children,
  sidebar,
  analytics,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode    // @sidebar slot
  analytics: React.ReactNode  // @analytics slot
}) {
  return (
    <div className="flex">
      <aside>{sidebar}</aside>
      <main>{children}</main>
      <aside>{analytics}</aside>
    </div>
  )
}
```

### Slot Convention

Slots are folders prefixed with `@`. They are **not URL segments** - they don't affect the path.

```
app/
├── @sidebar/           # Slot (not a route)
│   └── page.tsx
├── @analytics/         # Slot (not a route)
│   └── page.tsx
├── page.tsx            # Main content
└── layout.tsx          # Renders all slots
```

### Slot Page Example

```tsx
// app/@sidebar/page.tsx
import { Sidebar } from '@/components/Sidebar'

export default function SidebarSlot() {
  return <Sidebar />
}
```

```tsx
// app/@analytics/page.tsx
import { AnalyticsWidget } from '@/components/AnalyticsWidget'

export default function AnalyticsSlot() {
  return <AnalyticsWidget />
}
```

### Independent Navigation

Each slot can have its own navigation state. Navigating within a slot doesn't affect other slots.

```tsx
// app/@sidebar/page.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SidebarSlot() {
  const pathname = usePathname()
  
  return (
    <nav className="space-y-2">
      <Link 
        href="/dashboard" 
        className={pathname === '/dashboard' ? 'active' : ''}
      >
        Dashboard
      </Link>
      <Link 
        href="/settings" 
        className={pathname === '/settings' ? 'active' : ''}
      >
        Settings
      </Link>
      <Link 
        href="/profile" 
        className={pathname === '/profile' ? 'active' : ''}
      >
        Profile
      </Link>
    </nav>
  )
}
```

---

## 🔧 Part 2: Conditional Routes with default.tsx

### The Problem

When navigating to a route, all slots need content. If a slot doesn't have a matching file, Next.js throws a 404.

```tsx
// Navigating to /settings
// app/settings/page.tsx exists for children ✅
// app/@sidebar/settings/page.tsx ??? ❌ Missing → 404 error
```

### Solution: default.tsx

`default.tsx` provides a fallback for slots that don't have matching routes.

```tsx
// app/@sidebar/default.tsx
export default function SidebarDefault() {
  // Renders when no specific sidebar page exists
  return <div className="p-4 bg-gray-50">Default Sidebar</div>
}
```

```tsx
// app/@analytics/default.tsx
export default function AnalyticsDefault() {
  // Renders when no specific analytics page exists
  return <div className="p-4 bg-gray-50">Default Analytics</div>
}
```

### Conditional Slot Rendering

```tsx
// app/layout.tsx
export default function Layout({
  children,
  sidebar,
  analytics,
}: {
  children: React.ReactNode
  sidebar: React.ReactNode
  analytics: React.ReactNode
}) {
  return (
    <div className="flex gap-6">
      {/* Always show sidebar */}
      <aside className="w-64">{sidebar}</aside>
      
      {/* Main content */}
      <main className="flex-1">{children}</main>
      
      {/* Conditionally show analytics on dashboard only */}
      {sidebar ? <aside className="w-80">{analytics}</aside> : null}
    </div>
  )
}
```

---

## 🎨 Part 3: Intercepting Routes

### What are Intercepting Routes?

Intercepting routes allow you to **load a route from a different context** while keeping the current page in the background. Perfect for modals.

### Interception Conventions

| Convention | Matches |
|------------|---------|
| `(.)` | Same level directory |
| `(..)` | One level up |
| `(..)(..)` | Two levels up |
| `(...)` | Root level |

### Visual Example

```
Directory structure:
app/
├── photos/
│   └── [id]/
│       └── page.tsx         # /photos/123
├── feed/
│   └── [id]/
│       └── page.tsx         # /feed/123
└── @modal/
    ├── (.)photos/
    │   └── [id]/
    │       └── page.tsx     # Intercepts /photos/123 from /photos
    └── (..)feed/
        └── [id]/
            └── page.tsx     # Intercepts /feed/123 from /
```

### Interception Examples

```tsx
// Intercept /photos/123 when on /photos page
// Location: app/@modal/(.)photos/[id]/page.tsx

// Intercept /feed/123 when on home page (one level up)
// Location: app/@modal/(..)feed/[id]/page.tsx

// Intercept /settings from anywhere (root level)
// Location: app/@modal/(...)settings/page.tsx
```

---

## 🏗️ Part 4: Modal Pattern

### The Modal Pattern

Combine parallel routes and intercepting routes to create a modal that:
- Opens on top of the current page
- Updates the URL (shareable/direct linkable)
- Shows the full page when refreshed

### Photo Gallery Modal Implementation

#### Step 1: Create Layout with Modal Slot

```tsx
// app/layout.tsx
export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode
  modal: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
        {modal}
      </body>
    </html>
  )
}
```

#### Step 2: Create Modal Slot Default

```tsx
// app/@modal/default.tsx
export default function ModalDefault() {
  return null  // No modal by default
}
```

#### Step 3: Create Intercepting Modal Route

```tsx
// app/@modal/(.)photos/[id]/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import { PhotoModal } from '@/components/PhotoModal'
import { getPhotoById } from '@/lib/photos'

interface InterceptedModalPageProps {
  params: {
    id: string
  }
}

export default async function InterceptedModalPage({ params }: InterceptedModalPageProps) {
  const router = useRouter()
  const photo = await getPhotoById(params.id)
  
  const handleClose = () => {
    router.back()
  }
  
  return <PhotoModal photo={photo} onClose={handleClose} />
}
```

#### Step 4: Create Full Photo Page

```tsx
// app/photos/[id]/page.tsx
import { getPhotoById } from '@/lib/photos'
import { PhotoFullPage } from '@/components/PhotoFullPage'
import Link from 'next/link'

interface PhotoPageProps {
  params: {
    id: string
  }
}

export default async function PhotoPage({ params }: PhotoPageProps) {
  const photo = await getPhotoById(params.id)
  
  return (
    <div>
      <Link href="/photos" className="text-blue-600 mb-4 inline-block">
        ← Back to Gallery
      </Link>
      <PhotoFullPage photo={photo} />
    </div>
  )
}
```

#### Step 5: Create Photo Gallery

```tsx
// app/photos/page.tsx
import Link from 'next/link'
import { getAllPhotos } from '@/lib/photos'
import { PhotoCard } from '@/components/PhotoCard'

export default async function PhotosPage() {
  const photos = await getAllPhotos()
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Photo Gallery</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {photos.map(photo => (
          <Link key={photo.id} href={`/photos/${photo.id}`}>
            <PhotoCard photo={photo} />
          </Link>
        ))}
      </div>
    </div>
  )
}
```

---

## 🏗️ Part 5: Complete Photo Gallery Implementation

### Types

```ts
// types/index.ts
export interface Photo {
  id: string
  url: string
  title: string
  description: string
  author: string
  likes: number
  createdAt: Date
}
```

### Data Library

```ts
// lib/photos.ts
import { Photo } from '@/types'

const photos: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
    title: 'Mountain Sunset',
    description: 'Beautiful sunset over the mountains',
    author: 'John Doe',
    likes: 1243,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1682687220199-d0124f48f95b',
    title: 'Ocean Waves',
    description: 'Crashing waves on a sunny day',
    author: 'Jane Smith',
    likes: 892,
    createdAt: new Date('2024-02-20'),
  },
  // ... more photos
]

export async function getAllPhotos(): Promise<Photo[]> {
  return photos
}

export async function getPhotoById(id: string): Promise<Photo | undefined> {
  return photos.find(photo => photo.id === id)
}
```

### Photo Card Component

```tsx
// components/PhotoCard.tsx
import Image from 'next/image'
import { Photo } from '@/types'

interface PhotoCardProps {
  photo: Photo
}

export function PhotoCard({ photo }: PhotoCardProps) {
  return (
    <div className="group cursor-pointer">
      <div className="relative aspect-square overflow-hidden rounded-lg">
        <Image
          src={photo.url}
          alt={photo.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
        />
      </div>
      <h3 className="font-semibold mt-2">{photo.title}</h3>
      <p className="text-sm text-gray-500">{photo.author}</p>
    </div>
  )
}
```

### Photo Modal Component

```tsx
// components/PhotoModal.tsx
'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { Photo } from '@/types'
import { Modal } from './Modal'

interface PhotoModalProps {
  photo: Photo
  onClose: () => void
}

export function PhotoModal({ photo, onClose }: PhotoModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  return (
    <Modal onClose={onClose}>
      <div className="max-w-2xl w-full">
        <div className="relative aspect-video">
          <Image
            src={photo.url}
            alt={photo.title}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold">{photo.title}</h2>
          <p className="text-gray-600 mt-2">{photo.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-500">By {photo.author}</span>
            <span className="text-sm text-gray-500">❤️ {photo.likes} likes</span>
          </div>
        </div>
      </div>
    </Modal>
  )
}
```

### Modal Wrapper

```tsx
// components/Modal.tsx
'use client'

interface ModalProps {
  children: React.ReactNode
  onClose: () => void
}

export function Modal({ children, onClose }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-2xl hover:text-gray-300"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
```

### Photo Full Page

```tsx
// components/PhotoFullPage.tsx
import Image from 'next/image'
import { Photo } from '@/types'

interface PhotoFullPageProps {
  photo: Photo
}

export function PhotoFullPage({ photo }: PhotoFullPageProps) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative aspect-video rounded-lg overflow-hidden">
        <Image
          src={photo.url}
          alt={photo.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="mt-6">
        <h1 className="text-3xl font-bold">{photo.title}</h1>
        <p className="text-gray-600 mt-2">{photo.description}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-gray-500">By {photo.author}</span>
          <span className="text-gray-500">❤️ {photo.likes} likes</span>
        </div>
        <p className="text-sm text-gray-400 mt-4">
          Posted on {photo.createdAt.toLocaleDateString()}
        </p>
      </div>
    </div>
  )
}
```

---

## 📊 Quick Reference

### Parallel Routes API

| Concept | Syntax |
|---------|--------|
| Slot definition | `@folder` |
| Slot usage | `{ slotName: React.ReactNode }` |
| Default fallback | `default.tsx` |

### Interception Conventions

| Pattern | Matches | Example |
|---------|---------|---------|
| `(.)` | Same level | `/photos/123` from `/photos` |
| `(..)` | One level up | `/feed/123` from `/` |
| `(..)(..)` | Two levels up | `/user/items/123` from `/` |
| `(...)` | Root level | Anywhere |

### Modal Pattern Steps

| Step | Action |
|------|--------|
| 1 | Create `@modal` slot in layout |
| 2 | Create `@modal/default.tsx` returning `null` |
| 3 | Create intercepting route for modal |
| 4 | Create full page route for direct access |
| 5 | Use `router.back()` to close modal |

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| 404 on slot | Missing page for route | Add `default.tsx` fallback |
| Modal not showing | Wrong interception path | Check interception convention |
| Modal closes on refresh | No full page route | Create `photos/[id]/page.tsx` |
| URL doesn't update | Not using Link | Use `href` for navigation |
| Slots re-rendering | No React.memo | Memoize slot components |

---

## ✅ Day 74 Checklist

- [ ] Understand parallel routes with `@folder` convention
- [ ] Create layout with multiple slots (sidebar, analytics, modal)
- [ ] Implement `default.tsx` for conditional routes
- [ ] Learn interception conventions `(.)`, `(..)`, `(...)`
- [ ] Build photo gallery with grid layout
- [ ] Create intercepting modal route for photo detail
- [ ] Create full photo page for direct access
- [ ] Implement modal close with `router.back()`
- [ ] Test modal opening from gallery
- [ ] Test direct navigation to photo page
- [ ] Test refresh on modal URL
- [ ] Push code to GitHub

