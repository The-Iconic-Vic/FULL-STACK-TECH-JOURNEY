# 📅 Day 69: Metadata, Images & Optimization

**Date:** June 6, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 3 - Advanced & Specialization  
**Topics:** Metadata API, Open Graph, Image Optimization, Font Optimization, Script Optimization

---

## 📋 Learning Objectives

- ✅ Configure static and dynamic metadata for SEO
- ✅ Set up Open Graph tags for social media sharing
- ✅ Use `generateMetadata` for dynamic page metadata
- ✅ Optimize images with Next.js `Image` component
- ✅ Configure remote images with `remotePatterns`
- ✅ Optimize fonts with `next/font`
- ✅ Add third-party scripts with `next/script`

---

## 🎯 Part 1: Metadata & SEO

### What is Metadata?

Metadata provides information about your webpage to search engines, social media platforms, and browsers. Next.js has a built-in Metadata API that simplifies SEO configuration.

```tsx
// app/layout.tsx (Root layout metadata)
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Portfolio',
  description: 'A showcase of my work and skills',
}
```

### Metadata Structure

```tsx
// Complete metadata configuration
import type { Metadata } from 'next'

export const metadata: Metadata = {
  // Basic metadata
  title: {
    default: 'My Portfolio',
    template: '%s | My Portfolio',  // %s is replaced with page title
  },
  description: 'A showcase of my work and skills',
  keywords: ['portfolio', 'developer', 'react', 'nextjs'],
  authors: [{ name: 'Victor Innocent', url: 'https://github.com/VictorInnocent' }],
  creator: 'Victor Innocent',
  publisher: 'Victor Innocent',
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  verification: {
    google: 'google-site-verification-code',
  },
  category: 'technology',
}
```

### Open Graph (Social Media) Metadata

```tsx
// app/layout.tsx
export const metadata: Metadata = {
  openGraph: {
    title: 'My Portfolio',
    description: 'A showcase of my work and skills',
    url: 'https://my-portfolio.com',
    siteName: 'My Portfolio',
    images: [
      {
        url: 'https://my-portfolio.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'My Portfolio Preview',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  
  // Twitter Card (optional, can be separate)
  twitter: {
    card: 'summary_large_image',
    title: 'My Portfolio',
    description: 'A showcase of my work and skills',
    images: ['https://my-portfolio.com/og-image.png'],
    creator: '@TheIconicVic',
  },
}
```

### Page-Specific Metadata

```tsx
// app/about/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Me',
  description: 'Learn more about my journey and skills',
  openGraph: {
    title: 'About Me | My Portfolio',
    description: 'Learn more about my journey and skills',
  },
}

export default function AboutPage() {
  return (
    <div>
      <h1>About Me</h1>
      {/* Page content */}
    </div>
  )
}
```

### Dynamic Metadata with generateMetadata

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { getPost } from '@/lib/posts'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
    },
    keywords: post.tags,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPost(params.slug)
  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  )
}
```

---

## 🖼️ Part 2: Image Optimization

### The Next.js Image Component

The `Image` component automatically optimizes images for performance.

```tsx
// components/ProfileImage.tsx
import Image from 'next/image'

export default function ProfileImage() {
  return (
    <Image
      src="/profile.jpg"           // Path to image (local or remote)
      alt="My profile picture"      // Accessibility
      width={500}                   // Intrinsic width
      height={500}                  // Intrinsic height
      priority                      // Load immediately (above-the-fold)
      className="rounded-full"      // Tailwind classes
      quality={90}                  // Image quality (1-100, default 75)
      placeholder="blur"            // Blur up placeholder
      blurDataURL="data:image..."   // Base64 blur placeholder
    />
  )
}
```

### Image Component Props

| Prop | Type | Description |
|------|------|-------------|
| `src` | string | Image path or URL |
| `alt` | string | Accessibility description |
| `width` | number | Intrinsic width |
| `height` | number | Intrinsic height |
| `priority` | boolean | Load immediately (above-the-fold) |
| `quality` | number | JPEG quality (1-100) |
| `placeholder` | 'blur' \| 'empty' | Loading placeholder |
| `sizes` | string | Responsive sizes |
| `fill` | boolean | Fill parent container |
| `onLoadingComplete` | function | Callback after load |

### Responsive Images with sizes

```tsx
// Responsive image that adapts to screen size
<Image
  src="/hero.jpg"
  alt="Hero image"
  fill
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  className="object-cover"
/>
```

### Remote Images Configuration

```tsx
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/images/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
    // Disable optimized images (not recommended)
    // unoptimized: true,
    
    // Custom device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Custom image sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
```

### Fill Image (Parent-relative)

```tsx
// Using fill for images with unknown dimensions
<div className="relative w-full h-64">
  <Image
    src="/banner.jpg"
    alt="Banner"
    fill
    className="object-cover"
    sizes="100vw"
  />
</div>
```

### Local Images (Import)

```tsx
// Import local images for automatic optimization
import profilePic from '@/public/profile.jpg'
import Image from 'next/image'

export default function Profile() {
  return (
    <Image
      src={profilePic}
      alt="Profile"
      // Width/height automatically inferred from image
      priority
    />
  )
}
```

---

## 🔤 Part 3: Font Optimization

### Using next/font

```tsx
// app/layout.tsx
import { Inter, Roboto_Mono } from 'next/font/google'

// Variable font (recommended)
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',           // fallback until font loads
  variable: '--font-inter',  // CSS variable
})

// Multiple weights
const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-roboto-mono',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

### Using in CSS

```css
/* globals.css */
body {
  font-family: var(--font-inter), system-ui, sans-serif;
}

code {
  font-family: var(--font-roboto-mono), monospace;
}
```

### Google Fonts Alternative

```tsx
// app/layout.tsx
import { Roboto, Open_Sans } from 'next/font/google'

const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const openSans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
})

// Use different fonts for different elements
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <h1 className={openSans.className}>Styled with Open Sans</h1>
        <p className={roboto.className}>Styled with Roboto</p>
        {children}
      </body>
    </html>
  )
}
```

### Local Font Files

```tsx
// app/fonts/localFont.ts
import localFont from 'next/font/local'

const myFont = localFont({
  src: [
    {
      path: './fonts/MyFont-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/MyFont-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-my-font',
})

export default myFont
```

---

## 📜 Part 4: Script Optimization

### Using next/script

```tsx
// app/layout.tsx
import Script from 'next/script'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        
        {/* Third-party script that can load early */}
        <Script
          src="https://cdn.jsdelivr.net/npm/example-script.js"
          strategy="lazyOnload"
        />
        
        {/* Inline script */}
        <Script id="inline-script" strategy="beforeInteractive">
          {`
            console.log('This runs before page is interactive');
          `}
        </Script>
      </body>
    </html>
  )
}
```

### Script Loading Strategies

| Strategy | Description | Use Case |
|----------|-------------|----------|
| `beforeInteractive` | Loads before page is interactive | Critical scripts (e.g., feature detection) |
| `afterInteractive` | Loads after page is interactive (default) | Analytics, ads |
| `lazyOnload` | Loads during idle time | Non-critical scripts |
| `worker` | Loads in a web worker | Heavy computation |

### Google Analytics Setup

```tsx
// app/layout.tsx
import Script from 'next/script'

const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </body>
    </html>
  )
}
```

---

## 🏗️ Part 5: Complete Portfolio Optimization

### Optimized Layout with Metadata

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'My Portfolio',
    template: '%s | My Portfolio',
  },
  description: 'Full-stack developer specializing in Next.js, React, and TypeScript',
  keywords: ['portfolio', 'developer', 'nextjs', 'react', 'typescript'],
  authors: [{ name: 'Victor Innocent' }],
  openGraph: {
    title: 'My Portfolio',
    description: 'Full-stack developer portfolio',
    url: 'https://my-portfolio.com',
    siteName: 'My Portfolio',
    images: [
      {
        url: 'https://my-portfolio.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'My Portfolio Preview',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My Portfolio',
    description: 'Full-stack developer portfolio',
    images: ['https://my-portfolio.com/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
```

### Optimized Home Page with Images

```tsx
// app/page.tsx
import Image from 'next/image'
import Link from 'next/link'
import heroImage from '@/public/hero-image.jpg'

export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-16">
      {/* Hero Section with Optimized Image */}
      <section className="flex flex-col md:flex-row items-center gap-12 mb-20">
        <div className="flex-1">
          <h1 className="text-5xl font-bold mb-4">
            Hi, I'm Victor Innocent
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Full-stack developer building amazing web experiences
          </p>
          <Link href="/projects" className="bg-blue-600 text-white px-6 py-3 rounded-lg">
            View My Work
          </Link>
        </div>
        
        <div className="flex-1 relative">
          <div className="relative w-64 h-64 mx-auto">
            <Image
              src={heroImage}
              alt="Victor Innocent - Full-stack developer"
              fill
              priority
              className="rounded-full object-cover"
              sizes="(max-width: 768px) 100vw, 256px"
            />
          </div>
        </div>
      </section>
      
      {/* Skills Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-8">My Skills</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {skills.map(skill => (
            <div key={skill.name} className="p-4 bg-gray-100 rounded-lg">
              <div className="relative w-16 h-16 mx-auto mb-3">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain"
                  sizes="64px"
                />
              </div>
              <p className="font-semibold">{skill.name}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
```

### Dynamic Blog Post with Metadata

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import Image from 'next/image'
import { getPost, getAllPosts } from '@/lib/posts'

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(post => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
    keywords: post.tags,
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug)
  
  return (
    <article className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      
      <div className="relative w-full h-96 mb-8">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
      
      <div className="prose prose-lg">
        {post.content}
      </div>
    </article>
  )
}
```

---

## 📊 Quick Reference

### Metadata Fields

| Field | Purpose |
|-------|---------|
| `title` | Browser tab title |
| `description` | Search engine snippet |
| `openGraph` | Social media preview |
| `twitter` | Twitter card preview |
| `robots` | Search engine indexing |
| `keywords` | SEO keywords |
| `authors` | Content authors |
| `icons` | Favicon configuration |

### Image Optimization Checklist

| Item | Check |
|------|-------|
| Use `<Image>` instead of `<img>` | ✅ |
| Set `width` and `height` | ✅ |
| Add `alt` text | ✅ |
| Use `priority` for above-the-fold | ✅ |
| Configure `remotePatterns` for external images | ✅ |
| Use `fill` for unknown dimensions | ✅ |
| Set `sizes` for responsive images | ✅ |

### Performance Best Practices

| Practice | Benefit |
|----------|---------|
| Use `next/font` | No layout shift, self-hosted fonts |
| Use `priority` on hero images | Faster LCP |
| Use `sizes` attribute | Responsive image loading |
| Lazy load offscreen images | Smaller initial load |
| Add blur placeholders | Better perceived performance |
| Use `afterInteractive` for analytics | Doesn't block rendering |

---

## ✅ Day 69 Checklist

- [ ] Configure root layout metadata
- [ ] Add Open Graph tags for social sharing
- [ ] Add Twitter card metadata
- [ ] Create page-specific metadata
- [ ] Implement dynamic metadata with `generateMetadata`
- [ ] Replace all `<img>` tags with `next/image`
- [ ] Configure `remotePatterns` for external images
- [ ] Add `priority` to above-the-fold images
- [ ] Set responsive `sizes` attribute
- [ ] Optimize fonts with `next/font`
- [ ] Add analytics with `next/script`
- [ ] Run Lighthouse audit (target 90+ score)
- [ ] Push code to GitHub

