import React, { useState } from 'react';
import useCopyToClipboard from '../hooks/useCopyToClipboard';

const CopyToClipboardDemo: React.FC = () => {
  const { copy, copied, error } = useCopyToClipboard();
  const [textToCopy, setTextToCopy] = useState('Hello World! This is my custom hook demo.');

  return (
    <div className="card">
      <h2>📋 useCopyToClipboard</h2>
      <p className="hook-type">{'{ copy, copied, error }'}</p>
      
      <textarea
        value={textToCopy}
        onChange={(e) => setTextToCopy(e.target.value)}
        rows={3}
        style={{
          width: '100%',
          padding: '0.5rem',
          border: '2px solid #e5e7eb',
          borderRadius: '8px',
          fontFamily: 'monospace',
          marginBottom: '1rem'
        }}
      />
      
      <div className="button-group">
        <button className="btn btn-primary" onClick={() => copy(textToCopy)}>
          {copied ? '✓ Copied!' : 'Copy to Clipboard'}
        </button>
      </div>
      
      {error && <div className="error-message">Error: {error.message}</div>}
      
      <div className="code-block">
        <pre>{`const { copy, copied, error } = useCopyToClipboard();
copy('Text to copy');`}</pre>
      </div>
    </div>
  );
};

export default CopyToClipboardDemo;