import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';

const DebounceDemo: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 500);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (debouncedSearch) {
      // Simulate API call
      setResults([
        `Result for "${debouncedSearch}" - Item 1`,
        `Result for "${debouncedSearch}" - Item 2`,
        `Result for "${debouncedSearch}" - Item 3`,
      ]);
    } else {
      setResults([]);
    }
  }, [debouncedSearch]);

  return (
    <div className="card">
      <h2>⏱️ useDebounce&lt;T&gt;</h2>
      <p className="hook-type">T</p>
      
      <div className="input-group">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search (debounced 500ms)"
        />
      </div>
      
      <p>Immediate: <strong>{searchTerm || '(empty)'}</strong></p>
      <p>Debounced: <strong>{debouncedSearch || '(empty)'}</strong></p>
      
      {results.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <strong>Results:</strong>
          <ul style={{ marginTop: '0.5rem', paddingLeft: '1.5rem' }}>
            {results.map((result, i) => (
              <li key={i}>{result}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="code-block">
        <pre>{`const debouncedSearch = useDebounce(searchTerm, 500);`}</pre>
      </div>
    </div>
  );
};

export default DebounceDemo;