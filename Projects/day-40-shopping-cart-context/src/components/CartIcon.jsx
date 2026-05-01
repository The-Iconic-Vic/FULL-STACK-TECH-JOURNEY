import React from 'react'
import styles from './CartIcon.module.css'

function CartIcon({ count }) {
  return (
    <div className={styles.icon}>
      🛒
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </div>
  )
}

export default CartIcon