import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme, isSystemPreference, useSystemPreference } = useTheme();

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      <button onClick={toggleTheme} className="btn btn-primary">
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </button>
      
      {!isSystemPreference && (
        <button onClick={useSystemPreference} className="btn btn-secondary">
          Use System
        </button>
      )}
      
      {isSystemPreference && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
          Following System
        </span>
      )}
    </div>
  );
};

export default ThemeToggle;