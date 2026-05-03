import React from 'react'
import { NavLink } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import CartIcon from './CartIcon'
import styles from './Navbar.module.css'

function Navbar() {
  const { itemCount } = useCart()

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <NavLink to="/" className={styles.logo}>
          🛍️ ShopHub
        </NavLink>
        <div className={styles.navLinks}>
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
            end
          >
            Home
          </NavLink>
          <NavLink 
            to="/products" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Products
          </NavLink>
          <NavLink 
            to="/cart" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            <CartIcon count={itemCount} />
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar