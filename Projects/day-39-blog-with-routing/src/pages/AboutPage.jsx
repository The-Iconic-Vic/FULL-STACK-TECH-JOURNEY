import styles from './AboutPage.module.css'

function AboutPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About This Blog</h1>
      
      <div className={styles.content}>
        <p>
          Welcome to <strong>Blogster</strong> – a modern blog platform built with 
          React and React Router. This project demonstrates how to build 
          multi-page applications with seamless navigation.
        </p>

        <h2>Features</h2>
        <ul>
          <li>✅ Multi-page routing with React Router</li>
          <li>✅ Dynamic route parameters (/post/:id)</li>
          <li>✅ Active navigation links with styling</li>
          <li>✅ Programmatic navigation (back/forward buttons)</li>
          <li>✅ API data fetching from JSONPlaceholder</li>
          <li>✅ 404 page for unknown routes</li>
          <li>✅ Next/Previous post navigation</li>
          <li>✅ Fully responsive design</li>
        </ul>

        <h2>Tech Stack</h2>
        <ul>
          <li>⚛️ React 18</li>
          <li>🧭 React Router DOM v6</li>
          <li>🎨 CSS Modules</li>
          <li>📡 Fetch API for data</li>
          <li>⚡ Vite for build tooling</li>
        </ul>

        <div className={styles.author}>
          <h3>Built by Victor Innocent</h3>
          <p>
            Follow my coding journey on{' '}
            <a href="https://x.com/TheIconicVic_" target="_blank" rel="noopener noreferrer">
              Twitter
            </a>{' '}
            and check out my code on{' '}
            <a href="https://github.com/The-Iconic-Vic" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default AboutPage