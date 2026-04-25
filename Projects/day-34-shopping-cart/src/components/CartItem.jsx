import styles from './CartItem.module.css'

function CartItem({ item, onUpdateQuantity, onRemove }) {
  return (
    <div className={styles.cartItem}>
      <div className={styles.image}>{item.image}</div>
      <div className={styles.info}>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.price}>${item.price.toFixed(2)}</div>
        <div className={styles.quantityControl}>
          <button 
            className={styles.qtyBtn}
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
          >
            -
          </button>
          <span className={styles.quantity}>{item.quantity}</span>
          <button 
            className={styles.qtyBtn}
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className={styles.subtotal}>
        ${(item.price * item.quantity).toFixed(2)}
      </div>
      <button 
        className={styles.removeBtn}
        onClick={() => onRemove(item.id)}
      >
        ✕
      </button>
    </div>
  )
}

export default CartItem