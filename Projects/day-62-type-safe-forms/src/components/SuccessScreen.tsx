import { Check, RotateCcw } from 'lucide-react';
import type { MultiStepFormData } from '../schemas/formSchema';

interface SuccessScreenProps {
  formData: MultiStepFormData | null;
  onReset: () => void;
}

export const SuccessScreen = ({ formData, onReset }: SuccessScreenProps) => {
  // Create a safe copy of the data without raw password to simulate secure api handling
  const secureData = formData ? { ...formData, password: '••••••••••••', confirmPassword: '••••••••••••' } : null;

  return (
    <div className="success-card">
      <div className="success-icon-wrapper">
        <Check className="success-icon" strokeWidth={3} />
      </div>
      <h2 className="success-title">Account Created!</h2>
      <p className="success-text">
        Your registration was successful. Below is the type-safe JSON payload that was transmitted to our authentication servers:
      </p>

      {secureData && (
        <div className="payload-viewer">
          <div className="payload-title">Secure JSON Payload</div>
          <pre className="payload-code">
            {JSON.stringify(secureData, null, 2)}
          </pre>
        </div>
      )}

      <button onClick={onReset} className="btn btn-secondary" style={{ width: '100%' }}>
        <RotateCcw size={16} />
        Register Another Account
      </button>
    </div>
  );
};
