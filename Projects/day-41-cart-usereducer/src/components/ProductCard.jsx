import React from 'react'
import { useCart } from '../contexts/CartContext'
import styles from './ProductCard.module.css'

function ProductCard({ product }) {
  const { addToCart } = useCart()

  return (
    <div className={styles.card}>
      <div className={styles.image}>
        <span className={styles.emoji}>{product.emoji}</span>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <button
            className={styles.addBtn}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCard