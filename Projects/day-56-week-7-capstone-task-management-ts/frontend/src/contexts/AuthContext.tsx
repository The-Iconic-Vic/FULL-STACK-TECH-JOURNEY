import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, ApiResponse } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

const apiFetch = async <T,>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem('token');
  
  const response = await fetch(`/api${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options?.headers
    }
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Request failed');
  }
  
  return data;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      fetchUser(storedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUser = async (authToken: string): Promise<void> => {
    try {
      const response = await apiFetch<{ user: User }>('/auth/me', {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      setUser(response.data?.user || null);
    } catch (error) {
      console.error('Failed to fetch user:', error);
      localStorage.removeItem('token');
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    const response = await apiFetch<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    const newToken = response.data?.token;
    const userData = response.data?.user;
    
    if (newToken && userData) {
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<void> => {
    const response = await apiFetch<{ token: string; user: User }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    
    const newToken = response.data?.token;
    const userData = response.data?.user;
    
    if (newToken && userData) {
      setToken(newToken);
      setUser(userData);
      localStorage.setItem('token', newToken);
    }
  };

  const logout = (): void => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
  };

  const value: AuthContextType = {
    token,
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};