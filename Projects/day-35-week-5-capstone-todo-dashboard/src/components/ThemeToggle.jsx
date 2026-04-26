import styles from './ThemeToggle.module.css'

function ThemeToggle({ theme, onToggle }) {
  return (
    <button className={styles.toggle} onClick={onToggle}>
      {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
    </button>
  )
}

export default ThemeToggle