import ThemeToggle from './ThemeToggle'
import styles from './Header.module.css'

function Header({ theme, onToggleTheme }) {
  return (
    <header className={styles.header}>
      <div>
        <h1 className={styles.title}>📋 Todo Dashboard</h1>
        <p className={styles.subtitle}>Manage your tasks efficiently</p>
      </div>
      <ThemeToggle theme={theme} onToggle={onToggleTheme} />
    </header>
  )
}

export default Header