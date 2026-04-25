import CartItem from './CartItem'
import CartSummary from './CartSummary'
import styles from './Cart.module.css'

function Cart({ cart, onUpdateQuantity, onRemove, onClear }) {
  return (
    <div className={styles.cart}>
      <div className={styles.header}>
        <h2 className={styles.sectionTitle}>🛒 Cart ({cart.length} items)</h2>
        {cart.length > 0 && (
          <button className={styles.clearBtn} onClick={onClear}>
            Clear All
          </button>
        )}
      </div>
      
      {cart.length === 0 ? (
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>🛒</div>
          <p>Your cart is empty</p>
          <p className={styles.emptyHint}>Add some products to get started!</p>
        </div>
      ) : (
        <>
          <div className={styles.items}>
            {cart.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={onUpdateQuantity}
                onRemove={onRemove}
              />
            ))}
          </div>
          <CartSummary cart={cart} />
        </>
      )}
    </div>
  )
}

export default Cart