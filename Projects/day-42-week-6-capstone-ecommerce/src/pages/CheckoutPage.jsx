import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { formatPrice } from '../utils/helpers'
import styles from './CheckoutPage.module.css'

function CheckoutPage() {
  const navigate = useNavigate()
  const { cart, totalPrice, clearCart } = useCart()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [submitted, setSubmitted] = useState(false)

  if (cart.length === 0) {
    navigate('/cart')
    return null
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate order processing
    setTimeout(() => {
      clearCart()
      setSubmitted(true)
    }, 1000)
  }

  if (submitted) {
    return (
      <div className={styles.container}>
        <div className={styles.success}>
          <div className={styles.successIcon}>🎉</div>
          <h2>Order Confirmed!</h2>
          <p>Thank you for your purchase. Your order has been confirmed.</p>
          <button onClick={() => navigate('/')} className={styles.homeBtn}>
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Checkout</h1>
      
      <div className={styles.checkout}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.section}>
            <h3>Personal Information</h3>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>First Name</label>
                <input type="text" name="firstName" required onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>Last Name</label>
                <input type="text" name="lastName" required onChange={handleChange} />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input type="email" name="email" required onChange={handleChange} />
            </div>
          </div>
          
          <div className={styles.section}>
            <h3>Shipping Address</h3>
            <div className={styles.formGroup}>
              <label>Address</label>
              <input type="text" name="address" required onChange={handleChange} />
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>City</label>
                <input type="text" name="city" required onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>ZIP Code</label>
                <input type="text" name="zipCode" required onChange={handleChange} />
              </div>
            </div>
          </div>
          
          <div className={styles.section}>
            <h3>Payment Information</h3>
            <div className={styles.formGroup}>
              <label>Card Number</label>
              <input type="text" name="cardNumber" placeholder="1234 5678 9012 3456" required onChange={handleChange} />
            </div>
            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label>Expiry Date</label>
                <input type="text" name="expiryDate" placeholder="MM/YY" required onChange={handleChange} />
              </div>
              <div className={styles.formGroup}>
                <label>CVV</label>
                <input type="text" name="cvv" placeholder="123" required onChange={handleChange} />
              </div>
            </div>
          </div>
          
          <button type="submit" className={styles.placeOrderBtn}>
            Place Order - {formatPrice(totalPrice + 5.99 + totalPrice * 0.1)}
          </button>
        </form>
        
        <div className={styles.orderSummary}>
          <h3>Order Summary</h3>
          {cart.map(item => (
            <div key={item.id} className={styles.orderItem}>
              <span>{item.title} x{item.quantity}</span>
              <span>{formatPrice(item.price * item.quantity)}</span>
            </div>
          ))}
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
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage