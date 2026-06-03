import { notFound } from 'next/navigation'
import Link from 'next/link'

const posts: Record<string, { title: string; date: string; readTime: string; content: string }> = {
  'getting-started-with-nextjs': {
    title: 'Getting Started with Next.js',
    date: 'June 1, 2026',
    readTime: '5 min read',
    content: '<p>Next.js is a powerful React framework that makes building full-stack applications easy.</p>',
  },
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = posts[params.slug]
  if (!post) notFound()

  return (
    <div>
      <Link href="/blog" className="text-blue-600 hover:underline mb-4 inline-block">← Back to Blog</Link>
      <article>
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="flex gap-4 text-sm text-gray-500 mb-6">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  )
}
