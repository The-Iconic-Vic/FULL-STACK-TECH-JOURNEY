// ============================================
// USER TYPES
// ============================================

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface IUserInput {
  name: string;
  email: string;
  password: string;
}

export interface ILoginInput {
  email: string;
  password: string;
}

export interface IUserResponse {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// ============================================
// TASK TYPES
// ============================================

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface ITask {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date | null;
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITaskInput {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date | null;
}

export interface ITaskUpdate {
  title?: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date | null;
}

export interface IStatusUpdate {
  status: TaskStatus;
}

// ============================================
// API RESPONSE TYPES
// ============================================

export interface IApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  count?: number;
}

export interface IAuthResponse {
  token: string;
  user: IUserResponse;
}

// ============================================
// REQUEST WITH USER TYPES
// ============================================

export interface IUserPayload {
  id: string;
  email: string;
}

export interface IRequestWithUser extends Request {
  user?: IUserResponse;
}

// ============================================
// QUERY PARAMS TYPES
// ============================================

export interface ITaskQueryParams {
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: 'today' | 'week' | 'overdue';
  search?: string;
  sort?: 'createdAt' | 'dueDate' | 'priority';
  order?: 'asc' | 'desc';
}