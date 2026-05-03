import React from 'react'
import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

function HomePage() {
  return (
    <div className={styles.home}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>Welcome to ShopHub</h1>
        <p className={styles.heroSubtitle}>Discover amazing products at great prices</p>
        <Link to="/products" className={styles.ctaBtn}>
          Shop Now
        </Link>
      </div>
      
      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over $50</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>🛡️</div>
          <h3>Secure Payment</h3>
          <p>100% secure transactions</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>🔄</div>
          <h3>Easy Returns</h3>
          <p>30-day return policy</p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>🎧</div>
          <h3>24/7 Support</h3>
          <p>Dedicated customer service</p>
        </div>
      </div>
    </div>
  )
}

export default HomePage