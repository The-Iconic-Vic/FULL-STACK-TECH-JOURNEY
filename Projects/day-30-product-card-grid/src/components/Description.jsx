import React from 'react'
import styles from './Description.module.css'

function Description({ children, className = '' }) {
  return (
    <p className={`${styles.description} ${className}`}>
      {children}
    </p>
  )
}

export default Description