import { useState } from 'react'
import styles from './TodoInput.module.css'

function TodoInput({ onAdd }) {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (inputValue.trim()) {
      onAdd(inputValue)
      setInputValue('')
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.input}
        placeholder="What needs to be done?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        Add Task
      </button>
    </form>
  )
}

export default TodoInput