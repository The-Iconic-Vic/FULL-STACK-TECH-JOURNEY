import React from 'react'
import ProductCard from '../components/ProductCard'
import styles from './ProductsPage.module.css'

const products = [
  { id: 1, name: 'Wireless Headphones', price: 99.99, description: 'High-quality wireless headphones with noise cancellation', emoji: '🎧' },
  { id: 2, name: 'Mechanical Keyboard', price: 129.99, description: 'RGB mechanical keyboard with blue switches', emoji: '⌨️' },
  { id: 3, name: 'Wireless Mouse', price: 29.99, description: 'Ergonomic wireless mouse with long battery life', emoji: '🖱️' },
  { id: 4, name: 'USB-C Hub', price: 39.99, description: '7-in-1 USB-C hub with HDMI and Ethernet', emoji: '🔌' },
  { id: 5, name: 'Laptop Stand', price: 49.99, description: 'Adjustable aluminum laptop stand', emoji: '💻' },
  { id: 6, name: 'Desk Lamp', price: 34.99, description: 'LED desk lamp with adjustable brightness', emoji: '💡' }
]

function ProductsPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Our Products</h1>
      <p className={styles.subtitle}>Shop our collection of premium products</p>
      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductsPage