export function formatDate(dateString) {
  if (!dateString) return 'No due date'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function getDueDateStatus(dueDate) {
  if (!dueDate) return 'none'
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dueDate)
  due.setHours(0, 0, 0, 0)
  
  if (due < today) return 'overdue'
  if (due.getTime() === today.getTime()) return 'today'
  return 'future'
}

export function getPriorityColor(priority) {
  switch(priority) {
    case 'high': return '#dc3545'
    case 'medium': return '#ffc107'
    case 'low': return '#28a745'
    default: return '#6c757d'
  }
}

export function getPriorityLabel(priority) {
  switch(priority) {
    case 'high': return '🔴 High'
    case 'medium': return '🟡 Medium'
    case 'low': return '🟢 Low'
    default: return '⚪ None'
  }
}

export function getCategoryLabel(category) {
  switch(category) {
    case 'work': return '💼 Work'
    case 'personal': return '👤 Personal'
    case 'shopping': return '🛒 Shopping'
    case 'health': return '🏃 Health'
    default: return '📌 Other'
  }
}