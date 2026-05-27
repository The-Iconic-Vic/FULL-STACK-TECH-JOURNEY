import React from 'react';
import useToggle from '../hooks/useToggle';

const ToggleDemo: React.FC = () => {
  const [isOn, toggle, turnOn, turnOff] = useToggle(false);

  return (
    <div className="card">
      <h2>🔘 useToggle</h2>
      <p className="hook-type">[boolean, () ={'>'} void, () ={'>'} void, () ={'>'} void]</p>
      
      <div className="display-value">
        Status: {isOn ? '🟢 ON' : '🔴 OFF'}
      </div>
      
      <div className="button-group">
        <button className="btn btn-primary" onClick={toggle}>
          Toggle
        </button>
        <button className="btn btn-success" onClick={turnOn}>
          Turn On
        </button>
        <button className="btn btn-danger" onClick={turnOff}>
          Turn Off
        </button>
      </div>
      
      <div className="code-block">
        <pre>{`const [isOn, toggle, turnOn, turnOff] = useToggle(false);`}</pre>
      </div>
    </div>
  );
};

export default ToggleDemo;