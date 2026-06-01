# 📚 Day 64 Resources - Next.js Introduction & Setup

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| Next.js Docs: Getting Started | https://nextjs.org/docs | Official Next.js documentation |
| Next.js: Installation | https://nextjs.org/docs/getting-started/installation | Step-by-step installation guide |
| Next.js: App Router | https://nextjs.org/docs/app | Complete App Router documentation |
| Next.js: Routing Fundamentals | https://nextjs.org/docs/app/building-your-application/routing | File-based routing explained |
| Next.js: Rendering | https://nextjs.org/docs/app/building-your-application/rendering | SSR, SSG, ISR explained |
| Next.js: Metadata API | https://nextjs.org/docs/app/building-your-application/optimizing/metadata | SEO and meta tags |
| Next.js: TypeScript | https://nextjs.org/docs/app/building-your-application/configuring/typescript | TypeScript with Next.js |
| Next.js: Environment Variables | https://nextjs.org/docs/app/building-your-application/configuring/environment-variables | .env file configuration |

---

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| Next.js 14 Full Course | https://youtu.be/6ThXsUwLWvc | 2 hours |
| App Router Deep Dive | https://youtu.be/2jM5l1QxE1g | 45 min |
| Server vs Client Components | https://youtu.be/0DdM6H1QjYM | 20 min |
| Next.js for Beginners | https://youtu.be/JfR7xGxBqZY | 1 hour |
| File-based Routing Explained | https://youtu.be/9ZZxmB7aF7A | 15 min |

---

## 🧩 Next.js Comparisons

| Comparison | Link |
|------------|------|
| Next.js vs React | https://nextjs.org/docs/app/building-your-application/rendering/client-components |
| Next.js vs Create React App | https://www.freecodecamp.org/news/nextjs-vs-create-react-app/ |
| Next.js vs Vite | https://vitejs.dev/guide/comparisons.html |
| SSR vs CSR vs SSG | https://nextjs.org/docs/app/building-your-application/rendering/server-side-rendering |

---

## 📦 Useful Next.js Templates & Starters

| Template | Link | Description |
|----------|------|-------------|
| Next.js Official Examples | https://github.com/vercel/next.js/tree/canary/examples | Official example projects |
| Next.js Portfolio Starter | https://vercel.com/templates/next.js/portfolio-starter-kit | Portfolio template |
| Next.js Blog Starter | https://vercel.com/templates/next.js/blog-starter-kit | Blog template |
| Next.js with Tailwind | https://vercel.com/templates/next.js/tailwind-css-starter | Tailwind CSS starter |
| create-next-app | https://nextjs.org/docs/api-reference/create-next-app | Project generator |

---

## 🔧 Essential Next.js Commands

| Command | Purpose |
|---------|---------|
| `npx create-next-app@latest` | Create new project |
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `next info` | Show environment information |
| `next telemetry` | Toggle telemetry |

---

## 📁 Folder Structure Reference

```
my-app/
├── app/
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   ├── globals.css       # Global styles
│   ├── about/
│   │   └── page.tsx      # /about
│   └── blog/
│       ├── layout.tsx    # Blog layout
│       ├── page.tsx      # /blog
│       └── [slug]/
│           └── page.tsx  # /blog/post-1
├── public/               # Static assets
├── components/           # Reusable components
├── lib/                  # Utilities
├── styles/               # Global styles (optional)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── .env.local
```

---

## 🎨 Common Next.js Configurations

| Configuration | Purpose |
|---------------|---------|
| `images.domains` | Allow external image domains |
| `redirects` | URL redirects |
| `rewrites` | Proxy API requests |
| `env` | Expose environment variables |
| `headers` | Custom HTTP headers |
| `output: 'export'` | Static HTML export |

---

## 🔗 Related Resources

| Topic | Link |
|-------|------|
| React Documentation | https://react.dev |
| Tailwind CSS Docs | https://tailwindcss.com/docs |
| TypeScript Handbook | https://www.typescriptlang.org/docs/ |
| Vercel Deployment | https://vercel.com/docs |
| Next.js GitHub | https://github.com/vercel/next.js |

---

## 📖 Further Reading

| Article | Link |
|---------|------|
| Next.js 14: What's New | https://nextjs.org/blog/next-14 |
| From React to Next.js | https://nextjs.org/learn-pages-router/foundations/from-react-to-nextjs |
| Building Your Application | https://nextjs.org/docs/app/building-your-application |
| Deploying Next.js | https://nextjs.org/docs/app/building-your-application/deploying |

---

## 🎯 Key Takeaways Summary

| Concept | Key Point |
|---------|-----------|
| **Next.js** | React framework, not a library |
| **App Router** | Modern routing system (recommended) |
| **Server Components** | Default, async, no client hooks |
| **Client Components** | Need `'use client'`, have interactivity |
| **File-based Routing** | Folders create routes |
| **SSR** | Server renders HTML per request |
| **SSG** | Pre-rendered at build time |
| **ISR** | Static + periodic updates |

