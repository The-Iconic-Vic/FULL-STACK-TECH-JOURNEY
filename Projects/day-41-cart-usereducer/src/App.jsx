import React from 'react'
import { CartProvider } from './contexts/CartContext'
import Navbar from './components/Navbar'
import ProductsPage from './pages/ProductsPage'
import CartPage from './pages/CartPage'
import styles from './App.module.css'

function App() {
  const [currentPage, setCurrentPage] = React.useState('products')

  return (
    <CartProvider>
      <div className={styles.app}>
        <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
        <main className={styles.main}>
          {currentPage === 'products' ? (
            <ProductsPage />
          ) : (
            <CartPage onNavigate={setCurrentPage} />
          )}
        </main>
      </div>
    </CartProvider>
  )
}

export default App