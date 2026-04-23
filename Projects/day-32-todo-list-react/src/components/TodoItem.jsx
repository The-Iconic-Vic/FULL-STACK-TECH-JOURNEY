import { useState } from 'react'
import styles from './TodoItem.module.css'

function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(todo.text)

  const handleEdit = () => {
    if (isEditing) {
      onEdit(todo.id, editText)
    }
    setIsEditing(!isEditing)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onEdit(todo.id, editText)
      setIsEditing(false)
    }
  }

  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      {isEditing ? (
        <input
          type="text"
          className={styles.editInput}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyPress={handleKeyPress}
          autoFocus
        />
      ) : (
        <span className={styles.text}>{todo.text}</span>
      )}
      
      <div className={styles.actions}>
        <button 
          className={styles.editBtn}
          onClick={handleEdit}
        >
          {isEditing ? '💾' : '✏️'}
        </button>
        <button 
          className={styles.deleteBtn}
          onClick={() => onDelete(todo.id)}
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default TodoItem