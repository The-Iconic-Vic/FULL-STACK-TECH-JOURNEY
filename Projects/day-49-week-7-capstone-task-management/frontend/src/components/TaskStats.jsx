import React from 'react'

function TaskStats({ tasks }) {
  const total = tasks.length
  const pending = tasks.filter(t => t.status === 'pending').length
  const inProgress = tasks.filter(t => t.status === 'in-progress').length
  const completed = tasks.filter(t => t.status === 'completed').length
  const percentComplete = total === 0 ? 0 : Math.round((completed / total) * 100)

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
      gap: '1rem',
      marginBottom: '1.5rem'
    }}>
      <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>{total}</div>
        <div style={{ fontSize: '0.75rem', color: '#666' }}>Total Tasks</div>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#6c757d' }}>{pending}</div>
        <div style={{ fontSize: '0.75rem', color: '#666' }}>Pending</div>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#17a2b8' }}>{inProgress}</div>
        <div style={{ fontSize: '0.75rem', color: '#666' }}>In Progress</div>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
        <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#28a745' }}>{completed}</div>
        <div style={{ fontSize: '0.75rem', color: '#666' }}>Completed</div>
      </div>
      <div className="card" style={{ textAlign: 'center', padding: '1rem' }}>
        <div style={{
          background: '#e0e0e0',
          borderRadius: '10px',
          height: '8px',
          overflow: 'hidden',
          marginBottom: '0.5rem'
        }}>
          <div style={{
            width: `${percentComplete}%`,
            height: '100%',
            background: '#28a745',
            transition: 'width 0.3s ease'
          }}></div>
        </div>
        <div style={{ fontSize: '0.75rem', color: '#666' }}>{percentComplete}% Complete</div>
      </div>
    </div>
  )
}

export default TaskStats