import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          Hi, I&apos;m{' '}
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Victor Innocent
          </span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Full-stack developer passionate about building amazing web experiences
          with Next.js, TypeScript, and Tailwind CSS.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/projects" className="btn-primary">View My Work</Link>
          <Link href="/contact" className="btn-secondary">Contact Me</Link>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {['React', 'Next.js', 'TypeScript', 'Node.js', 'Tailwind CSS', 'MongoDB', 'PostgreSQL', 'Git'].map((skill) => (
            <span key={skill} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm">
              {skill}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
