import ProductCard from './ProductCard'
import { products } from '../data/products'
import styles from './ProductList.module.css'

function ProductList({ onAddToCart }) {
  return (
    <div className={styles.productList}>
      <h2 className={styles.sectionTitle}>📦 Products</h2>
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList