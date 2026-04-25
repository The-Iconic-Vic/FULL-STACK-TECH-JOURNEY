import { useState } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import styles from './App.module.css'

function App() {
  const [cart, setCart] = useState([])

  // Add item to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      // Check if product already in cart
      const existingItem = prevCart.find(item => item.id === product.id)
      
      if (existingItem) {
        // Update quantity using map
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      } else {
        // Add new item with quantity 1
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  // Update item quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id)
      return
    }
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id))
  }

  // Clear entire cart
  const clearCart = () => {
    setCart([])
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>🛒 Shopping Cart</h1>
        <p className={styles.subtitle}>Manage your cart with complex state updates</p>
        
        <div className={styles.grid}>
          <ProductList onAddToCart={addToCart} />
          <Cart 
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            onClear={clearCart}
          />
        </div>
      </div>
    </div>
  )
}

export default App