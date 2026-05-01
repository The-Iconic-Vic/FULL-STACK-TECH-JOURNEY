// eslint-disable-next-line no-unused-vars
import React from 'react'
import { ThemeProvider } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import styles from './App.module.css'

function App() {
  return (
    <ThemeProvider>
      <div className={styles.app}>
        <Navbar />
        <HomePage />
      </div>
    </ThemeProvider>
  )
}

export default App