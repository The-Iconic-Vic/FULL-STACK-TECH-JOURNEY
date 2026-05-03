import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import useFetch from '../hooks/useFetch'
import { formatPrice, getRatingStars } from '../utils/helpers'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import styles from './ProductDetailPage.module.css'

const API_URL = 'https://fakestoreapi.com/products'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart } = useCart()
  const { data: product, loading, error, refetch } = useFetch(`${API_URL}/${id}`)
  const [quantity, setQuantity] = React.useState(1)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} onRetry={refetch} />
  if (!product) return null

  const stars = getRatingStars(product.rating?.rate || 4)

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product)
    }
    navigate('/cart')
  }

  return (
    <div className={styles.container}>
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>
      
      <div className={styles.product}>
        <div className={styles.imageContainer}>
          <img 
            src={product.image} 
            alt={product.title} 
            className={styles.image}
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Product'
            }}
          />
        </div>
        
        <div className={styles.info}>
          <h1 className={styles.title}>{product.title}</h1>
          <div className={styles.category}>{product.category}</div>
          
          <div className={styles.rating}>
            {'★'.repeat(stars.full)}
            {stars.half && '½'}
            {'☆'.repeat(stars.empty)}
            <span className={styles.ratingValue}>
              ({product.rating?.rate}) - {product.rating?.count} reviews
            </span>
          </div>
          
          <div className={styles.price}>{formatPrice(product.price)}</div>
          
          <p className={styles.description}>{product.description}</p>
          
          <div className={styles.quantitySelector}>
            <label>Quantity:</label>
            <input
              type="number"
              min="1"
              max="99"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(99, Math.max(1, parseInt(e.target.value) || 1)))}
              className={styles.quantityInput}
            />
          </div>
          
          <button className={styles.addToCartBtn} onClick={handleAddToCart}>
            Add to Cart - {formatPrice(product.price * quantity)}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductDetailPage