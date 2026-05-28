import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { useNotification } from '../contexts/NotificationContext';

const TodoList: React.FC = () => {
  const { filteredTodos, toggleTodo, deleteTodo, updateTodo } = useTodo();
  const { success, error } = useNotification();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  const handleUpdate = (id: string) => {
    if (editText.trim()) {
      updateTodo(id, editText);
      setEditingId(null);
      setEditText('');
      success('Todo updated!');
    } else {
      error('Todo text cannot be empty');
    }
  };

  if (filteredTodos.length === 0) {
    return <p style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>No todos yet. Add one above!</p>;
  }

  return (
    <ul className="todo-list">
      {filteredTodos.map(todo => (
        <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          
          {editingId === todo.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onBlur={() => handleUpdate(todo.id)}
              onKeyDown={(e) => e.key === 'Enter' && handleUpdate(todo.id)}
              autoFocus
            />
          ) : (
            <span onDoubleClick={() => {
              setEditingId(todo.id);
              setEditText(todo.text);
            }}>
              {todo.text}
            </span>
          )}
          
          <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;