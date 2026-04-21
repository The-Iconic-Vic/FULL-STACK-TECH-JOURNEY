import React from 'react'
import styles from './Avatar.module.css'

function Avatar({ src, alt, size = 'medium' }) {
  const sizeClass = {
    small: styles.small,
    medium: styles.medium,
    large: styles.large
  }

  return (
    <img 
      src={src} 
      alt={alt}
      className={`${styles.avatar} ${sizeClass[size]}`}
    />
  )
}

export default Avatar