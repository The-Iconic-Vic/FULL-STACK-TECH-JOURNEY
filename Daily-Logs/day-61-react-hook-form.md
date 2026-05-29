# 📅 Day 61: Type-Safe Forms with React Hook Form

**Date:** May 29, 2026  
**Author:** Victor Innocent (@Iconic_Vic)  
**Phase:** Phase 2 - Modern Full-Stack  
**Topics:** React Hook Form, Zod Validation, Type Inference, Multi-Step Forms, Dynamic Fields

---

## 📋 Learning Objectives

- ✅ Install and configure React Hook Form with TypeScript
- ✅ Use `useForm<T>` with typed form data interfaces
- ✅ Create Zod schemas for validation
- ✅ Infer TypeScript types from Zod schemas using `z.infer`
- ✅ Integrate `zodResolver` with React Hook Form
- ✅ Handle nested form data and dynamic fields
- ✅ Build a complete multi-step registration form

---

## 🎯 Part 1: React Hook Form Basics with TypeScript

### Installation

```bash
npm install react-hook-form
npm install zod @hookform/resolvers
```

### Basic Typed Form

```typescript
// 1. Define form data interface
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// 2. Use useForm with type parameter
import { useForm } from 'react-hook-form';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = (data: LoginFormData) => {
    console.log(data); // Fully typed!
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: 'Email is required' })}
        placeholder="Email"
      />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input
        {...register('password', { required: 'Password is required', minLength: 6 })}
        type="password"
      />
      {errors.password && <span>{errors.password.message}</span>}
      
      <input type="checkbox" {...register('rememberMe')} />
      
      <button type="submit" disabled={isSubmitting}>
        Login
      </button>
    </form>
  );
}
```

### Register Options Type Safety

```typescript
// register automatically infers field names from LoginFormData
<input {...register('email')} />        // ✅ Valid field
<input {...register('username')} />     // ❌ TypeScript error - not in LoginFormData
```

---

## 🔧 Part 2: Schema Validation with Zod

### Creating Zod Schemas

```typescript
import { z } from 'zod';

// Define schema
const registerSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  age: z.number()
    .min(18, 'You must be at least 18 years old')
    .max(120, 'Invalid age'),
  newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Infer TypeScript type from schema
type RegisterFormData = z.infer<typeof registerSchema>;
// Equivalent to:
// type RegisterFormData = {
//   email: string;
//   password: string;
//   confirmPassword: string;
//   age: number;
//   newsletter?: boolean;
// }
```

### Using Zod Resolver

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      
      <input {...register('password')} type="password" />
      {errors.password && <p>{errors.password.message}</p>}
      
      <button type="submit">Register</button>
    </form>
  );
}
```

### Common Zod Validations

```typescript
// String validations
z.string().min(3, 'Too short')
z.string().max(50, 'Too long')
z.string().email('Invalid email')
z.string().url('Invalid URL')
z.string().regex(/^[A-Z]/, 'Must start with uppercase')
z.string().includes('@', 'Must contain @')

// Number validations
z.number().min(0, 'Must be positive')
z.number().max(100, 'Too high')
z.number().int('Must be integer')
z.number().positive('Must be positive')

// Boolean validations
z.boolean()
z.boolean().optional()

// Array validations
z.array(z.string()).min(1, 'At least one item')
z.array(z.string()).max(5, 'Too many items')

// Object validations
z.object({ name: z.string() })
z.object({ age: z.number() }).partial() // All fields optional

// Union types
z.union([z.string(), z.number()])
z.enum(['admin', 'user', 'guest'])

// Refinements
z.string().refine(val => val !== 'admin', {
  message: 'Username cannot be admin',
})
```

---

## 📝 Part 3: Advanced Form Patterns

### Nested Form Data

```typescript
interface UserFormData {
  personal: {
    firstName: string;
    lastName: string;
  };
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
  preferences: {
    theme: 'light' | 'dark';
    notifications: boolean;
  };
}

const userSchema = z.object({
  personal: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  }),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    zipCode: z.string().regex(/^\d{5}$/),
  }),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean(),
  }),
});

