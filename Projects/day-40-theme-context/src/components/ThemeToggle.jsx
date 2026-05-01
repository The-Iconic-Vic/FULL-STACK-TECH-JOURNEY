import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import styles from './ThemeToggle.module.css'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button className={styles.toggle} onClick={toggleTheme}>
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  )
}

export default ThemeToggle