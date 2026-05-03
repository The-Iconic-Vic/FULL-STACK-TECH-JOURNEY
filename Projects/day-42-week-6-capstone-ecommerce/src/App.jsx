import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { CartProvider } from './contexts/CartContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import NotFoundPage from './pages/NotFoundPage'
import styles from './App.module.css'

function App() {
  return (
    <CartProvider>
      <div className={styles.app}>
        <Navbar />
        <main className={styles.main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className={styles.footer}>
          <p>&copy; 2026 ShopHub | Built with React, Router, Context & useReducer</p>
        </footer>
      </div>
    </CartProvider>
  )
}

export default App