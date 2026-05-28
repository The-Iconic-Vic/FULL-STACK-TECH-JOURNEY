import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';

const UserProfile: React.FC = () => {
  const { state, logout } = useAuth();
  const { success } = useNotification();

  const handleLogout = () => {
    logout();
    success('Logged out successfully');
  };

  if (!state.isAuthenticated || !state.user) {
    return null;
  }

  return (
    <div className="user-profile">
      <h4>Welcome, {state.user.name}!</h4>
      <p>Email: {state.user.email}</p>
      <button onClick={handleLogout} className="btn btn-secondary">
        Logout
      </button>
    </div>
  );
};

export default UserProfile;