import React from 'react'
import ProductCard from './components/ProductCard'
import styles from './App.module.css'

// Product data
const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop",
    description: "High-quality wireless headphones with noise cancellation"
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 199.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
    description: "Track your fitness and stay connected"
  },
  {
    id: 3,
    name: "Premium Backpack",
    price: 49.99,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop",
    description: "Durable, waterproof backpack for everyday use"
  },
  {
    id: 4,
    name: "Mechanical Keyboard",
    price: 129.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop",
    description: "RGB mechanical keyboard with blue switches"
  },
  {
    id: 5,
    name: "USB-C Hub",
    price: 39.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=300&h=300&fit=crop",
    description: "7-in-1 USB-C hub with HDMI and Ethernet"
  },
  {
    id: 6,
    name: "Wireless Mouse",
    price: 29.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
    description: "Ergonomic wireless mouse with long battery life"
  }
]

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>🛍️ Product Catalog</h1>
        <p>Browse our featured products</p>
      </header>

      <div className={styles.grid}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <footer className={styles.footer}>
        <p>© 2026 Product Catalog | React Component Demo</p>
      </footer>
    </div>
  )
}

export default App