import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import apiFetch from '../services/api'

function TodoPage() {
  const { user, logout } = useAuth()
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newTodoTitle, setNewTodoTitle] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fetchTodos = async () => {
    try {
      const data = await apiFetch('/todos')
      setTodos(data.data)
    } catch (err) {
      console.error('Fetch error:', err)
      setError('Failed to load todos: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const addTodo = async (e) => {
    e.preventDefault()
    if (!newTodoTitle.trim()) return

    setSubmitting(true)
    try {
      const data = await apiFetch('/todos', {
        method: 'POST',
        body: JSON.stringify({ title: newTodoTitle })
      })
      setTodos([data.data, ...todos])
      setNewTodoTitle('')
      setError('')
    } catch (err) {
      console.error('Add todo error:', err)
      setError('Failed to add todo: ' + err.message)
    } finally {
      setSubmitting(false)
    }
  }

  const toggleTodo = async (id, completed) => {
    try {
      const data = await apiFetch(`/todos/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ completed: !completed })
      })
      setTodos(todos.map(todo => todo._id === id ? data.data : todo))
    } catch (err) {
      console.error('Toggle error:', err)
      setError('Failed to update todo')
    }
  }

  const deleteTodo = async (id) => {
    try {
      await apiFetch(`/todos/${id}`, { method: 'DELETE' })
      setTodos(todos.filter(todo => todo._id !== id))
    } catch (err) {
      console.error('Delete error:', err)
      setError('Failed to delete todo')
    }
  }

  if (loading) {
    return <div className="loading">Loading todos...</div>
  }

  return (
    <>
      <nav style={{
        background: 'white',
        padding: '1rem 2rem',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a1a2e' }}>
          ✅ Todo App
        </div>
        <div>
          <span style={{ marginRight: '1rem' }}>Welcome, {user?.name}!</span>
          <button
            onClick={logout}
            style={{
              background: '#dc3545',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              cursor: 'pointer'
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container">
        <div style={{ background: 'white', borderRadius: '20px', padding: '2rem', marginTop: '2rem' }}>
          <h1>My Todos</h1>
          
          {error && <div className="error">{error}</div>}
          
          <form onSubmit={addTodo} style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Add a new todo..."
              style={{ flex: 1, padding: '0.75rem', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '1rem' }}
            />
            <button
              type="submit"
              disabled={submitting}
              style={{ padding: '0.75rem 1.5rem', background: '#28a745', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
            >
              Add
            </button>
          </form>

          {todos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#999' }}>
              No todos yet. Add one above!
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {todos.map(todo => (
                <div key={todo._id} style={{
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
                    onChange={() => toggleTodo(todo._id, todo.completed)}
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
                    onClick={() => deleteTodo(todo._id)}
                    style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default TodoPage