function NestedForm() {
  const { register, handleSubmit } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('personal.firstName')} />
      <input {...register('personal.lastName')} />
      <input {...register('address.street')} />
      <input {...register('address.city')} />
      <input {...register('address.zipCode')} />
      
      <select {...register('preferences.theme')}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      
      <input type="checkbox" {...register('preferences.notifications')} />
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Dynamic Form Fields (Arrays)

```typescript
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface TodoFormData {
  title: string;
  items: Array<{ text: string; completed: boolean }>;
}

const todoSchema = z.object({
  title: z.string().min(3),
  items: z.array(z.object({
    text: z.string().min(1),
    completed: z.boolean(),
  })).min(1, 'At least one item required'),
});

function DynamicTodoForm() {
  const { register, control, handleSubmit, formState: { errors } } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      items: [{ text: '', completed: false }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('title')} />
      {errors.title && <p>{errors.title.message}</p>}
      
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.text`)} />
          <input type="checkbox" {...register(`items.${index}.completed`)} />
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      
      <button type="button" onClick={() => append({ text: '', completed: false })}>
        Add Item
      </button>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Custom Validation Rules

```typescript
// Custom validator function
const phoneNumberSchema = z.string().refine(
  (value) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(value);
  },
  { message: 'Invalid phone number format' }
);

// Async validation (e.g., check if email exists)
const emailSchema = z.string().email().refine(
  async (email) => {
    const response = await fetch(`/api/check-email?email=${email}`);
    const { exists } = await response.json();
    return !exists;
  },
  { message: 'Email already registered' }
);

// Conditional validation
const conditionalSchema = z.object({
  accountType: z.enum(['personal', 'business']),
  companyName: z.string().conditional('accountType', {
    if: (accountType) => accountType === 'business',
    then: z.string().min(2),
    otherwise: z.string().optional(),
  }),
});
```

---

## 🧩 Part 4: Multi-Step Form Pattern

### Step Management Hook

```typescript
// hooks/useMultiStepForm.ts
import { useState, useCallback } from 'react';

interface UseMultiStepFormProps {
  steps: number;
  onComplete: () => void;
}

export function useMultiStepForm({ steps, onComplete }: UseMultiStepFormProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = useCallback(() => {
    if (currentStep < steps - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete();
    }
  }, [currentStep, steps, onComplete]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((step: number) => {
    if (step >= 0 && step < steps) {
      setCurrentStep(step);
    }
  }, [steps]);

  return {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep: currentStep === 0,
    isLastStep: currentStep === steps - 1,
  };
}
```

### Form Persistence Hook

```typescript
// hooks/useFormPersistence.ts
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

export function useFormPersistence<T extends Record<string, any>>(
  key: string,
  form: UseFormReturn<T>
) {
  // Load saved data on mount
  useEffect(() => {
    const savedData = localStorage.getItem(key);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        form.reset(parsed);
      } catch (e) {
        console.error('Failed to load saved form data', e);
      }
    }
  }, [key, form]);

  // Save data on change
  useEffect(() => {
    const subscription = form.watch((value) => {
      localStorage.setItem(key, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [key, form]);

  // Clear saved data
  const clearSavedData = () => {
    localStorage.removeItem(key);
    form.reset();
  };

  return { clearSavedData };
}
```

### Complete Multi-Step Registration Form

```typescript
// schemas/multiStepSchema.ts
import { z } from 'zod';

// Step 1: Personal Info
export const stepOneSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  dateOfBirth: z.string().refine((date) => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18;
  }, { message: 'You must be at least 18 years old' }),
});

// Step 2: Account Details
export const stepTwoSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain number'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Step 3: Contact Info
export const stepThreeSchema = z.object({
  phoneNumber: z.string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
  address: z.string().min(5, 'Address is required'),
  city: z.string().min(2, 'City is required'),
  zipCode: z.string().regex(/^\d{5}$/, 'Invalid zip code'),
});

// Step 4: Preferences
export const stepFourSchema = z.object({
  receiveNewsletter: z.boolean().default(false),
  receiveUpdates: z.boolean().default(false),
  theme: z.enum(['light', 'dark']).default('light'),
});

// Combined schema for final submission
export const multiStepSchema = stepOneSchema
  .merge(stepTwoSchema)
  .merge(stepThreeSchema)
  .merge(stepFourSchema);

export type StepOneData = z.infer<typeof stepOneSchema>;
export type StepTwoData = z.infer<typeof stepTwoSchema>;
export type StepThreeData = z.infer<typeof stepThreeSchema>;
export type StepFourData = z.infer<typeof stepFourSchema>;
export type MultiStepFormData = z.infer<typeof multiStepSchema>;
```

