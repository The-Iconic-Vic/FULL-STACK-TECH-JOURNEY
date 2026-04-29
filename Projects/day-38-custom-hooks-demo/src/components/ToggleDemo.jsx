import 'react'
import useToggle from '../hooks/useToggle'
import useLocalStorage from '../hooks/useLocalStorage'
import useWindowSize from '../hooks/useWindowSize'
import styles from './ToggleDemo.module.css'

function ToggleDemo() {
  // Use multiple toggle hooks for different UI elements
  const [isModalOpen, , openModal, closeModal] = useToggle(false)
  const [isDropdownOpen, toggleDropdown] = useToggle(false)
  const [isDarkMode, toggleDarkMode] = useToggle(false)
  
  // Use localStorage hook for theme persistence
  const [savedTheme, setSavedTheme] = useLocalStorage('theme', 'light')
  
  // Use window size hook
  const windowSize = useWindowSize()

  // Sync dark mode with localStorage
  const handleDarkModeToggle = () => {
    toggleDarkMode()
    setSavedTheme(isDarkMode ? 'light' : 'dark')
  }

  return (
    <div className={`${styles.demo} ${isDarkMode ? styles.dark : ''}`}>
      <div className={styles.header}>
        <h2>🎯 useToggle Demo</h2>
        <button onClick={handleDarkModeToggle} className={styles.themeBtn}>
          {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <div className={styles.infoRow}>
        <span>Window Size: {windowSize.width} x {windowSize.height}</span>
        <span>Saved Theme: {savedTheme}</span>
      </div>

      <div className={styles.buttons}>
        <button onClick={openModal} className={styles.btn}>
          Open Modal
        </button>
        <button onClick={toggleDropdown} className={styles.btn}>
          {isDropdownOpen ? 'Close Dropdown' : 'Open Dropdown'}
        </button>
      </div>

      {/* Modal Example */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3>Modal Window</h3>
            <p>This modal is controlled by the useToggle hook!</p>
            <button onClick={closeModal} className={styles.closeBtn}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Dropdown Example */}
      {isDropdownOpen && (
        <div className={styles.dropdown}>
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        </div>
      )}

      <div className={styles.codeExample}>
        <h4>📖 How to use useToggle:</h4>
        <pre>
          {`const [isOpen, toggle, open, close] = useToggle(false)

// Usage:
isOpen    // false
toggle()  // toggles between true/false
open()    // sets to true
close()   // sets to false`}
        </pre>
      </div>
    </div>
  )
}

export default ToggleDemo