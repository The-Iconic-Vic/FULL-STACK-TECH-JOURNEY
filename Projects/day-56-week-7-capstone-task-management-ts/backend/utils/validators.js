/**
 * Validation utilities for request data
 */

// Validate email format
const isValidEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  return emailRegex.test(email)
}

// Validate password strength
const isStrongPassword = (password) => {
  // At least 6 characters
  return password && password.length >= 6
}

// Validate required fields
const validateRequired = (fields, requiredFields) => {
  const missing = []
  for (const field of requiredFields) {
    if (!fields[field] || fields[field].toString().trim() === '') {
      missing.push(field)
    }
  }
  return {
    isValid: missing.length === 0,
    missing
  }
}

// Validate task status
const isValidStatus = (status) => {
  const validStatuses = ['pending', 'in-progress', 'completed']
  return validStatuses.includes(status)
}

// Validate task priority
const isValidPriority = (priority) => {
  const validPriorities = ['low', 'medium', 'high']
  return validPriorities.includes(priority)
}

// Validate date format (YYYY-MM-DD)
const isValidDate = (dateString) => {
  if (!dateString) return true // Optional field
  const regex = /^\d{4}-\d{2}-\d{2}$/
  if (!regex.test(dateString)) return false
  const date = new Date(dateString)
  return date instanceof Date && !isNaN(date)
}

// Sanitize input (prevent XSS)
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

// Validate registration data
const validateRegistration = (data) => {
  const errors = []
  
  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters')
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please provide a valid email address')
  }
  
  if (!data.password || !isStrongPassword(data.password)) {
    errors.push('Password must be at least 6 characters')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate login data
const validateLogin = (data) => {
  const errors = []
  
  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please provide a valid email address')
  }
  
  if (!data.password) {
    errors.push('Password is required')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Validate task data
const validateTask = (data, isUpdate = false) => {
  const errors = []
  
  if (!isUpdate) {
    if (!data.title || data.title.trim().length < 1) {
      errors.push('Title is required')
    }
  }
  
  if (data.title && data.title.length > 100) {
    errors.push('Title cannot exceed 100 characters')
  }
  
  if (data.description && data.description.length > 500) {
    errors.push('Description cannot exceed 500 characters')
  }
  
  if (data.status && !isValidStatus(data.status)) {
    errors.push('Status must be pending, in-progress, or completed')
  }
  
  if (data.priority && !isValidPriority(data.priority)) {
    errors.push('Priority must be low, medium, or high')
  }
  
  if (data.dueDate && !isValidDate(data.dueDate)) {
    errors.push('Due date must be in YYYY-MM-DD format')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}

// Sanitize task data
const sanitizeTaskData = (data) => {
  const sanitized = {}
  
  if (data.title !== undefined) sanitized.title = sanitizeInput(data.title.trim())
  if (data.description !== undefined) sanitized.description = sanitizeInput(data.description.trim())
  if (data.status !== undefined) sanitized.status = data.status
  if (data.priority !== undefined) sanitized.priority = data.priority
  if (data.dueDate !== undefined) sanitized.dueDate = data.dueDate
  
  return sanitized
}

// Sanitize user data
const sanitizeUserData = (data) => {
  const sanitized = {}
  
  if (data.name !== undefined) sanitized.name = sanitizeInput(data.name.trim())
  if (data.email !== undefined) sanitized.email = sanitizeInput(data.email.trim().toLowerCase())
  if (data.password !== undefined) sanitized.password = data.password
  
  return sanitized
}

module.exports = {
  isValidEmail,
  isStrongPassword,
  validateRequired,
  isValidStatus,
  isValidPriority,
  isValidDate,
  sanitizeInput,
  validateRegistration,
  validateLogin,
  validateTask,
  sanitizeTaskData,
  sanitizeUserData
}