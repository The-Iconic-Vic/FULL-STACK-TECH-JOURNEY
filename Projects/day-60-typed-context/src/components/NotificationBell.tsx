import React, { useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const NotificationBell: React.FC = () => {
  const { notifications } = useNotification();
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.length;

  return (
    <div className="notification-bell" onClick={() => setIsOpen(!isOpen)}>
      🔔
      {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
    </div>
  );
};

export default NotificationBell;