import React from 'react';
import { TaskFilters } from '../types';

interface TaskFiltersProps {
  filters: TaskFilters;
  onFilterChange: (key: keyof TaskFilters, value: string) => void;
  onSortChange: (sort: TaskFilters['sort'], order: TaskFilters['order']) => void;
  onSearchChange: (search: string) => void;
}

const TaskFiltersComponent: React.FC<TaskFiltersProps> = ({
  filters,
  onFilterChange,
  onSortChange,
  onSearchChange
}) => {
  return (
    <div style={{
      background: 'white',
      borderRadius: '16px',
      padding: '1rem',
      marginBottom: '1.5rem',
      display: 'flex',
      flexWrap: 'wrap',
      gap: '1rem',
      alignItems: 'flex-end'
    }}>
      <div style={{ flex: 2 }}>
        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '600', marginBottom: '0.25rem' }}>Search</label>
        <input
          type="text"
          placeholder="Search by title..."
          value={filters.search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        />
      </div>
      
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '600', marginBottom: '0.25rem' }}>Status</label>
        <select
          value={filters.status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onFilterChange('status', e.target.value)}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '600', marginBottom: '0.25rem' }}>Priority</label>
        <select
          value={filters.priority}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onFilterChange('priority', e.target.value)}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        >
          <option value="">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '600', marginBottom: '0.25rem' }}>Due Date</label>
        <select
          value={filters.dueDate}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onFilterChange('dueDate', e.target.value)}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        >
          <option value="">All</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
      
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '600', marginBottom: '0.25rem' }}>Sort By</label>
        <select
          value={filters.sort}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value as TaskFilters['sort'], filters.order)}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        >
          <option value="createdAt">Date Created</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
      </div>
      
      <div style={{ flex: 0.5 }}>
        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '600', marginBottom: '0.25rem' }}>Order</label>
        <select
          value={filters.order}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSortChange(filters.sort, e.target.value as TaskFilters['order'])}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};

export default TaskFiltersComponent;