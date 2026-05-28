import React, { createContext, useContext, useReducer, useCallback, ReactNode, useEffect } from 'react';
import { TodoState, TodoAction, Todo } from '../types';

const initialState: TodoState = {
  todos: [],
  filter: 'all',
  loading: false,
  error: null,
};

function todoReducer(state: TodoState, action: TodoAction): TodoState {
  switch (action.type) {
    case 'ADD_TODO':
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: action.payload,
        completed: false,
        createdAt: new Date(),
      };
      return { ...state, todos: [newTodo, ...state.todos] };

    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
        ),
      };

    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.payload),
      };

    case 'UPDATE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
        ),
      };

    case 'SET_FILTER':
      return { ...state, filter: action.payload };

    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'SET_ERROR':
      return { ...state, error: action.payload };

    case 'LOAD_TODOS':
      return { ...state, todos: action.payload };

    default:
      return state;
  }
}

const TodoStateContext = createContext<TodoState | undefined>(undefined);
const TodoDispatchContext = createContext<React.Dispatch<TodoAction> | undefined>(undefined);

function TodoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    const stored = localStorage.getItem('todos');
    if (stored) {
      try {
        const todos = JSON.parse(stored);
        // Convert date strings back to Date objects
        const todosWithDates = todos.map((todo: any) => ({
          ...todo,
          createdAt: new Date(todo.createdAt),
        }));
        dispatch({ type: 'LOAD_TODOS', payload: todosWithDates });
      } catch (e) {
        console.error('Failed to load todos', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

function useTodoState() {
  const context = useContext(TodoStateContext);
  if (context === undefined) {
    throw new Error('useTodoState must be used within a TodoProvider');
  }
  return context;
}

function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (context === undefined) {
    throw new Error('useTodoDispatch must be used within a TodoProvider');
  }
  return context;
}

function useTodoActions() {
  const dispatch = useTodoDispatch();

  const addTodo = useCallback((text: string) => {
    if (text.trim()) {
      dispatch({ type: 'ADD_TODO', payload: text.trim() });
    }
  }, [dispatch]);

  const toggleTodo = useCallback((id: string) => {
    dispatch({ type: 'TOGGLE_TODO', payload: id });
  }, [dispatch]);

  const deleteTodo = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TODO', payload: id });
  }, [dispatch]);

  const updateTodo = useCallback((id: string, text: string) => {
    if (text.trim()) {
      dispatch({ type: 'UPDATE_TODO', payload: { id, text: text.trim() } });
    }
  }, [dispatch]);

  const setFilter = useCallback((filter: 'all' | 'active' | 'completed') => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  }, [dispatch]);

  return { addTodo, toggleTodo, deleteTodo, updateTodo, setFilter };
}

function useTodo() {
  const state = useTodoState();
  const actions = useTodoActions();

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.completed;
    if (state.filter === 'completed') return todo.completed;
    return true;
  });

  const stats = {
    total: state.todos.length,
    active: state.todos.filter(t => !t.completed).length,
    completed: state.todos.filter(t => t.completed).length,
  };

  return {
    ...state,
    ...actions,
    filteredTodos,
    stats,
  };
}

export { TodoProvider, useTodo, useTodoState, useTodoDispatch, useTodoActions };