### Multi-Step Form Component

```tsx
// components/MultiStepForm/index.tsx
import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import FormSummary from './FormSummary';
import { useMultiStepForm } from '../../hooks/useMultiStepForm';
import { useFormPersistence } from '../../hooks/useFormPersistence';
import { multiStepSchema, MultiStepFormData } from '../../schemas/multiStepSchema';

const FORM_STORAGE_KEY = 'multiStepFormData';

function MultiStepForm() {
  const [isComplete, setIsComplete] = useState(false);
  
  const methods = useForm<MultiStepFormData>({
    resolver: zodResolver(multiStepSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      dateOfBirth: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      address: '',
      city: '',
      zipCode: '',
      receiveNewsletter: false,
      receiveUpdates: false,
      theme: 'light',
    },
    mode: 'onChange',
  });

  const { handleSubmit, trigger, getValues } = methods;
  const { clearSavedData } = useFormPersistence(FORM_STORAGE_KEY, methods);

  const steps = [StepOne, StepTwo, StepThree, StepFour];
  const stepNames = ['Personal Info', 'Account Details', 'Contact Info', 'Preferences'];
  
  const {
    currentStep,
    nextStep,
    prevStep,
    goToStep,
    isFirstStep,
    isLastStep,
  } = useMultiStepForm({
    steps: steps.length,
    onComplete: () => setIsComplete(true),
  });

  const CurrentStepComponent = steps[currentStep];

  const handleNext = async () => {
    // Validate current step fields only
    let fieldsToValidate: (keyof MultiStepFormData)[] = [];
    
    switch (currentStep) {
      case 0:
        fieldsToValidate = ['firstName', 'lastName', 'dateOfBirth'];
        break;
      case 1:
        fieldsToValidate = ['email', 'password', 'confirmPassword'];
        break;
      case 2:
        fieldsToValidate = ['phoneNumber', 'address', 'city', 'zipCode'];
        break;
      case 3:
        fieldsToValidate = ['receiveNewsletter', 'receiveUpdates', 'theme'];
        break;
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      nextStep();
    }
  };

  const onSubmit = (data: MultiStepFormData) => {
    console.log('Form submitted:', data);
    clearSavedData();
    alert('Registration successful! Check console for data.');
  };

  if (isComplete) {
    return (
      <div className="card">
        <h2>🎉 Registration Complete!</h2>
        <FormSummary data={getValues()} />
        <button onClick={() => window.location.reload()} className="btn btn-primary">
          Register Another
        </button>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="step-indicator">
        {stepNames.map((name, index) => (
          <button
            key={index}
            className={`step ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
            onClick={() => goToStep(index)}
          >
            {index + 1}. {name}
          </button>
        ))}
      </div>
      
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CurrentStepComponent />
          
          <div className="form-actions">
            {!isFirstStep && (
              <button type="button" onClick={prevStep} className="btn btn-secondary">
                Previous
              </button>
            )}
            
            {!isLastStep ? (
              <button type="button" onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            )}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

export default MultiStepForm;
```

### Step Components

```tsx
// components/MultiStepForm/StepOne.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';

function StepOne() {
  const { register, formState: { errors } } = useFormContext();
  
  return (
    <div className="step-content">
      <h3>Personal Information</h3>
      
      <div className="form-group">
        <label>First Name</label>
        <input {...register('firstName')} />
        {errors.firstName && <span className="error">{errors.firstName.message as string}</span>}
      </div>
      
      <div className="form-group">
        <label>Last Name</label>
        <input {...register('lastName')} />
        {errors.lastName && <span className="error">{errors.lastName.message as string}</span>}
      </div>
      
      <div className="form-group">
        <label>Date of Birth</label>
        <input type="date" {...register('dateOfBirth')} />
        {errors.dateOfBirth && <span className="error">{errors.dateOfBirth.message as string}</span>}
      </div>
    </div>
  );
}

