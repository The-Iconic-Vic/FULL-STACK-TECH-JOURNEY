import { useFormContext } from 'react-hook-form';
import { User, Shield, Check, AlertTriangle } from 'lucide-react';
import type { MultiStepFormData } from '../schemas/formSchema';

export const StepConfirmation = () => {
  const { register, getValues, formState: { errors } } = useFormContext<MultiStepFormData>();
  const values = getValues();

  // Create a masked password display
  const maskedPassword = '•'.repeat(Math.min(values.password?.length || 8, 16));

  return (
    <div className="step-content-wrapper">
      <div className="summary-container">
        
        {/* Profile Info Summary */}
        <div className="summary-card">
          <div className="summary-title-wrapper">
            <User size={16} />
            <span>Personal Profile</span>
          </div>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">First Name</span>
              <span className="summary-value" title={values.firstName}>{values.firstName}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Last Name</span>
              <span className="summary-value" title={values.lastName}>{values.lastName}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Email Address</span>
              <span className="summary-value" title={values.email}>{values.email}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Phone Number</span>
              <span className="summary-value" title={values.phone}>{values.phone}</span>
            </div>
          </div>
        </div>

        {/* Security Summary */}
        <div className="summary-card">
          <div className="summary-title-wrapper purple">
            <Shield size={16} />
            <span>Account Security</span>
          </div>
          <div className="summary-grid">
            <div className="summary-item">
              <span className="summary-label">Username</span>
              <span className="summary-value" title={values.username}>{values.username}</span>
            </div>
            <div className="summary-item">
              <span className="summary-label">Password</span>
              <span className="summary-value">{maskedPassword}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Terms and Conditions Checkbox */}
      <div className="form-group">
        <label className="checkbox-container">
          <input
            type="checkbox"
            id="acceptTerms"
            {...register('acceptTerms')}
          />
          <div className="checkbox-box">
            <Check className="checkbox-icon" />
          </div>
          <span className="checkbox-text">
            I certify that the information provided is correct, and I agree to the{' '}
            <a href="#" className="checkbox-link" onClick={(e) => e.preventDefault()}>Terms of Service</a>{' '}
            and{' '}
            <a href="#" className="checkbox-link" onClick={(e) => e.preventDefault()}>Privacy Policy</a>.
          </span>
        </label>
        {errors.acceptTerms && (
          <span className="error-message">
            <AlertTriangle />
            {errors.acceptTerms.message}
          </span>
        )}
      </div>
    </div>
  );
};
