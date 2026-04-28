import UserDirectory from './components/UserDirectory'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <UserDirectory />
      </div>
    </div>
  )
}

export default App