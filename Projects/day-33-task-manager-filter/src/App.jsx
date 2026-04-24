import { useState } from 'react'
import TaskList from './components/TaskList'
import TaskFilter from './components/TaskFilter'
import TaskStats from './components/TaskStats'
import styles from './App.module.css'

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React useState', completed: false },
    { id: 2, text: 'Master conditional rendering', completed: false },
    { id: 3, text: 'Build a task manager', completed: true },
    { id: 4, text: 'Review React concepts', completed: false },
    { id: 5, text: 'Practice with filters', completed: false }
  ])

  const [filter, setFilter] = useState('all')
  const [newTaskText, setNewTaskText] = useState('')

  // Add new task
  const addTask = () => {
    if (newTaskText.trim() === '') return
    const newTask = {
      id: Date.now(),
      text: newTaskText,
      completed: false
    }
    setTasks([...tasks, newTask])
    setNewTaskText('')
  }

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  // Delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true // 'all'
  })

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>📋 Task Manager</h1>
        <p className={styles.subtitle}>Filter, manage, and track your tasks</p>

        {/* Add Task Form */}
        <div className={styles.addForm}>
          <input
            type="text"
            className={styles.input}
            placeholder="Add a new task..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
          />
          <button className={styles.addBtn} onClick={addTask}>
            Add Task
          </button>
        </div>

        {/* Filter Component */}
        <TaskFilter currentFilter={filter} onFilterChange={setFilter} />

        {/* Stats Component */}
        <TaskStats tasks={tasks} />

        {/* Task List with Conditional Rendering */}
        {filteredTasks.length === 0 ? (
          <div className={styles.emptyState}>
            <p>🎯 No tasks found for "{filter}" filter</p>
            <p>Try adding a new task or changing the filter</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        )}
      </div>
    </div>
  )
}

export default App