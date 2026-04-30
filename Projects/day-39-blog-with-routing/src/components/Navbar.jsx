import 'react'
import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.css'

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <NavLink to="/" className={styles.logoLink}>
            📝 Blogster
          </NavLink>
        </div>
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
            to="/about" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/contact" 
            className={({ isActive }) => 
              isActive ? `${styles.link} ${styles.active}` : styles.link
            }
          >
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar