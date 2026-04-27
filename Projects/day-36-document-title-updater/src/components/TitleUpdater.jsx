import { useState, useEffect } from 'react'
import styles from './TitleUpdater.module.css'

function TitleUpdater() {
  const [title, setTitle] = useState(() => localStorage.getItem('savedTitle') || '')
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  const [savedMessage, setSavedMessage] = useState(() => {
    const savedTitle = localStorage.getItem('savedTitle')
    return savedTitle ? `Loaded saved title: "${savedTitle}"` : ''
  })

  // ============================================
  // EFFECT 1: Update document title whenever 'title' changes
  // Dependency array: [title] - runs when title changes
  // ============================================
  useEffect(() => {
    if (title) {
      document.title = title
      console.log(`Document title updated to: "${title}"`)
    }
  }, [title])

  // ============================================
  // EFFECT 2: Load saved title from localStorage on mount
  // Dependency array: [] - runs only once after initial render
  // ============================================
  useEffect(() => {
    const savedTitle = localStorage.getItem('savedTitle')
    let timeoutId

    if (savedTitle) {
      timeoutId = setTimeout(() => setSavedMessage(''), 3000)
    }

    console.log('Component mounted - loaded saved title from localStorage')

    return () => {
      clearTimeout(timeoutId)
    }
  }, [])

  // ============================================
  // EFFECT 3: Save title to localStorage whenever it changes (only if not empty)
  // Dependency array: [title] - runs when title changes
  // ============================================
  useEffect(() => {
    if (!title) return

    localStorage.setItem('savedTitle', title)

    let clearMessageId
    const showMessageId = setTimeout(() => {
      setSavedMessage(`Title saved: "${title}"`)
      clearMessageId = setTimeout(() => setSavedMessage(''), 2000)
    }, 0)

    console.log(`Title saved to localStorage: "${title}"`)

    return () => {
      clearTimeout(showMessageId)
      clearTimeout(clearMessageId)
    }
  }, [title])

  // ============================================
  // EFFECT 4: Update current time every 10 seconds with cleanup
  // This demonstrates setInterval with cleanup to prevent memory leaks
  // ============================================
  useEffect(() => {
    console.log('Setting up time interval...')
    
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
      console.log('Time updated:', new Date().toLocaleTimeString())
    }, 10000)

    // Cleanup function - clears interval when component unmounts
    return () => {
      console.log('Cleaning up time interval...')
      clearInterval(intervalId)
    }
  }, []) // Empty array - setup once on mount

  // ============================================
  // EFFECT 5: Log when component mounts and unmounts
  // Demonstrates cleanup on unmount
  // ============================================
  useEffect(() => {
    console.log('🟢 TitleUpdater component MOUNTED')
    
    return () => {
      console.log('🔴 TitleUpdater component UNMOUNTED')
      // Reset document title when component unmounts
      document.title = 'Document Title Updater | useEffect Demo'
    }
  }, [])

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>📄 Document Title Updater</h2>
      <p className={styles.subtitle}>useEffect demonstration with side effects</p>

      <div className={styles.section}>
        <label className={styles.label}>Page Title:</label>
        <input
          type="text"
          className={styles.input}
          placeholder="Enter a title for this page..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <p className={styles.hint}>
          Watch the browser tab title change as you type!
        </p>
      </div>

      {savedMessage && (
        <div className={styles.savedMessage}>
          {savedMessage}
        </div>
      )}

      <div className={styles.infoBox}>
        <h3>🕐 Current Time (updates every 10 seconds)</h3>
        <p className={styles.time}>{currentTime}</p>
        <p className={styles.note}>
          *Open console to see the interval logs
        </p>
      </div>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Current Title:</span>
          <span className={styles.statValue}>{title || '(not set)'}</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>LocalStorage:</span>
          <span className={styles.statValue}>
            {localStorage.getItem('savedTitle') || '(none)'}
          </span>
        </div>
      </div>

      <div className={styles.demoSection}>
        <h3>📋 useEffect Demonstrations:</h3>
        <ul>
          <li><strong>Effect 1:</strong> Updates document title when input changes (dependency: title)</li>
          <li><strong>Effect 2:</strong> Loads saved title from localStorage once (empty array - on mount)</li>
          <li><strong>Effect 3:</strong> Saves title to localStorage when it changes (dependency: title)</li>
          <li><strong>Effect 4:</strong> setInterval that updates time every 10 seconds (with cleanup)</li>
          <li><strong>Effect 5:</strong> Console logs on mount/unmount (with cleanup)</li>
        </ul>
        <p className={styles.consoleNote}>
          🔍 Open browser console (F12) to see all console.log messages from useEffect hooks!
        </p>
      </div>
    </div>
  )
}

export default TitleUpdater