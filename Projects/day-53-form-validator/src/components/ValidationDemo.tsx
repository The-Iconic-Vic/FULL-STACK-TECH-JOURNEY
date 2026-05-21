import React from 'react';
import { ValidationRuleName } from '../types';

const ValidationDemo: React.FC = () => {
  // Demonstrating literal types
  const ruleNames: ValidationRuleName[] = [
    "required", "minLength", "maxLength", "min", "max", "email", "pattern"
  ];

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <h2>🏷️ Literal Types Demo</h2>
      <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '1rem' }}>
        ValidationRuleName = "required" | "minLength" | "maxLength" | "min" | "max" | "email" | "pattern"
      </p>
      
      <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
          Valid rule names (union of literals):
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {ruleNames.map(rule => (
            <span key={rule} style={{
              background: '#667eea',
              color: 'white',
              padding: '0.25rem 0.75rem',
              borderRadius: '20px',
              fontSize: '0.7rem',
              fontFamily: 'monospace'
            }}>
              "{rule}"
            </span>
          ))}
        </div>
        
        <p style={{ fontSize: '0.75rem', color: '#666', marginTop: '1rem' }}>
          💡 TypeScript only allows these exact string values.<br />
          Trying to use "invalid" would cause a compile-time error!
        </p>
      </div>
    </div>
  );
};

export default ValidationDemo;