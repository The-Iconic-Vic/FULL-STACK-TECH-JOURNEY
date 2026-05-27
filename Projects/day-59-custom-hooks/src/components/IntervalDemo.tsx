import React, { useState } from 'react';
import useInterval from '../hooks/useInterval';
import useToggle from '../hooks/useToggle';

const IntervalDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isRunning, toggleRunning] = useToggle(false);

  useInterval(() => {
    if (isRunning) {
      setCount(c => c + 1);
    }
  }, isRunning ? 500 : null);

  const reset = () => {
    setCount(0);
  };

  return (
    <div className="card">
      <h2>⏲️ useInterval</h2>
      <p className="hook-type">void</p>
      
      <div className="display-value">{count}</div>
      
      <div className="button-group">
        <button className="btn btn-primary" onClick={toggleRunning}>
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="btn btn-secondary" onClick={reset}>
          Reset
        </button>
      </div>
      
      <div className="code-block">
        <pre>{`useInterval(() => setCount(c => c + 1), isRunning ? 500 : null);`}</pre>
      </div>
    </div>
  );
};

export default IntervalDemo;