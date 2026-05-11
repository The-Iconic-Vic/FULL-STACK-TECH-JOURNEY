import React from 'react'

function TaskFilters({ filters, onFilterChange, onSortChange, onSearchChange }) {
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
          onChange={(e) => onSearchChange(e.target.value)}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        />
      </div>
      
      <div style={{ flex: 1 }}>
        <label style={{ display: 'block', fontSize: '0.7rem', fontWeight: '600', marginBottom: '0.25rem' }}>Status</label>
        <select
          value={filters.status}
          onChange={(e) => onFilterChange('status', e.target.value)}
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
          onChange={(e) => onFilterChange('priority', e.target.value)}
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
          onChange={(e) => onFilterChange('dueDate', e.target.value)}
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
          onChange={(e) => onSortChange(e.target.value, filters.order)}
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
          onChange={(e) => onSortChange(filters.sort, e.target.value)}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #e0e0e0', borderRadius: '6px' }}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  )
}

export default TaskFilters