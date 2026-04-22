import React from 'react'
import styles from './Button.module.css'

function Button({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  disabled = false,
  onClick,
  type = 'button'
}) {
  const variantClass = styles[variant] || styles.primary
  const sizeClass = styles[size] || styles.medium

  return (
    <button
      type={type}
      className={`${styles.button} ${variantClass} ${sizeClass}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button