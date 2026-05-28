import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const LoginForm: React.FC = () => {
  const { state, login, clearError } = useAuth();
  const { success, error: notifyError } = useNotification();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
    if (state.isAuthenticated) {
      success('Logged in successfully!');
    } else if (state.error) {
      notifyError(state.error);
    }
  };

  if (state.isAuthenticated) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      {state.error && (
        <div className="error-message">
          {state.error}
          <button onClick={clearError} style={{ marginLeft: '0.5rem' }}>×</button>
        </div>
      )}
      
      <div className="input-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email: user@example.com"
          disabled={state.loading}
          required
        />
      </div>
      
      <div className="input-group">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password: password"
          disabled={state.loading}
          required
        />
      </div>
      
      <button type="submit" className="btn btn-primary" disabled={state.loading}>
        {state.loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  );
};

export default LoginForm;