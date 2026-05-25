import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Task, TaskFilters } from '../types';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import TaskFiltersComponent from '../components/TaskFilters';
import TaskStats from '../components/TaskStats';
import LoadingSpinner from '../components/LoadingSpinner';

const DashboardPage: React.FC = () => {
  const { token } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [filters, setFilters] = useState<TaskFilters>({
    status: '',
    priority: '',
    dueDate: '',
    search: '',
    sort: 'createdAt',
    order: 'desc'
  });

  const fetchTasks = async (): Promise<void> => {
    if (!token) return;
    
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.priority) params.append('priority', filters.priority);
      if (filters.dueDate) params.append('dueDate', filters.dueDate);
      if (filters.search) params.append('search', filters.search);
      if (filters.sort) params.append('sort', filters.sort);
      if (filters.order) params.append('order', filters.order);
      
      const response = await api.get<Task[]>(`/tasks?${params.toString()}`);
      setTasks(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filters, token]);

  const handleFilterChange = (key: keyof TaskFilters, value: string): void => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (sort: TaskFilters['sort'], order: TaskFilters['order']): void => {
    setFilters(prev => ({ ...prev, sort, order }));
  };

  const handleSearchChange = (search: string): void => {
    setFilters(prev => ({ ...prev, search }));
  };

  if (loading && tasks.length === 0) {
    return (
      <>
        <Navbar />
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="container">
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ color: 'white', marginBottom: '0.5rem' }}>Task Dashboard</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>Manage and track your tasks</p>
        </div>
        
        <TaskStats tasks={tasks} />
        
        <TaskFiltersComponent
          filters={filters}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          onSearchChange={handleSearchChange}
        />
        
        {error && <div className="error">{error}</div>}
        
        {tasks.length === 0 && !loading ? (
          <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: '#666' }}>No tasks found. Create your first task!</p>
          </div>
        ) : (
          <div className="grid">
            {tasks.map(task => (
              <TaskCard key={task._id} task={task} onTaskUpdate={fetchTasks} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardPage;