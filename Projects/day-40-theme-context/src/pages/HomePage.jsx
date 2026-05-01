import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import Card from '../components/Card'
import styles from './HomePage.module.css'

function HomePage() {
  const { isDark } = useTheme()

  const cards = [
    { id: 1, title: 'What is Context API?', description: 'Context provides a way to pass data through the component tree without having to pass props down manually at every level.' },
    { id: 2, title: 'When to Use Context', description: 'Use Context for global state like theme, user authentication, language preferences, and shopping cart.' },
    { id: 3, title: 'Context vs Props', description: 'Props are for direct parent-child communication. Context is for data needed by many components at different levels.' },
    { id: 4, title: 'Performance Considerations', description: 'Context re-renders all consumers when value changes. Split contexts for different concerns.' }
  ]

  return (
    <div className={`${styles.home} ${isDark ? styles.dark : styles.light}`}>
      <div className={styles.container}>
        <h1 className={styles.title}>🎣 React Context API</h1>
        <p className={styles.subtitle}>
          Solving prop drilling by sharing state across many components
        </p>

        <div className={styles.grid}>
          {cards.map(card => (
            <Card key={card.id} title={card.title} description={card.description} />
          ))}
        </div>

        <div className={styles.info}>
          <h3>📖 How Theme Context Works</h3>
          <ul>
            <li><strong>createContext()</strong> - Creates a Context object</li>
            <li><strong>Provider</strong> - Wraps components that need access</li>
            <li><strong>useContext()</strong> - Consumes the context value</li>
            <li><strong>localStorage</strong> - Persists theme preference</li>
          </ul>
          <p className={styles.note}>
            💡 Notice how the navbar, toggle button, and cards all respond to theme changes 
            without passing props through intermediate components!
          </p>
        </div>
      </div>
    </div>
  )
}

export default HomePage