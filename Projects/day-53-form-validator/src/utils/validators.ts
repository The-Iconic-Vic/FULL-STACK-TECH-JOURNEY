import { FormField, ValidationResult } from '../types';

export function validateField(field: FormField, value: string): ValidationResult {
  const errors: string[] = [];
  
  switch (field.type) {
    case "text":
      if (field.required && !value) {
        errors.push(`${field.label} is required`);
      }
      if (field.minLength && value.length < field.minLength) {
        errors.push(`${field.label} must be at least ${field.minLength} characters`);
      }
      if (field.maxLength && value.length > field.maxLength) {
        errors.push(`${field.label} must be at most ${field.maxLength} characters`);
      }
      break;
      
    case "email":
      if (field.required && !value) {
        errors.push(`${field.label} is required`);
      }
      if (value && !/^\S+@\S+\.\S+$/.test(value)) {
        errors.push(`Please enter a valid email address`);
      }
      break;
      
    case "number":
      if (field.required && !value) {
        errors.push(`${field.label} is required`);
      }
      if (value) {
        const num = Number(value);
        if (isNaN(num)) {
          errors.push(`${field.label} must be a number`);
        }
        if (field.min !== undefined && num < field.min) {
          errors.push(`${field.label} must be at least ${field.min}`);
        }
        if (field.max !== undefined && num > field.max) {
          errors.push(`${field.label} must be at most ${field.max}`);
        }
      }
      break;
      
    case "select":
      if (field.required && !value) {
        errors.push(`${field.label} is required`);
      }
      if (value && !field.options.includes(value)) {
        errors.push(`Please select a valid option`);
      }
      break;
  }
  
  return errors.length === 0 ? { valid: true } : { valid: false, errors };
}

export function validateForm(fields: FormField[], values: Record<string, string>): ValidationResult {
  const allErrors: string[] = [];
  
  for (const field of fields) {
    const result = validateField(field, values[field.name] || '');
    if (!result.valid) {
      allErrors.push(...result.errors);
    }
  }
  
  return allErrors.length === 0 ? { valid: true } : { valid: false, errors: allErrors };
}