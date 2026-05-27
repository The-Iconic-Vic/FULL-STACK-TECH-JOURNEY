import React, { useState } from 'react';
import usePrevious from '../hooks/usePrevious';

const PreviousDemo: React.FC = () => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  const [text, setText] = useState('');
  const prevText = usePrevious(text);

  return (
    <div className="card">
      <h2>📜 usePrevious&lt;T&gt;</h2>
      <p className="hook-type">T | undefined</p>
      
      <div className="display-value">Current: {count}</div>
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        Previous: {prevCount !== undefined ? prevCount : '(none)'}
      </div>
      
      <div className="button-group">
        <button className="btn btn-primary" onClick={() => setCount(c => c + 1)}>
          Increment
        </button>
        <button className="btn btn-secondary" onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
      
      <hr style={{ margin: '1rem 0' }} />
      
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something..."
        />
      </div>
      <p>Current: <strong>{text || '(empty)'}</strong></p>
      <p>Previous: <strong>{prevText !== undefined ? prevText : '(none)'}</strong></p>
      
      <div className="code-block">
        <pre>{`const prevCount = usePrevious(count);`}</pre>
      </div>
    </div>
  );
};

export default PreviousDemo;