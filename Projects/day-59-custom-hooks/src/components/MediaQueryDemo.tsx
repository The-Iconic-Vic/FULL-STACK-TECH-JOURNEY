import React from 'react';
import useMediaQuery from '../hooks/useMediaQuery';

const MediaQueryDemo: React.FC = () => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1025px)');
  const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  return (
    <div className="card">
      <h2>📱 useMediaQuery</h2>
      <p className="hook-type">boolean</p>
      
      <div style={{ textAlign: 'center' }}>
        <p>🖥️ <strong>Device Type:</strong></p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <span className={`status-badge ${isMobile ? 'status-active' : 'status-inactive'}`}>
            📱 Mobile
          </span>
          <span className={`status-badge ${isTablet ? 'status-active' : 'status-inactive'}`}>
            📟 Tablet
          </span>
          <span className={`status-badge ${isDesktop ? 'status-active' : 'status-inactive'}`}>
            💻 Desktop
          </span>
        </div>
        <p>🌙 <strong>Dark Mode Preference:</strong> {isDarkMode ? 'Enabled' : 'Disabled'}</p>
      </div>
      
      <div className="code-block">
        <pre>{`const isMobile = useMediaQuery('(max-width: 768px)');`}</pre>
      </div>
    </div>
  );
};

export default MediaQueryDemo;