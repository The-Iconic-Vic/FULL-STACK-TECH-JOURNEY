import React, { useState, useMemo } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import Header from './components/Header'
import StatsDashboard from './components/StatsDashboard'
import TodoForm from './components/TodoForm'
import FilterBar from './components/FilterBar'
import TodoList from './components/TodoList'
import ExportImport from './components/ExportImport'
import styles from './App.module.css'

function App() {
  const [todos, setTodos] = useLocalStorage('todos', [])
  const [filter, setFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date-asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [theme, setTheme] = useLocalStorage('theme', 'light')

  // Apply theme to body
  React.useEffect(() => {
    document.body.className = theme
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  // Add todo
  const addTodo = (newTodo) => {
    setTodos([...todos, { ...newTodo, id: Date.now(), completed: false, createdAt: new Date().toISOString() }])
  }

  // Update todo
  const updateTodo = (id, updates) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, ...updates } : todo))
  }

  // Delete todo
  const deleteTodo = (id) => {
    if (window.confirm('Delete this todo?')) {
      setTodos(todos.filter(todo => todo.id !== id))
    }
  }

  // Toggle complete
  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  // Bulk delete
  const bulkDelete = (ids) => {
    if (window.confirm(`Delete ${ids.length} selected todos?`)) {
      setTodos(todos.filter(todo => !ids.includes(todo.id)))
    }
  }

  // Filter and sort todos
  const filteredAndSortedTodos = useMemo(() => {
    let result = [...todos]

    // Filter by status
    if (filter === 'active') {
      result = result.filter(todo => !todo.completed)
    } else if (filter === 'completed') {
      result = result.filter(todo => todo.completed)
    }

    // Filter by search
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(todo =>
        todo.title.toLowerCase().includes(term) ||
        todo.description?.toLowerCase().includes(term)
      )
    }

    // Sort
    switch(sortBy) {
      case 'date-asc':
        result.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
        break
      case 'date-desc':
        result.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate))
        break
      case 'priority': {
        const priorityOrder = { high: 3, medium: 2, low: 1 }
        result.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority])
        break
      }
      case 'alpha-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'alpha-desc':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        break
    }

    return result
  }, [todos, filter, sortBy, searchTerm])

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length,
    percent: todos.length === 0 ? 0 : Math.round((todos.filter(t => t.completed).length / todos.length) * 100)
  }

  return (
    <div className={`${styles.app} ${theme}`}>
      <div className={styles.container}>
        <Header theme={theme} onToggleTheme={toggleTheme} />
        <StatsDashboard stats={stats} />
        <TodoForm onSubmit={addTodo} />
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          sortBy={sortBy}
          onSortChange={setSortBy}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <TodoList
          todos={filteredAndSortedTodos}
          onToggle={toggleComplete}
          onUpdate={updateTodo}
          onDelete={deleteTodo}
          onBulkDelete={bulkDelete}
        />
        <ExportImport todos={todos} onImport={setTodos} />
      </div>
    </div>
  )
}

export default App