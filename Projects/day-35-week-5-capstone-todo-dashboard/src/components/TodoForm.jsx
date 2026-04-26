import { useState } from 'react'
import styles from './TodoForm.module.css'

function TodoForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'personal',
    dueDate: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.title.trim()) {
      alert('Please enter a title')
      return
    }
    onSubmit(formData)
    setFormData({
      title: '',
      description: '',
      priority: 'medium',
      category: 'personal',
      dueDate: ''
    })
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        className={styles.input}
        placeholder="Task title..."
        value={formData.title}
        onChange={handleChange}
        required
      />
      <textarea
        name="description"
        className={styles.textarea}
        placeholder="Description (optional)"
        value={formData.description}
        onChange={handleChange}
        rows={2}
      />
      <div className={styles.row}>
        <select name="priority" value={formData.priority} onChange={handleChange}>
          <option value="low">🟢 Low Priority</option>
          <option value="medium">🟡 Medium Priority</option>
          <option value="high">🔴 High Priority</option>
        </select>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="personal">👤 Personal</option>
          <option value="work">💼 Work</option>
          <option value="shopping">🛒 Shopping</option>
          <option value="health">🏃 Health</option>
          <option value="other">📌 Other</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <button type="submit" className={styles.submitBtn}>+ Add Task</button>
      </div>
    </form>
  )
}

export default TodoForm