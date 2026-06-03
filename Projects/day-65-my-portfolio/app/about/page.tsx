export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">About Me</h1>
      <div className="grid md:grid-cols-2 gap-12">
        <div>
          <p className="text-gray-600 mb-4">
            I&apos;m a full-stack developer with a passion for building modern web applications.
            My journey in tech started in early 2026, and I&apos;ve been learning and building ever since.
          </p>
          <p className="text-gray-600 mb-4">
            I specialize in React, Next.js, and TypeScript, creating fast, responsive,
            and user-friendly applications that solve real problems.
          </p>
          <p className="text-gray-600">
            When I&apos;m not coding, I enjoy sharing my knowledge and documenting my learning
            journey to help others who are starting out in web development.
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Quick Facts</h3>
          <ul className="space-y-3 text-gray-600">
            <li>📍 Location: Nigeria</li>
            <li>💼 Open to opportunities</li>
            <li>📅 Started coding: March 2026</li>
            <li>🎯 Goal: Build AI-powered applications</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
