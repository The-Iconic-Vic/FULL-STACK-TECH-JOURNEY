import 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import NotFoundPage from './pages/NotFoundPage'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <Navbar />
      <main className={styles.main}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <footer className={styles.footer}>
        <p>© 2026 Victor Innocent | Built with React Router</p>
        <p>
          <a href="https://x.com/TheIconicVic_" target="_blank" rel="noopener noreferrer">Twitter</a> | 
          <a href="https://github.com/The-Iconic-Vic" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </footer>
    </div>
  )
}

export default App