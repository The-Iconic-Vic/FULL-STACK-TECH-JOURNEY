import { useState } from 'react'
import TodoItem from './TodoItem'
import styles from './TodoList.module.css'

function TodoList({ todos, onToggle, onUpdate, onDelete, onBulkDelete }) {
  const [selectedIds, setSelectedIds] = useState([])
  const [selectAll, setSelectAll] = useState(false)

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedIds([])
      setSelectAll(false)
    } else {
      setSelectedIds(todos.map(t => t.id))
      setSelectAll(true)
    }
  }

  const handleSelect = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    )
    setSelectAll(false)
  }

  if (todos.length === 0) {
    return (
      <div className={styles.empty}>
        <div className={styles.emptyIcon}>📋</div>
        <h3>No tasks found</h3>
        <p>Add a new task to get started</p>
      </div>
    )
  }

  return (
    <div className={styles.listContainer}>
      <div className={styles.bulkBar}>
        <label className={styles.selectAll}>
          <input
            type="checkbox"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          Select All
        </label>
        {selectedIds.length > 0 && (
          <button
            className={styles.bulkDeleteBtn}
            onClick={() => {
              onBulkDelete(selectedIds)
              setSelectedIds([])
              setSelectAll(false)
            }}
          >
            Delete Selected ({selectedIds.length})
          </button>
        )}
      </div>
      
      <div className={styles.list}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            isSelected={selectedIds.includes(todo.id)}
            onSelect={handleSelect}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  )
}

export default TodoList