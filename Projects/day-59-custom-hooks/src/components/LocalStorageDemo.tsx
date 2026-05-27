import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const LocalStorageDemo: React.FC = () => {
  const [name, setName, removeName] = useLocalStorage<string>('username', '');
  const [count, setCount, removeCount] = useLocalStorage<number>('counter', 0);

  return (
    <div className="card">
      <h2>💾 useLocalStorage&lt;T&gt;</h2>
      <p className="hook-type">[T, (value: T) ={'>'} void, () ={'>'} void]</p>
      
      <div className="input-group">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button className="btn btn-secondary" onClick={removeName}>
          Clear
        </button>
      </div>
      <p>Saved name: <strong>{name || '(empty)'}</strong></p>
      
      <hr style={{ margin: '1rem 0' }} />
      
      <div className="display-value">Counter: {count}</div>
      <div className="button-group">
        <button className="btn btn-primary" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <button className="btn btn-danger" onClick={removeCount}>
          Reset
        </button>
      </div>
      
      <div className="code-block">
        <pre>{`const [name, setName, removeName] = useLocalStorage<string>('username', '');`}</pre>
      </div>
    </div>
  );
};

export default LocalStorageDemo;