// ============================================
// AUTH TYPES
// ============================================

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

// ============================================
// TASK TYPES
// ============================================

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string | null;
  user: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewTask {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: string;
}

export type TaskUpdate = Partial<Pick<Task, 'title' | 'description' | 'status' | 'priority' | 'dueDate'>>;

// ============================================
// FILTER TYPES
// ============================================

export interface TaskFilters {
  status: TaskStatus | '';
  priority: TaskPriority | '';
  dueDate: 'today' | 'week' | 'overdue' | '';
  search: string;
  sort: 'createdAt' | 'dueDate' | 'priority';
  order: 'asc' | 'desc';
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

export const getPriorityColor = (priority: TaskPriority): string => {
  switch(priority) {
    case 'high': return '#dc3545';
    case 'medium': return '#ffc107';
    case 'low': return '#28a745';
    default: return '#6c757d';
  }
}

export const getPriorityLabel = (priority: TaskPriority): string => {
  switch(priority) {
    case 'high': return '🔴 High';
    case 'medium': return '🟡 Medium';
    case 'low': return '🟢 Low';
    default: return '⚪ None';
  }
}

export const getStatusLabel = (status: TaskStatus): string => {
  switch(status) {
    case 'pending': return '⏳ Pending';
    case 'in-progress': return '🔄 In Progress';
    case 'completed': return '✅ Completed';
    default: return status;
  }
}

export const getStatusColor = (status: TaskStatus): string => {
  switch(status) {
    case 'pending': return '#6c757d';
    case 'in-progress': return '#17a2b8';
    case 'completed': return '#28a745';
    default: return '#6c757d';
  }
}

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return 'No due date';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}