# 📚 Day 67 Resources - Data Fetching: SSR, SSG, ISR

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| Next.js: Data Fetching | https://nextjs.org/docs/app/building-your-application/data-fetching/fetching | Complete data fetching guide |
| Next.js: Caching | https://nextjs.org/docs/app/building-your-application/caching | Understanding Next.js caching |
| Next.js: fetch API | https://nextjs.org/docs/app/api-reference/functions/fetch | fetch configuration options |
| Next.js: generateStaticParams | https://nextjs.org/docs/app/api-reference/functions/generate-static-params | Dynamic SSG documentation |
| Next.js: revalidate option | https://nextjs.org/docs/app/api-reference/functions/fetch#revalidate | ISR configuration |
| Next.js: Static Exports | https://nextjs.org/docs/app/building-your-application/deploying/static-exports | Full SSG deployment |

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| SSR, SSG, ISR Explained | https://youtu.be/6ThXsUwLWvc | 20 min |
| Next.js Caching Deep Dive | https://youtu.be/2jM5l1QxE1g | 25 min |
| generateStaticParams Tutorial | https://youtu.be/0DdM6H1QjYM | 15 min |
| ISR in Practice | https://youtu.be/JfR7xGxBqZY | 18 min |

## 🔧 Fetch Configuration Reference

### Quick Reference Card

```tsx
// SSR - Fresh on every request
fetch(url, { cache: 'no-store' })
fetch(url, { next: { revalidate: 0 } })

// SSG - Build time only (default)
fetch(url, { cache: 'force-cache' })
fetch(url)  // same as above

// ISR - Revalidate periodically
fetch(url, { next: { revalidate: 60 } })
```

### Revalidate Time Suggestions

| Content Type | Recommended Revalidate |
|--------------|----------------------|
| Live scores, stock prices | `revalidate: 5-10` |
| Comments, social feeds | `revalidate: 30-60` |
| Product prices, inventory | `revalidate: 60-300` |
| News articles | `revalidate: 60-300` |
| Weather forecasts | `revalidate: 300-600` |
| Blog posts | `revalidate: 3600-86400` |

## 📖 Further Reading

| Article | Link |
|---------|------|
| Understanding Next.js Rendering | https://nextjs.org/docs/app/building-your-application/rendering |
| Data Fetching Patterns | https://nextjs.org/learn/dashboard-app/fetching-data |
| ISR Documentation | https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration |
| Full Stack Next.js | https://nextjs.org/learn |

## 🔗 Related Day Resources

| Day | Topic | Link |
|-----|-------|------|
| Day 64 | Next.js Introduction | [Resource](./day-64-resources.md) |
| Day 65 | Layouts & Navigation | [Resource](./day-65-resources.md) |
| Day 66 | Server & Client Components | [Resource](./day-66-resources.md) |
| Day 67 | Data Fetching (SSR, SSG, ISR) | Current |

