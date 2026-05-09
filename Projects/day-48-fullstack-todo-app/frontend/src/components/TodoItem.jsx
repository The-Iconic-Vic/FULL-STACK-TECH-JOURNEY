import React, { useState } from 'react'

function TodoItem({ todo, onToggle, onDelete }) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    setIsDeleting(true)
    await onDelete(todo._id)
    setIsDeleting(false)
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem',
      padding: '1rem',
      background: '#f8f9fa',
      borderRadius: '12px',
      opacity: todo.completed ? 0.6 : 1
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo._id, todo.completed)}
        style={{ width: '22px', height: '22px', cursor: 'pointer' }}
      />
      <span style={{
        flex: 1,
        fontSize: '1rem',
        textDecoration: todo.completed ? 'line-through' : 'none',
        color: todo.completed ? '#999' : '#333'
      }}>
        {todo.title}
      </span>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', padding: '0.25rem' }}
      >
        🗑️
      </button>
    </div>
  )
}

export default TodoItem