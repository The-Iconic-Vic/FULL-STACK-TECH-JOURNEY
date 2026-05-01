import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import styles from './Card.module.css'

function Card({ title, description }) {
  const { isDark } = useTheme()

  return (
    <div className={`${styles.card} ${isDark ? styles.dark : styles.light}`}>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
    </div>
  )
}

export default Card