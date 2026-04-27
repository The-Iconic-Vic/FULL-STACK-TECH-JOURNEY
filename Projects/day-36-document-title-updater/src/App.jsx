import TitleUpdater from './components/TitleUpdater'
import styles from './App.module.css'

function App() {
  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <TitleUpdater />
      </div>
    </div>
  )
}

export default App