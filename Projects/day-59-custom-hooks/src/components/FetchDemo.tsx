import React from 'react';
import useFetch from '../hooks/useFetch';
import { User } from '../types';

const FetchDemo: React.FC = () => {
  const { data: users, loading, error, refetch } = useFetch<User[]>('https://jsonplaceholder.typicode.com/users');

  return (
    <div className="card">
      <h2>🌐 useFetch&lt;T&gt;</h2>
      <p className="hook-type">{'{ data, loading, error, refetch }'}</p>
      
      {loading && <div className="loading-spinner">Loading users...</div>}
      
      {error && <div className="error-message">Error: {error}</div>}
      
      {users && (
        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {users.slice(0, 5).map(user => (
            <div key={user.id} style={{ padding: '0.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <strong>{user.name}</strong>
              <br />
              <small>{user.email}</small>
            </div>
          ))}
        </div>
      )}
      
      <div className="button-group">
        <button className="btn btn-primary" onClick={refetch} disabled={loading}>
          Refetch
        </button>
      </div>
      
      <div className="code-block">
        <pre>{`const { data, loading, error, refetch } = useFetch<User[]>('/api/users');`}</pre>
      </div>
    </div>
  );
};

export default FetchDemo;