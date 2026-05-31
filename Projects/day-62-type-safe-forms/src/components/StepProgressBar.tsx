import React from 'react';
import { User, Lock, Eye } from 'lucide-react';

interface StepProgressBarProps {
  currentStep: number;
}

export const StepProgressBar: React.FC<StepProgressBarProps> = ({ currentStep }) => {
  const steps = [
    { number: 1, label: 'Profile', icon: <User size={16} /> },
    { number: 2, label: 'Security', icon: <Lock size={16} /> },
    { number: 3, label: 'Review', icon: <Eye size={16} /> },
  ];

  // Calculate the active line width percentage
  // Step 1: 0%, Step 2: 50%, Step 3: 100%
  const getActiveWidth = () => {
    if (currentStep <= 1) return '0%';
    if (currentStep === 2) return '50%';
    return '100%';
  };

  return (
    <div className="steps-container">
      <div className="steps-bar-background" />
      <div 
        className="steps-bar-active" 
        style={{ width: getActiveWidth() }}
      />
      
      {steps.map((step) => {
        const isActive = currentStep === step.number;
        const isCompleted = currentStep > step.number;
        
        return (
          <div 
            key={step.number} 
            className={`step-node ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
          >
            <div className="step-badge">
              {isCompleted ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                step.icon
              )}
            </div>
            <span className="step-label">{step.label}</span>
          </div>
        );
      })}
    </div>
  );
};
