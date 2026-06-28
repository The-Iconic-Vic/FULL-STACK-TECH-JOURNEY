import React from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import { Task, getPriorityColor, getPriorityLabel, getStatusLabel, getStatusColor, formatDate } from '../types';

interface TaskCardProps {
  task: Task;
  onTaskUpdate: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onTaskUpdate }) => {
  const navigate = useNavigate();

  const handleStatusChange = async (newStatus: Task['status']): Promise<void> => {
    try {
      await api.put(`/tasks/${task._id}/status`, { status: newStatus });
      onTaskUpdate();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await api.delete(`/tasks/${task._id}`);
        onTaskUpdate();
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    }
  };

  return (
    <div className="card" style={{ borderLeft: `4px solid ${getPriorityColor(task.priority)}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600' }}>{task.title}</h3>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button
            onClick={() => navigate(`/tasks/${task._id}/edit`)}
            style={{ background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer' }}
          >
            ✏️
          </button>
          <button
            onClick={handleDelete}
            style={{ background: 'none', border: 'none', fontSize: '1rem', cursor: 'pointer', color: '#dc3545' }}
          >
            🗑️
          </button>
        </div>
      </div>
      
      {task.description && (
        <p style={{ color: '#666', fontSize: '0.875rem', marginBottom: '1rem' }}>{task.description}</p>
      )}
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
        <span style={{
          background: getStatusColor(task.status),
          color: 'white',
          padding: '0.2rem 0.5rem',
          borderRadius: '20px',
          fontSize: '0.7rem'
        }}>
          {getStatusLabel(task.status)}
        </span>
        <span style={{
          background: getPriorityColor(task.priority),
          color: 'white',
          padding: '0.2rem 0.5rem',
          borderRadius: '20px',
          fontSize: '0.7rem'
        }}>
          {getPriorityLabel(task.priority)}
        </span>
        <span style={{ color: '#999', fontSize: '0.7rem' }}>
          📅 {formatDate(task.dueDate)}
        </span>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
        <select
          value={task.status}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleStatusChange(e.target.value as Task['status'])}
          style={{
            padding: '0.3rem 0.6rem',
            border: '1px solid #e0e0e0',
            borderRadius: '6px',
            fontSize: '0.75rem',
            cursor: 'pointer'
          }}
        >
          <option value="pending">⏳ Pending</option>
          <option value="in-progress">🔄 In Progress</option>
          <option value="completed">✅ Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TaskCard;