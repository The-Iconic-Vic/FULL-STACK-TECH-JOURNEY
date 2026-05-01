import React from 'react'
import { useCart } from '../contexts/CartContext'
import CartIcon from './CartIcon'
import styles from './Navbar.module.css'

function Navbar({ onNavigate, currentPage }) {
  const { itemCount } = useCart()

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => onNavigate('products')}>
          🛍️ ShopHub
        </div>
        <div className={styles.navLinks}>
          <button
            className={`${styles.navLink} ${currentPage === 'products' ? styles.active : ''}`}
            onClick={() => onNavigate('products')}
          >
            Products
          </button>
          <button
            className={`${styles.navLink} ${currentPage === 'cart' ? styles.active : ''}`}
            onClick={() => onNavigate('cart')}
          >
            <CartIcon count={itemCount} />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar