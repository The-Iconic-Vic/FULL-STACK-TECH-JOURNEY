import { useState } from 'react'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import TodoStats from './components/TodoStats'
import styles from './App.module.css'

function App() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React useState', completed: false },
    { id: 2, text: 'Build a todo app', completed: false },
    { id: 3, text: 'Master event handling', completed: true }
  ])

  // Add new todo
  const addTodo = (text) => {
    if (text.trim() === '') return
    
    const newTodo = {
      id: Date.now(),
      text: text,
      completed: false
    }
    setTodos([...todos, newTodo])
  }

  // Toggle todo completion
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  // Edit todo
  const editTodo = (id, newText) => {
    if (newText.trim() === '') return
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText } : todo
    ))
  }

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <h1 className={styles.title}>✅ Todo List</h1>
        <p className={styles.subtitle}>Manage your tasks with React state</p>
        
        <TodoInput onAdd={addTodo} />
        
        <TodoList 
          todos={todos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
          onEdit={editTodo}
        />
        
        <TodoStats todos={todos} />
      </div>
    </div>
  )
}

export default App