// ============================================
// EMAIL VALIDATION
// ============================================

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

// ============================================
// PASSWORD VALIDATION
// ============================================

export const isStrongPassword = (password: string): boolean => {
  // At least 6 characters
  return password.length >= 6;
};

// ============================================
// REQUIRED FIELDS VALIDATION
// ============================================

export const validateRequired = (
  fields: Record<string, any>,
  requiredFields: string[]
): { isValid: boolean; missing: string[] } => {
  const missing: string[] = [];
  for (const field of requiredFields) {
    if (!fields[field] || fields[field].toString().trim() === '') {
      missing.push(field);
    }
  }
  return {
    isValid: missing.length === 0,
    missing
  };
};

// ============================================
// TASK STATUS & PRIORITY VALIDATION
// ============================================

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export const isValidStatus = (status: string): status is TaskStatus => {
  const validStatuses: TaskStatus[] = ['pending', 'in-progress', 'completed'];
  return validStatuses.includes(status as TaskStatus);
};

export const isValidPriority = (priority: string): priority is TaskPriority => {
  const validPriorities: TaskPriority[] = ['low', 'medium', 'high'];
  return validPriorities.includes(priority as TaskPriority);
};

// ============================================
// DATE VALIDATION
// ============================================

export const isValidDate = (dateString: string): boolean => {
  if (!dateString) return true; // Optional field
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;
  const date = new Date(dateString);
  return date instanceof Date && !isNaN(date.getTime());
};

// ============================================
// INPUT SANITIZATION (XSS Prevention)
// ============================================

export const sanitizeInput = (input: string): string => {
  if (typeof input !== 'string') return input;
  return input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

// ============================================
// USER VALIDATION
// ============================================

export interface UserValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateRegistration = (data: {
  name: string;
  email: string;
  password: string;
}): UserValidationResult => {
  const errors: string[] = [];

  if (!data.name || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.password || !isStrongPassword(data.password)) {
    errors.push('Password must be at least 6 characters');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateLogin = (data: {
  email: string;
  password: string;
}): UserValidationResult => {
  const errors: string[] = [];

  if (!data.email || !isValidEmail(data.email)) {
    errors.push('Please provide a valid email address');
  }

  if (!data.password) {
    errors.push('Password is required');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// ============================================
// TASK VALIDATION
// ============================================

export interface TaskValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateTask = (
  data: {
    title?: string;
    description?: string;
    status?: string;
    priority?: string;
    dueDate?: string;
  },
  isUpdate: boolean = false
): TaskValidationResult => {
  const errors: string[] = [];

  if (!isUpdate) {
    if (!data.title || data.title.trim().length < 1) {
      errors.push('Title is required');
    }
  }

  if (data.title && data.title.length > 100) {
    errors.push('Title cannot exceed 100 characters');
  }

  if (data.description && data.description.length > 500) {
    errors.push('Description cannot exceed 500 characters');
  }

  if (data.status && !isValidStatus(data.status)) {
    errors.push('Status must be pending, in-progress, or completed');
  }

  if (data.priority && !isValidPriority(data.priority)) {
    errors.push('Priority must be low, medium, or high');
  }

  if (data.dueDate && !isValidDate(data.dueDate)) {
    errors.push('Due date must be in YYYY-MM-DD format');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

// ============================================
// SANITIZATION HELPERS
// ============================================

export interface SanitizedUserData {
  name?: string;
  email?: string;
  password?: string;
}

export const sanitizeUserData = (data: {
  name?: string;
  email?: string;
  password?: string;
}): SanitizedUserData => {
  const sanitized: SanitizedUserData = {};

  if (data.name !== undefined) {
    sanitized.name = sanitizeInput(data.name.trim());
  }
  if (data.email !== undefined) {
    sanitized.email = sanitizeInput(data.email.trim().toLowerCase());
  }
  if (data.password !== undefined) {
    sanitized.password = data.password;
  }

  return sanitized;
};

export interface SanitizedTaskData {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}

export const sanitizeTaskData = (data: {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
}): SanitizedTaskData => {
  const sanitized: SanitizedTaskData = {};

  if (data.title !== undefined) {
    sanitized.title = sanitizeInput(data.title.trim());
  }
  if (data.description !== undefined) {
    sanitized.description = sanitizeInput(data.description.trim());
  }
  if (data.status !== undefined && isValidStatus(data.status)) {
    sanitized.status = data.status;
  }
  if (data.priority !== undefined && isValidPriority(data.priority)) {
    sanitized.priority = data.priority;
  }
  if (data.dueDate !== undefined) {
    sanitized.dueDate = data.dueDate;
  }

  return sanitized;
};

// ============================================
// ID VALIDATION
// ============================================

export const isValidObjectId = (id: string): boolean => {
  // MongoDB ObjectId is 24 characters hex string
  return /^[0-9a-fA-F]{24}$/.test(id);
};

// ============================================
// QUERY PARAMETER VALIDATION
// ============================================

export const isValidSortField = (sort: string): boolean => {
  const validSortFields = ['createdAt', 'dueDate', 'priority', 'title'];
  return validSortFields.includes(sort);
};

export const isValidOrder = (order: string): boolean => {
  return order === 'asc' || order === 'desc';
};