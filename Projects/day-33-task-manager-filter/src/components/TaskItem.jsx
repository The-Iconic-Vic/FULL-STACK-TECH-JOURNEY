import styles from './TaskItem.module.css'

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`${styles.taskItem} ${task.completed ? styles.completed : ''}`}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span className={styles.text}>{task.text}</span>
      <button
        className={styles.deleteBtn}
        onClick={() => onDelete(task.id)}
      >
        🗑️
      </button>
    </div>
  )
}

export default TaskItem