import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { formatPrice } from '../utils/helpers'
import styles from './CartPage.module.css'

function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart, totalPrice } = useCart()

  if (cart.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>🛒</div>
          <h2>Your cart is empty</h2>
          <p>Looks like you haven't added any items yet</p>
          <Link to="/products" className={styles.shopBtn}>
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Shopping Cart</h1>
      
      <div className={styles.cart}>
        <div className={styles.items}>
          <div className={styles.header}>
            <div>Product</div>
            <div>Quantity</div>
            <div>Total</div>
            <div></div>
          </div>
          
          {cart.map(item => (
            <div key={item.id} className={styles.item}>
              <div className={styles.productInfo}>
                <img src={item.image} alt={item.title} className={styles.productImage} />
                <div>
                  <h3 className={styles.productTitle}>{item.title}</h3>
                  <p className={styles.productPrice}>{formatPrice(item.price)}</p>
                </div>
              </div>
              
              <div className={styles.quantity}>
                <button 
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <span className={styles.qty}>{item.quantity}</span>
                <button 
                  className={styles.qtyBtn}
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
              
              <div className={styles.itemTotal}>
                {formatPrice(item.price * item.quantity)}
              </div>
              
              <button 
                className={styles.removeBtn}
                onClick={() => removeFromCart(item.id)}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
        
        <div className={styles.summary}>
          <h3 className={styles.summaryTitle}>Order Summary</h3>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Shipping</span>
            <span>$5.99</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Tax (10%)</span>
            <span>{formatPrice(totalPrice * 0.1)}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>{formatPrice(totalPrice + 5.99 + totalPrice * 0.1)}</span>
          </div>
          <Link to="/checkout" className={styles.checkoutBtn}>
            Proceed to Checkout
          </Link>
          <button className={styles.clearBtn} onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartPage