import Link from 'next/link'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce platform with cart, checkout, and payment integration.',
    tech: ['Next.js', 'TypeScript', 'MongoDB', 'Stripe'],
  },
  {
    id: 2,
    title: 'Task Manager App',
    description: 'Productivity app for managing tasks with drag-and-drop functionality.',
    tech: ['React', 'TypeScript', 'Tailwind CSS'],
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Real-time weather dashboard with location-based forecasts.',
    tech: ['Next.js', 'TypeScript', 'OpenWeather API'],
  },
]

export default function ProjectsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4">My Projects</h1>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Here are some of the projects I&apos;ve built. Each project demonstrates different skills and technologies.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4 text-sm">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech) => (
                <span key={tech} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
                  {tech}
                </span>
              ))}
            </div>
            <Link href="#" className="text-blue-600 hover:underline text-sm">View Project →</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
