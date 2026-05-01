// eslint-disable-next-line no-unused-vars
import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import ThemeToggle from './ThemeToggle'
import styles from './Navbar.module.css'

function Navbar() {
  const { theme, isDark } = useTheme()

  return (
    <nav className={`${styles.navbar} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span>🎨 Theme Context Demo</span>
        </div>
        <div className={styles.navLinks}>
          <a href="#" className={styles.link}>Home</a>
          <a href="#" className={styles.link}>About</a>
          <a href="#" className={styles.link}>Contact</a>
        </div>
        <ThemeToggle />
      </div>
    </nav>
  )
}

export default Navbar