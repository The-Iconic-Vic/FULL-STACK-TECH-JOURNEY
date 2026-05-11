export const formatDate = (dateString) => {
  if (!dateString) return 'No due date'
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export const getPriorityColor = (priority) => {
  switch(priority) {
    case 'high': return '#dc3545'
    case 'medium': return '#ffc107'
    case 'low': return '#28a745'
    default: return '#6c757d'
  }
}

export const getPriorityLabel = (priority) => {
  switch(priority) {
    case 'high': return '🔴 High'
    case 'medium': return '🟡 Medium'
    case 'low': return '🟢 Low'
    default: return '⚪ None'
  }
}

export const getStatusLabel = (status) => {
  switch(status) {
    case 'pending': return '⏳ Pending'
    case 'in-progress': return '🔄 In Progress'
    case 'completed': return '✅ Completed'
    default: return status
  }
}

export const getStatusColor = (status) => {
  switch(status) {
    case 'pending': return '#6c757d'
    case 'in-progress': return '#17a2b8'
    case 'completed': return '#28a745'
    default: return '#6c757d'
  }
}