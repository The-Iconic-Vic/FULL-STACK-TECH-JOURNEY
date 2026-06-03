export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 mt-auto">
      <div className="container mx-auto px-4 text-center">
        <p>&copy; {new Date().getFullYear()} Victor Innocent. All rights reserved.</p>
        <div className="flex justify-center gap-4 mt-4">
          <a
            href="https://twitter.com/TheIconicVic"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            Twitter
          </a>
          <a
            href="https://github.com/VictorInnocent"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/victor-innocent"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
