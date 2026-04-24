import TaskItem from './TaskItem'
import styles from './TaskList.module.css'

function TaskList({ tasks, onToggle, onDelete }) {
  return (
    <div className={styles.list}>
      {tasks.map(task => (
        <TaskItem
          key={task.id}  // Important: unique key prop
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TaskList