export default StepOne;
```

---

## 🎨 Part 5: Complete Registration Form with Zod

### Basic Register Form

```tsx
// components/RegisterForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain an uppercase letter')
    .regex(/[a-z]/, 'Must contain a lowercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string(),
  age: z.number()
    .min(18, 'You must be at least 18 years old')
    .max(120, 'Invalid age'),
  newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterForm() {
  const [submittedData, setSubmittedData] = useState<RegisterFormData | null>(null);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    watch,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      age: 18,
      newsletter: false,
    },
    mode: 'onChange',
  });

  const onSubmit = (data: RegisterFormData) => {
    setSubmittedData(data);
    console.log('Form submitted:', data);
    reset();
    setTimeout(() => setSubmittedData(null), 5000);
  };

  const password = watch('password');

  return (
    <div className="card">
      <h2>📝 Register Form</h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>Email *</label>
          <input
            type="email"
            {...register('email')}
            placeholder="user@example.com"
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        
        <div className="form-group">
          <label>Password *</label>
          <input
            type="password"
            {...register('password')}
            placeholder="Min 8 characters with uppercase and number"
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
          <ul className="password-requirements">
            <li className={password?.length >= 8 ? 'valid' : ''}>✓ At least 8 characters</li>
            <li className={/[A-Z]/.test(password || '') ? 'valid' : ''}>✓ Uppercase letter</li>
            <li className={/[a-z]/.test(password || '') ? 'valid' : ''}>✓ Lowercase letter</li>
            <li className={/[0-9]/.test(password || '') ? 'valid' : ''}>✓ Number</li>
          </ul>
        </div>
        
        <div className="form-group">
          <label>Confirm Password *</label>
          <input
            type="password"
            {...register('confirmPassword')}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <span className="error">{errors.confirmPassword.message}</span>}
        </div>
        
        <div className="form-group">
          <label>Age *</label>
          <input
            type="number"
            {...register('age', { valueAsNumber: true })}
            min="18"
            max="120"
          />
          {errors.age && <span className="error">{errors.age.message}</span>}
        </div>
        
        <div className="form-group checkbox">
          <label>
            <input type="checkbox" {...register('newsletter')} />
            Subscribe to newsletter
          </label>
        </div>
        
        <button type="submit" className="btn btn-primary" disabled={isSubmitting || !isValid}>
          {isSubmitting ? 'Submitting...' : 'Register'}
        </button>
      </form>
      
      {submittedData && (
        <div className="success-message">
          <h4>Registration Successful!</h4>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default RegisterForm;
```

---

## 📊 Quick Reference: React Hook Form Types

| Element | Type Signature |
|---------|---------------|
| `useForm<T>` | `UseFormReturn<T>` |
| `register` | `(name: keyof T) => { onChange, onBlur, ref, name }` |
| `formState.errors` | `FieldErrors<T>` |
| `watch` | `(name: keyof T) => T[keyof T]` |
| `setValue` | `(name: keyof T, value: T[keyof T]) => void` |
| `getValues` | `() => T` |

### Zod to TypeScript

```typescript
// Infer type from schema
type FormData = z.infer<typeof schema>;

// Partial type
type PartialFormData = z.infer<typeof schema.partial()>;

// Pick specific fields
type PickedData = z.infer<z.pick(schema, ['email', 'password'])>;

// Omit specific fields
type OmittedData = z.infer<z.omit(schema, ['confirmPassword'])>;
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `property does not exist` | Field not in form data type | Add field to interface/schema |
| `valueAsNumber` not working | Missing transform | Use `valueAsNumber: true` option |
| Nested field errors | Wrong path syntax | Use dot notation `'user.email'` |
| Form not re-rendering | Missing watch | Use `watch()` to subscribe to changes |
| Async validation issues | No error handling | Try-catch with refine() |

---

## ✅ Day 61 Checklist

- [ ] Install `react-hook-form`, `zod`, `@hookform/resolvers`
- [ ] Create basic typed form with `useForm<T>`
- [ ] Create Zod schema with validation rules
- [ ] Infer TypeScript type from schema with `z.infer`
- [ ] Integrate `zodResolver` with React Hook Form
- [ ] Handle nested form data with dot notation
- [ ] Implement dynamic fields with `useFieldArray`
- [ ] Build multi-step form with step management
- [ ] Add form persistence to localStorage
- [ ] Display typed error messages
- [ ] Test all validation rules
- [ ] Push code to GitHub

