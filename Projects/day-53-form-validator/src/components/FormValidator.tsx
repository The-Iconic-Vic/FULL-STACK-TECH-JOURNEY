import React, { useState } from 'react';
import { FormField } from '../types';
import { validateField } from '../utils/validators';

const formFields: FormField[] = [
  {
    type: "text",
    name: "username",
    label: "Username",
    required: true,
    minLength: 3,
    maxLength: 20,
    placeholder: "Enter username"
  },
  {
    type: "email",
    name: "email",
    label: "Email Address",
    required: true,
    placeholder: "user@example.com"
  },
  {
    type: "number",
    name: "age",
    label: "Age",
    required: true,
    min: 18,
    max: 99,
    placeholder: "18-99"
  },
  {
    type: "select",
    name: "country",
    label: "Country",
    required: true,
    options: ["United States", "Canada", "United Kingdom", "Nigeria", "Other"]
  }
];

const FormValidator: React.FC = () => {
  const [formData, setFormData] = useState<Record<string, string>>({
    username: '',
    email: '',
    age: '',
    country: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (field: FormField, value: string) => {
    const newFormData = { ...formData, [field.name]: value };
    setFormData(newFormData);
    
    const result = validateField(field, value);
    if (!result.valid) {
      setErrors(prev => ({ ...prev, [field.name]: result.errors }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field.name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    const newErrors: Record<string, string[]> = {};
    let hasErrors = false;
    
    for (const field of formFields) {
      const result = validateField(field, formData[field.name] || '');
      if (!result.valid) {
        newErrors[field.name] = result.errors;
        hasErrors = true;
      }
    }
    
    setErrors(newErrors);
    setIsValid(!hasErrors);
  };

  const getFieldValue = (field: FormField): string => {
    return formData[field.name] || '';
  };

  return (
    <div className="card">
      <h2>📝 Form Validator</h2>
      <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '1rem' }}>
        Discriminated Union + Literal Types Demo
      </p>
      
      <form onSubmit={handleSubmit}>
        {formFields.map((field) => (
          <div key={field.name} className="form-group">
            <label>
              {field.label}
              {field.required && <span style={{ color: '#dc3545' }}> *</span>}
            </label>
            
            {field.type === "select" ? (
              <select
                value={getFieldValue(field)}
                onChange={(e) => handleChange(field, e.target.value)}
                className={errors[field.name] ? 'error' : ''}
              >
                <option value="">Select {field.label}</option>
                {field.options.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            ) : (
              <input
                type={field.type === "number" ? "number" : field.type}
                value={getFieldValue(field)}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={field.placeholder}
                className={errors[field.name] ? 'error' : ''}
              />
            )}
            
            {errors[field.name] && (
              <div className="error-message">
                {errors[field.name].map(err => (
                  <div key={err}>• {err}</div>
                ))}
              </div>
            )}
          </div>
        ))}
        
        <button type="submit">Submit Form</button>
        
        {submitted && isValid && (
          <div className="success-message">
            ✅ Form submitted successfully!
          </div>
        )}
      </form>
    </div>
  );
};

export default FormValidator;