import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { formatPrice, truncateText, getRatingStars } from '../utils/helpers'
import styles from './ProductCard.module.css'

function ProductCard({ product }) {
  const { addToCart } = useCart()
  const stars = getRatingStars(product.rating?.rate || 4)

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.imageLink}>
        <img 
          src={product.image} 
          alt={product.title} 
          className={styles.image}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300?text=Product'
          }}
        />
      </Link>
      <div className={styles.content}>
        <Link to={`/product/${product.id}`} className={styles.titleLink}>
          <h3 className={styles.title}>{truncateText(product.title, 40)}</h3>
        </Link>
        <div className={styles.rating}>
          {'★'.repeat(stars.full)}
          {stars.half && '½'}
          {'☆'.repeat(stars.empty)}
          <span className={styles.ratingValue}>({product.rating?.rate || 'N/A'})</span>
        </div>
        <div className={styles.footer}>
          <span className={styles.price}>{formatPrice(product.price)}</span>
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