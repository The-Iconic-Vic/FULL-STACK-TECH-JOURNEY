# 📚 Day 66 Resources - Server & Client Components

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| Next.js: Server Components | https://nextjs.org/docs/app/building-your-application/rendering/server-components | Official Server Components documentation |
| Next.js: Client Components | https://nextjs.org/docs/app/building-your-application/rendering/client-components | Official Client Components documentation |
| Next.js: Composition Patterns | https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns | When to use Server vs Client |
| Next.js: Interop Patterns | https://nextjs.org/docs/app/building-your-application/rendering/interop-patterns | Using Server and Client together |
| React: Server Components | https://react.dev/reference/rsc/server-components | React official documentation |
| React: 'use client' directive | https://react.dev/reference/rsc/use-client | React client directive documentation |

---

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| Server Components Deep Dive | https://youtu.be/6ThXsUwLWvc | 25 min |
| Client Components Explained | https://youtu.be/2jM5l1QxE1g | 18 min |
| Composition Patterns | https://youtu.be/0DdM6H1QjYM | 15 min |
| Server vs Client Decision Making | https://youtu.be/JfR7xGxBqZY | 12 min |

---

## 📝 Quick Reference Card

### Server Component Rules

```tsx
// ✅ CAN DO
- async/await data fetching
- Direct database access
- Import server-only modules
- Access environment variables (any)
- Render other Server Components
- Pass data as props to Client Components

// ❌ CANNOT DO
- useState, useEffect, useReducer
- Browser APIs (window, localStorage)
- Event handlers (onClick, onChange)
- useRouter, usePathname
- Context providers
```

### Client Component Rules

```tsx
// ✅ CAN DO
- useState, useEffect, useReducer
- Browser APIs
- Event handlers
- Custom hooks with client features
- Context providers
- Third-party interactive libraries

// ❌ CANNOT DO (directly)
- Server-only data fetching
- Direct database access
- Server environment variables
```

---

## 🔧 Utility Functions

### Component Type Checker

```tsx
// lib/component-utils.ts
export function isServerComponent() {
  try {
    // This will throw if accessed on client
    const test = process.env.SERVER_ONLY_VAR
    return true
  } catch {
    return false
  }
}

export function withClientOnly<T>(component: T): T {
  return component
}
```

---

## 📖 Further Reading

| Article | Link |
|---------|------|
| Understanding React Server Components | https://vercel.com/blog/understanding-react-server-components |
| Server Components vs Client Components | https://nextjs.org/learn/dashboard-app/server-client-components |
| When to use Server vs Client Components | https://www.joshwcomeau.com/react/server-components/ |
| RSC from Scratch | https://github.com/reactwg/server-components/discussions |

---

## 🎯 Decision Flowchart

```
                    ┌─────────────────┐
                    │  Writing a new  │
                    │   Component?    │
                    └────────┬────────┘
                             │
                    ┌────────▼────────┐
                    │ Needs useState, │
                    │ useEffect, or   │
                    │ event handlers? │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              │ YES                         │ NO
              ▼                             ▼
    ┌─────────────────┐           ┌─────────────────┐
    │  Client         │           │  Server         │
    │  Component      │           │  Component      │
    ├─────────────────┤           ├─────────────────┤
    │ 'use client'    │           │ No directive    │
    │ Can be          │           │ Can use async   │
    │ interactive     │           │ Can access DB   │
    │ Has bundle size │           │ 0 bundle size   │
    └─────────────────┘           └─────────────────┘
```

---

## 📦 Example Project Structure

```
day-66-hybrid-dashboard/
├── app/
│   ├── page.tsx              (Server)
│   ├── layout.tsx            (Server)
│   └── dashboard/
│       └── page.tsx          (Server with Client children)
├── components/
│   ├── ServerProductList.tsx  (Server)
│   ├── ServerStatsCard.tsx    (Server)
│   ├── ClientFilterBar.tsx    (Client)
│   ├── ClientSearchInput.tsx  (Client)
│   └── ClientChart.tsx        (Client)
└── lib/
    └── data.ts                (Server utilities)
```

---

## 🔗 Related Day Resources

| Day | Topic | Link |
|-----|-------|------|
| Day 64 | Next.js Introduction | [Resource](./day-64-resources.md) |
| Day 65 | Layouts & Navigation | [Resource](./day-65-resources.md) |
| Day 66 | Server & Client Components | Current |
| Day 67 | Data Fetching | Coming Soon |

---

## ✅ Key Takeaways Summary

| Concept | Key Point |
|---------|-----------|
| **Default** | All components are Server Components |
| **Client Directive** | `'use client'` at top of file |
| **Server Benefits** | 0 bundle size, direct data access, security |
| **Client Use Cases** | Interactivity, hooks, browser APIs |
| **Pattern** | Push interactivity down the tree |
| **Data Flow** | Server fetches → passes props to Client |
| **Hydration** | React attaches events to server HTML |
