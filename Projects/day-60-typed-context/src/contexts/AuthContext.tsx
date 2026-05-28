import React, { createContext, useContext, useReducer, ReactNode, useCallback } from 'react';
import { AuthState, AuthAction, User } from '../types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
        error: null,
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
}

const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<React.Dispatch<AuthAction> | undefined>(undefined);

function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

function useAuthState(): AuthState {
  const context = useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error('useAuthState must be used within an AuthProvider');
  }
  return context;
}

function useAuthDispatch(): React.Dispatch<AuthAction> {
  const context = useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within an AuthProvider');
  }
  return context;
}

function useAuth() {
  const state = useAuthState();
  const dispatch = useAuthDispatch();

  const login = useCallback(async (email: string, password: string) => {
    dispatch({ type: 'LOGIN_START' });
    
    // Simulate API call
    setTimeout(() => {
      if (email === 'user@example.com' && password === 'password') {
        const user: User = {
          id: '1',
          name: 'John Doe',
          email: email,
        };
        dispatch({ type: 'LOGIN_SUCCESS', payload: user });
      } else {
        dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid email or password' });
      }
    }, 1000);
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch({ type: 'LOGOUT' });
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, [dispatch]);

  return {
    state,
    dispatch,
    login,
    logout,
    clearError,
  };
}

export { AuthProvider, useAuth, useAuthState, useAuthDispatch };