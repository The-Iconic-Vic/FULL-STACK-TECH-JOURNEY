import React, { useState } from 'react';
import useTimeout from '../hooks/useTimeout';

const TimeoutDemo: React.FC = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  useTimeout(() => {
    setMessage('✅ Timeout complete! This message appears after 2 seconds.');
    setIsWaiting(false);
  }, isWaiting ? 2000 : null);

  const startTimeout = () => {
    setMessage('⏳ Waiting for timeout...');
    setIsWaiting(true);
  };

  return (
    <div className="card">
      <h2>⏰ useTimeout</h2>
      <p className="hook-type">void</p>
      
      <div style={{ 
        padding: '1rem', 
        background: '#f3f4f6', 
        borderRadius: '8px',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>
        {message || 'Click Start to begin a 2-second timeout'}
      </div>
      
      <div className="button-group">
        <button className="btn btn-primary" onClick={startTimeout} disabled={isWaiting}>
          {isWaiting ? 'Waiting...' : 'Start Timeout'}
        </button>
      </div>
      
      <div className="code-block">
        <pre>{`useTimeout(() => setMessage('Done!'), isWaiting ? 2000 : null);`}</pre>
      </div>
    </div>
  );
};

export default TimeoutDemo;