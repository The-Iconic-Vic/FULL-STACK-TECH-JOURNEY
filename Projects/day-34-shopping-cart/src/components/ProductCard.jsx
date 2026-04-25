import styles from './ProductCard.module.css'

function ProductCard({ product, onAddToCart }) {
  return (
    <div className={styles.card}>
      <div className={styles.image}>{product.image}</div>
      <div className={styles.info}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <button 
          className={styles.addBtn}
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductCard