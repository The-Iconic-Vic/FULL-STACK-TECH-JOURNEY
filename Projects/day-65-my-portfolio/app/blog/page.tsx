import Link from 'next/link'

const blogPosts = [
  {
    id: 1,
    slug: 'getting-started-with-nextjs',
    title: 'Getting Started with Next.js',
    excerpt: 'Learn how to build modern web applications with Next.js 14 and the App Router.',
    date: 'June 1, 2026',
    readTime: '5 min read',
  },
]

export default function BlogPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-4">Blog</h1>
      <p className="text-gray-600 mb-8">Thoughts, tutorials, and insights from my development journey.</p>
      <div className="space-y-8">
        {blogPosts.map((post) => (
          <article key={post.id} className="border-b pb-8">
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-semibold mb-2 hover:text-blue-600 transition">{post.title}</h2>
            </Link>
            <div className="flex gap-4 text-sm text-gray-500 mb-3">
              <span>{post.date}</span>
              <span>{post.readTime}</span>
            </div>
            <p className="text-gray-600 mb-3">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-blue-600 hover:underline">Read more →</Link>
          </article>
        ))}
      </div>
    </div>
  )
}
