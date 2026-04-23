import TodoItem from './TodoItem'
import styles from './TodoList.module.css'

function TodoList({ todos, onToggle, onDelete, onEdit }) {
  if (todos.length === 0) {
    return (
      <div className={styles.empty}>
        <p>🎉 No tasks! Add one above</p>
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}

export default TodoList