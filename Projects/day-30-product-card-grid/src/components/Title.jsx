import React from 'react'
import styles from './Title.module.css'

function Title({ children, level = 'h2', className = '' }) {
  const HeadingTag = level

  return (
    <HeadingTag className={`${styles.title} ${styles[level]} ${className}`}>
      {children}
    </HeadingTag>
  )
}

export default Title