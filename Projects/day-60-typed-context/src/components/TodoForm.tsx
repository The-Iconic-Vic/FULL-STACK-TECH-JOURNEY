import React, { useState } from 'react';
import { useTodo } from '../contexts/TodoContext';
import { useNotification } from '../contexts/NotificationContext';

const TodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const { addTodo } = useTodo();
  const { success } = useNotification();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText('');
      success('Todo added!');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="input-group">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new todo..."
      />
      <button type="submit" className="btn btn-primary">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;