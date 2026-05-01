import React from 'react'
import styles from './CartItem.module.css'

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className={styles.item}>
      <div className={styles.info}>
        <div className={styles.emoji}>{item.emoji}</div>
        <div className={styles.details}>
          <h3 className={styles.name}>{item.name}</h3>
          <p className={styles.price}>${item.price.toFixed(2)}</p>
        </div>
      </div>
      <div className={styles.controls}>
        <div className={styles.quantity}>
          <button
            className={styles.qtyBtn}
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span className={styles.qty}>{item.quantity}</span>
          <button
            className={styles.qtyBtn}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
        <div className={styles.subtotal}>
          ${(item.price * item.quantity).toFixed(2)}
        </div>
        <button
          className={styles.removeBtn}
          onClick={() => onRemove(item.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default CartItem