import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Notification, NotificationType, NotificationContextValue } from '../types';

const NotificationContext = createContext<NotificationContextValue | undefined>(undefined);

function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((message: string, type: NotificationType, duration = 3000) => {
    const id = crypto.randomUUID();
    setNotifications(prev => [...prev, { id, message, type, duration }]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== id));
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const success = useCallback((message: string, duration?: number) => {
    addNotification(message, 'success', duration);
  }, [addNotification]);

  const error = useCallback((message: string, duration?: number) => {
    addNotification(message, 'error', duration);
  }, [addNotification]);

  const info = useCallback((message: string, duration?: number) => {
    addNotification(message, 'info', duration);
  }, [addNotification]);

  const warning = useCallback((message: string, duration?: number) => {
    addNotification(message, 'warning', duration);
  }, [addNotification]);

  const value: NotificationContextValue = {
    notifications,
    addNotification,
    removeNotification,
    clearAll,
    success,
    error,
    info,
    warning,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}

function useNotification(): NotificationContextValue {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

export { NotificationProvider, useNotification };