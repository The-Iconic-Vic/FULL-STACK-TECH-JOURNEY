import React from 'react'
import { useCart } from '../contexts/CartContext'
import CartItem from '../components/CartItem'
import styles from './CartPage.module.css'

function CartPage({ onNavigate }) {
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart()

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items yet</p>
          <button className={styles.shopBtn} onClick={() => onNavigate('products')}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>
      <p className={styles.subtitle}>You have {getTotalItems()} items in your cart</p>

      <div className={styles.cart}>
        <div className={styles.items}>
          {cart.map(item => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={updateQuantity}
              onRemove={removeFromCart}
            />
          ))}
        </div>

        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span>Subtotal ({getTotalItems()} items)</span>
            <span>${getTotalPrice().toFixed(2)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>$5.99</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax (10%)</span>
            <span>${(getTotalPrice() * 0.1).toFixed(2)}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>${(getTotalPrice() + 5.99 + getTotalPrice() * 0.1).toFixed(2)}</span>
          </div>
          <button className={styles.checkoutBtn}>Proceed to Checkout</button>
          <button className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage