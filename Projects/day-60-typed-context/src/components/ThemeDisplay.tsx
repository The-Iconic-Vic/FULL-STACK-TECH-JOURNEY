import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeDisplay: React.FC = () => {
  const { theme, isSystemPreference } = useTheme();

  return (
    <div>
      <p>
        Current Theme: <strong>{theme}</strong>
      </p>
      <p>
        Source: <strong>{isSystemPreference ? 'System Preference' : 'Manual Selection'}</strong>
      </p>
    </div>
  );
};

export default ThemeDisplay;