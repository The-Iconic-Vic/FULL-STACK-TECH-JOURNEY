import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const NotificationList: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return '✅';
      case 'error': return '❌';
      case 'info': return 'ℹ️';
      case 'warning': return '⚠️';
      default: return '📢';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="notification-list">
      {notifications.map(notification => (
        <div key={notification.id} className={`notification ${notification.type}`}>
          <span>{getIcon(notification.type)} {notification.message}</span>
          <button onClick={() => removeNotification(notification.id)}>×</button>
        </div>
      ))}
    </div>
  );
};

export default NotificationList;