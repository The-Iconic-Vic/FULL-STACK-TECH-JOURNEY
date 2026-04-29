import 'react'
import ToggleDemo from './components/ToggleDemo'
import PostsList from './components/PostsList'
import UsersList from './components/UsersList'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>🎣 Custom Hooks Demo</h1>
        <p className={styles.subtitle}>
          Demonstrating: useToggle, useLocalStorage, useFetch, useWindowSize
        </p>

        <ToggleDemo />

        <div className={styles.grid}>
          <PostsList />
          <UsersList />
        </div>

        <div className={styles.info}>
          <h3>📦 Custom Hooks Created</h3>
          <ul>
            <li><strong>useToggle</strong> - Boolean toggle with setter</li>
            <li><strong>useLocalStorage</strong> - Sync state with localStorage</li>
            <li><strong>useFetch</strong> - Reusable data fetching with caching</li>
            <li><strong>useWindowSize</strong> - Track window dimensions</li>
          </ul>
          <p>💡 Open console to see caching in action!</p>
        </div>
      </div>
    </div>
  )
}

export default App