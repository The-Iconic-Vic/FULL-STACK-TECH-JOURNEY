import { useState } from 'react'
import { formatDate, getDueDateStatus, getPriorityColor, getPriorityLabel, getCategoryLabel } from '../utils/helpers'
import styles from './TodoItem.module.css'

function TodoItem({ todo, isSelected, onSelect, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(todo.title)
  const [editDescription, setEditDescription] = useState(todo.description || '')

  const dueStatus = getDueDateStatus(todo.dueDate)
  const dueClass = dueStatus === 'overdue' ? styles.overdue : dueStatus === 'today' ? styles.today : ''

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate(todo.id, { title: editTitle, description: editDescription })
      setIsEditing(false)
    }
  }

  const priorityColor = getPriorityColor(todo.priority)

  return (
    <div className={`${styles.todoItem} ${todo.completed ? styles.completed : ''} ${isSelected ? styles.selected : ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={isSelected}
        onChange={() => onSelect(todo.id)}
      />
      
      <input
        type="checkbox"
        className={styles.completeCheckbox}
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      
      {isEditing ? (
        <div className={styles.editContainer}>
          <input
            type="text"
            className={styles.editInput}
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <textarea
            className={styles.editTextarea}
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            rows={2}
          />
          <div className={styles.editActions}>
            <button onClick={handleSaveEdit} className={styles.saveBtn}>Save</button>
            <button onClick={() => setIsEditing(false)} className={styles.cancelBtn}>Cancel</button>
          </div>
        </div>
      ) : (
        <>
          <div className={styles.content}>
            <div className={styles.titleRow}>
              <span className={styles.title}>{todo.title}</span>
              <span className={styles.priority} style={{ backgroundColor: priorityColor }}>
                {getPriorityLabel(todo.priority)}
              </span>
              <span className={styles.category}>{getCategoryLabel(todo.category)}</span>
            </div>
            {todo.description && <p className={styles.description}>{todo.description}</p>}
            <div className={styles.meta}>
              <span className={dueClass}>
                📅 {formatDate(todo.dueDate)}
              </span>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.editBtn} onClick={() => setIsEditing(true)}>✏️</button>
            <button className={styles.deleteBtn} onClick={() => onDelete(todo.id)}>🗑️</button>
          </div>
        </>
      )}
    </div>
  )
}

export default TodoItem