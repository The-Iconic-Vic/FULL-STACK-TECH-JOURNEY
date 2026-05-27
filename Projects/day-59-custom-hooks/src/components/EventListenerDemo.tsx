import React, { useState } from 'react';
import useEventListener from '../hooks/useEventListener';

const EventListenerDemo: React.FC = () => {
  const [keyPressed, setKeyPressed] = useState<string | null>(null);
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEventListener('keydown', (e) => {
    setKeyPressed(`'${e.key}'`);
    setTimeout(() => setKeyPressed(null), 500);
  }, window);

  useEventListener('resize', () => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
  }, window);

  return (
    <div className="card">
      <h2>🎧 useEventListener</h2>
      <p className="hook-type">void</p>
      
      <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <p>Window Size: <strong>{windowSize.width} x {windowSize.height}</strong></p>
        <p>Last Key Pressed: <strong>{keyPressed || 'None'}</strong></p>
      </div>
      
      <div className="code-block">
        <pre>{`useEventListener('keydown', (e) => console.log(e.key));
useEventListener('resize', () => console.log('resized'));`}</pre>
      </div>
    </div>
  );
};

export default EventListenerDemo;