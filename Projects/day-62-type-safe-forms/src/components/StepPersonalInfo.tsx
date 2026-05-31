import { useFormContext } from 'react-hook-form';
import { User, Mail, Phone, AlertTriangle } from 'lucide-react';
import type { MultiStepFormData } from '../schemas/formSchema';

export const StepPersonalInfo = () => {
  const { register, formState: { errors } } = useFormContext<MultiStepFormData>();

  return (
    <div className="step-content-wrapper">
      <div className="form-group">
        <label className="form-label" htmlFor="firstName">First Name</label>
        <div className="input-wrapper">
          <User className="input-icon" />
          <input
            id="firstName"
            type="text"
            placeholder="John"
            className={`form-input ${errors.firstName ? 'has-error' : ''}`}
            {...register('firstName')}
          />
        </div>
        {errors.firstName && (
          <span className="error-message">
            <AlertTriangle />
            {errors.firstName.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="lastName">Last Name</label>
        <div className="input-wrapper">
          <User className="input-icon" />
          <input
            id="lastName"
            type="text"
            placeholder="Doe"
            className={`form-input ${errors.lastName ? 'has-error' : ''}`}
            {...register('lastName')}
          />
        </div>
        {errors.lastName && (
          <span className="error-message">
            <AlertTriangle />
            {errors.lastName.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="email">Email Address</label>
        <div className="input-wrapper">
          <Mail className="input-icon" />
          <input
            id="email"
            type="email"
            placeholder="john.doe@example.com"
            className={`form-input ${errors.email ? 'has-error' : ''}`}
            {...register('email')}
          />
        </div>
        {errors.email && (
          <span className="error-message">
            <AlertTriangle />
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="phone">Phone Number</label>
        <div className="input-wrapper">
          <Phone className="input-icon" />
          <input
            id="phone"
            type="tel"
            placeholder="+1 (234) 567-8900"
            className={`form-input ${errors.phone ? 'has-error' : ''}`}
            {...register('phone')}
          />
        </div>
        {errors.phone && (
          <span className="error-message">
            <AlertTriangle />
            {errors.phone.message}
          </span>
        )}
      </div>
    </div>
  );
};
