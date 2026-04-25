import styles from './CartSummary.module.css'

function CartSummary({ cart }) {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 0 ? 5.99 : 0
  const tax = subtotal * 0.1
  const total = subtotal + shipping + tax

  return (
    <div className={styles.summary}>
      <h3 className={styles.title}>Order Summary</h3>
      <div className={styles.row}>
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className={styles.row}>
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      <div className={styles.row}>
        <span>Tax (10%)</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      <div className={`${styles.row} ${styles.total}`}>
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      <button className={styles.checkoutBtn}>
        Proceed to Checkout
      </button>
    </div>
  )
}

export default CartSummary