import React from 'react';
import { useTodo } from '../contexts/TodoContext';

const TodoFilter: React.FC = () => {
  const { filter, setFilter, stats } = useTodo();

  const filters: Array<{ value: 'all' | 'active' | 'completed'; label: string }> = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' },
  ];

  return (
    <div>
      <div className="filter-buttons">
        {filters.map(f => (
          <button
            key={f.value}
            className={`btn btn-secondary ${filter === f.value ? 'active' : ''}`}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>
      <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
        Total: {stats.total} | Active: {stats.active} | Completed: {stats.completed}
      </p>
    </div>
  );
};

export default TodoFilter;