import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { User, Lock, Eye, EyeOff, AlertTriangle, Check, X } from 'lucide-react';
import type { MultiStepFormData } from '../schemas/formSchema';

export const StepAccountDetails = () => {
  const { register, watch, formState: { errors } } = useFormContext<MultiStepFormData>();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const passwordValue = watch('password') || '';

  // Calculate password validations
  const criteria = {
    minLength: passwordValue.length >= 8,
    hasUppercase: /[A-Z]/.test(passwordValue),
    hasLowercase: /[a-z]/.test(passwordValue),
    hasNumber: /[0-9]/.test(passwordValue),
    hasSpecial: /[^A-Za-z0-9]/.test(passwordValue),
  };

  const metCount = Object.values(criteria).filter(Boolean).length;

  const getStrengthLabelAndClass = () => {
    if (passwordValue.length === 0) return { label: 'Empty', class: '' };
    if (metCount <= 2) return { label: 'Weak', class: 'weak' };
    if (metCount <= 3) return { label: 'Fair', class: 'fair' };
    if (metCount === 4) return { label: 'Good', class: 'good' };
    return { label: 'Strong', class: 'strong' };
  };

  const strength = getStrengthLabelAndClass();

  return (
    <div className="step-content-wrapper">
      <div className="form-group">
        <label className="form-label" htmlFor="username">Username</label>
        <div className="input-wrapper">
          <User className="input-icon" />
          <input
            id="username"
            type="text"
            placeholder="johndoe123"
            className={`form-input ${errors.username ? 'has-error' : ''}`}
            {...register('username')}
          />
        </div>
        {errors.username && (
          <span className="error-message">
            <AlertTriangle />
            {errors.username.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="password">Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" />
          <input
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            className={`form-input ${errors.password ? 'has-error' : ''}`}
            {...register('password')}
          />
          <button
            type="button"
            className="eye-button"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <span className="error-message">
            <AlertTriangle />
            {errors.password.message}
          </span>
        )}

        {/* Dynamic Password Strength Meter */}
        {passwordValue.length > 0 && (
          <div className="password-meter-container">
            <div className="password-meter-tracks">
              <div className={`password-meter-track ${metCount >= 1 ? strength.class : ''}`} />
              <div className={`password-meter-track ${metCount >= 3 ? strength.class : ''}`} />
              <div className={`password-meter-track ${metCount >= 4 ? strength.class : ''}`} />
              <div className={`password-meter-track ${metCount >= 5 ? strength.class : ''}`} />
            </div>
            <div className="password-strength-label">
              <span>Password strength:</span>
              <span className={`password-strength-text ${strength.class}`}>
                {strength.label}
              </span>
            </div>

            {/* Checklist of rules */}
            <div className="password-rules">
              <div className={`password-rule-item ${criteria.minLength ? 'valid' : 'invalid'}`}>
                {criteria.minLength ? <Check className="password-rule-icon" /> : <X className="password-rule-icon" />}
                <span>At least 8 chars</span>
              </div>
              <div className={`password-rule-item ${criteria.hasUppercase ? 'valid' : 'invalid'}`}>
                {criteria.hasUppercase ? <Check className="password-rule-icon" /> : <X className="password-rule-icon" />}
                <span>1+ uppercase letter</span>
              </div>
              <div className={`password-rule-item ${criteria.hasLowercase ? 'valid' : 'invalid'}`}>
                {criteria.hasLowercase ? <Check className="password-rule-icon" /> : <X className="password-rule-icon" />}
                <span>1+ lowercase letter</span>
              </div>
              <div className={`password-rule-item ${criteria.hasNumber ? 'valid' : 'invalid'}`}>
                {criteria.hasNumber ? <Check className="password-rule-icon" /> : <X className="password-rule-icon" />}
                <span>1+ number</span>
              </div>
              <div className={`password-rule-item ${criteria.hasSpecial ? 'valid' : 'invalid'}`}>
                {criteria.hasSpecial ? <Check className="password-rule-icon" /> : <X className="password-rule-icon" />}
                <span>1+ special character</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="confirmPassword">Confirm Password</label>
        <div className="input-wrapper">
          <Lock className="input-icon" />
          <input
            id="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="••••••••••••"
            className={`form-input ${errors.confirmPassword ? 'has-error' : ''}`}
            {...register('confirmPassword')}
          />
          <button
            type="button"
            className="eye-button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            tabIndex={-1}
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span className="error-message">
            <AlertTriangle />
            {errors.confirmPassword.message}
          </span>
        )}
      </div>
    </div>
  );
};
