# 📘 Type-Safe Forms with React Hook Form & Zod

## 🎯 What is React Hook Form?

React Hook Form is a performant, flexible library for building forms in React with minimal re-renders. When combined with TypeScript and Zod, it provides **end-to-end type safety** from validation to submission.

```typescript
// Without React Hook Form - manual state management
const [email, setEmail] = useState('');
const [error, setError] = useState('');
const handleSubmit = (e) => {
  e.preventDefault();
  if (!email.includes('@')) setError('Invalid email');
  // ... more manual validation
};

// With React Hook Form - declarative and typed
const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
// TypeScript knows exactly what fields exist
```

---

## 📦 Installation

```bash
# Core package
npm install react-hook-form

# Zod for schema validation
npm install zod

# Zod resolver for React Hook Form
npm install @hookform/resolvers

# Optional: For more validation schemas
npm install @zod iOS? zxcvbn  # password strength
```

---

## 🔧 Core Patterns

### Pattern 1: Basic Typed Form

```typescript
import { useForm } from 'react-hook-form';

// 1. Define form data interface
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

function LoginForm() {
  // 2. Type useForm with interface
  const {
    register,           // Connect inputs to form
    handleSubmit,       // Submit handler
    formState: { errors, isSubmitting },  // Form state
    reset,              // Reset form
    watch,              // Watch specific fields
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    mode: 'onChange',   // Validate on change
  });

  // 3. Submit handler receives typed data
  const onSubmit = (data: LoginFormData) => {
    console.log(data.email, data.password);  // Fully typed!
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email', { required: 'Email required' })} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input {...register('password', { minLength: 6 })} type="password" />
      {errors.password && <span>{errors.password.message}</span>}
      
      <input type="checkbox" {...register('rememberMe')} />
      
      <button disabled={isSubmitting}>Login</button>
    </form>
  );
}
```

### Pattern 2: Zod Schema Validation

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Define schema (single source of truth)
const registerSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase letter')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string(),
  age: z.number()
    .min(18, 'Must be at least 18')
    .max(120, 'Invalid age'),
  newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],  // Error appears on confirmPassword field
});

// 2. Infer TypeScript type from schema
type RegisterFormData = z.infer<typeof registerSchema>;

function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),  // Connect Zod validation
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
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <p>{errors.email.message}</p>}
      
      <input {...register('password')} type="password" />
      {errors.password && <p>{errors.password.message}</p>}
      
      <input {...register('confirmPassword')} type="password" />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      
      <input type="number" {...register('age', { valueAsNumber: true })} />
      {errors.age && <p>{errors.age.message}</p>}
      
      <input type="checkbox" {...register('newsletter')} />
      
      <button type="submit">Register</button>
    </form>
  );
}
```

### Pattern 3: Nested Form Data

```typescript
interface UserFormData {
  personal: {
    firstName: string;
    lastName: string;
    birthDate: Date;
  };
  contact: {
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      country: string;
    };
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
    birthDate: z.date(),
  }),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
    address: z.object({
      street: z.string().min(1),
      city: z.string().min(1),
      country: z.string().min(1),
    }),
  }),
  preferences: z.object({
    theme: z.enum(['light', 'dark']),
    notifications: z.boolean(),
  }),
});

function UserForm() {
  const { register, handleSubmit } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      {/* Dot notation for nested fields */}
      <input {...register('personal.firstName')} />
      <input {...register('personal.lastName')} />
      <input type="date" {...register('personal.birthDate')} />
      
      <input {...register('contact.email')} />
      <input {...register('contact.phone')} />
      <input {...register('contact.address.street')} />
      <input {...register('contact.address.city')} />
      
      <select {...register('preferences.theme')}>
        <option value="light">Light</option>
        <option value="dark">Dark</option>
      </select>
      <input type="checkbox" {...register('preferences.notifications')} />
      
      <button type="submit">Save</button>
    </form>
  );
}
```

### Pattern 4: Dynamic Form Arrays

```typescript
import { useFieldArray, useForm } from 'react-hook-form';

interface TodoFormData {
  title: string;
  items: Array<{
    text: string;
    completed: boolean;
    priority: 'low' | 'medium' | 'high';
  }>;
}

const todoSchema = z.object({
  title: z.string().min(3),
  items: z.array(z.object({
    text: z.string().min(1),
    completed: z.boolean(),
    priority: z.enum(['low', 'medium', 'high']),
  })).min(1, 'At least one item required'),
});

function TodoForm() {
  const { register, control, handleSubmit } = useForm<TodoFormData>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: '',
      items: [{ text: '', completed: false, priority: 'medium' }],
    },
  });

  const { fields, append, remove, insert, swap, move } = useFieldArray({
    control,
    name: 'items',
  });

  return (
    <form onSubmit={handleSubmit(data => console.log(data))}>
      <input {...register('title')} />
      
      {fields.map((field, index) => (
        <div key={field.id}>
          <input {...register(`items.${index}.text`)} />
          <input type="checkbox" {...register(`items.${index}.completed`)} />
          <select {...register(`items.${index}.priority`)}>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="button" onClick={() => remove(index)}>Remove</button>
        </div>
      ))}
      
      <button type="button" onClick={() => append({ text: '', completed: false, priority: 'medium' })}>
        Add Item
      </button>
      
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Pattern 5: Multi-Step Form

```typescript
// hooks/useMultiStepForm.ts
import { useState, useCallback } from 'react';

export function useMultiStepForm(steps: number) {
  const [currentStep, setCurrentStep] = useState(0);

  const next = useCallback(() => {
    setCurrentStep(i => Math.min(i + 1, steps - 1));
  }, [steps]);

  const prev = useCallback(() => {
    setCurrentStep(i => Math.max(i - 1, 0));
  }, []);

  const goTo = useCallback((step: number) => {
    if (step >= 0 && step < steps) {
      setCurrentStep(step);
    }
  }, [steps]);

  return {
    currentStep,
    next,
    prev,
    goTo,
    isFirst: currentStep === 0,
    isLast: currentStep === steps - 1,
  };
}

// Multi-step form component
const stepSchemas = [
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
];

function MultiStepForm() {
  const { currentStep, next, prev, isFirst, isLast } = useMultiStepForm(3);
  const methods = useForm<MultiStepFormData>({
    resolver: zodResolver(multiStepSchema),
    defaultValues: {},
    mode: 'onChange',
  });

  const { trigger, handleSubmit } = methods;

  const handleNext = async () => {
    // Validate only current step's fields
    let fieldsToValidate: (keyof MultiStepFormData)[] = [];
    switch (currentStep) {
      case 0: fieldsToValidate = ['firstName', 'lastName', 'email']; break;
      case 1: fieldsToValidate = ['password', 'confirmPassword']; break;
      case 2: fieldsToValidate = ['address', 'city', 'zipCode']; break;
    }
    
    const isValid = await trigger(fieldsToValidate);
    if (isValid) next();
  };

  const onSubmit = (data: MultiStepFormData) => {
    console.log('Final submission:', data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {currentStep === 0 && <StepOne />}
        {currentStep === 1 && <StepTwo />}
        {currentStep === 2 && <StepThree />}
        
        <div className="buttons">
          {!isFirst && <button type="button" onClick={prev}>Previous</button>}
          {!isLast ? (
            <button type="button" onClick={handleNext}>Next</button>
          ) : (
            <button type="submit">Submit</button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}
```

---

## 📝 Zod Validation Reference

### String Validations

```typescript
z.string()                           // Any string
z.string().min(3)                    // Minimum length
z.string().max(50)                   // Maximum length
z.string().min(3).max(50)            // Between 3 and 50
z.string().email()                   // Email format
z.string().url()                     // URL format
z.string().uuid()                    // UUID format
z.string().regex(/^[A-Z]/)           // Custom regex
z.string().includes('@')             // Contains substring
z.string().startsWith('https')       // Starts with
z.string().endsWith('.com')          // Ends with
z.string().trim()                    // Trim whitespace
z.string().toLowerCase()             // Transform to lowercase
```

### Number Validations

```typescript
z.number()                           // Any number
z.number().min(0)                    // Minimum value
z.number().max(100)                  // Maximum value
z.number().positive()                // > 0
z.number().nonnegative()             // >= 0
z.number().negative()                // < 0
z.number().int()                     // Integer
z.number().multipleOf(5)             // Divisible by 5
z.number().finite()                  // Finite number
```

### Boolean Validations

```typescript
z.boolean()                          // true or false
z.boolean().optional()               // Optional boolean
z.boolean().default(false)           // Default value
```

### Array Validations

```typescript
z.array(z.string())                  // Array of strings
z.array(z.string()).min(1)           // At least 1 item
z.array(z.string()).max(5)           // At most 5 items
z.array(z.string()).nonempty()       // Cannot be empty
z.array(z.string()).length(3)        // Exactly 3 items
z.array(z.string()).unique()         // All unique values
```

### Object Validations

```typescript
z.object({ name: z.string() })       // Object with shape
z.object({}).partial()               // All fields optional
z.object({}).required()              // All fields required
z.object({}).pick({ name: true })    // Pick specific fields
z.object({}).omit({ age: true })     // Omit specific fields
z.object({}).extend({ newField: z.string() })  // Add fields
```

### Refinements & Transformations

```typescript
// Custom refinement
z.string().refine(val => val !== 'admin', {
  message: 'Username cannot be admin',
});

// Async refinement (e.g., check email exists)
z.string().refine(async (email) => {
  const res = await fetch(`/api/check-email?email=${email}`);
  const { exists } = await res.json();
  return !exists;
}, { message: 'Email already registered' });

// Transform value
z.string().transform(val => val.toLowerCase());
z.string().transform(val => new Date(val));

// Conditional validation
z.object({
  accountType: z.enum(['personal', 'business']),
  companyName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.accountType === 'business' && !data.companyName) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Company name required for business accounts',
      path: ['companyName'],
    });
  }
});
```

---

## 🧩 React Hook Form API Reference

### useForm Options

| Option | Type | Description |
|--------|------|-------------|
| `defaultValues` | `T` | Initial form values |
| `resolver` | `Resolver` | Zod/Yup/Superstruct resolver |
| `mode` | `'onSubmit' \| 'onChange' \| 'onBlur' \| 'onTouched' \| 'all'` | Validation trigger |
| `reValidateMode` | `'onChange' \| 'onBlur'` | Re-validation trigger |
| `shouldFocusError` | `boolean` | Focus on error field |
| `shouldUnregister` | `boolean` | Unregister on unmount |

### useForm Return Values

| Property | Type | Description |
|----------|------|-------------|
| `register` | `(name, options) => props` | Register input |
| `unregister` | `(name) => void` | Unregister input |
| `watch` | `(name) => T` | Watch field value |
| `getValues` | `() => T` | Get all values |
| `setValue` | `(name, value) => void` | Set field value |
| `setError` | `(name, error) => void` | Set field error |
| `clearErrors` | `(name?) => void` | Clear errors |
| `trigger` | `(name?) => Promise<boolean>` | Trigger validation |
| `formState` | `FormState<T>` | Form state object |
| `reset` | `(values?) => void` | Reset form |
| `handleSubmit` | `(onValid, onInvalid) => Function` | Submit handler |
| `control` | `Control` | For useFieldArray |

### formState Properties

| Property | Type | Description |
|----------|------|-------------|
| `isDirty` | `boolean` | Form has been modified |
| `dirtyFields` | `Partial<Record<keyof T, boolean>>` | Which fields were modified |
| `isSubmitting` | `boolean` | Form is submitting |
| `isSubmitted` | `boolean` | Form has been submitted |
| `isSubmitSuccessful` | `boolean` | Submit was successful |
| `submitCount` | `number` | Number of submit attempts |
| `touchedFields` | `Partial<Record<keyof T, boolean>>` | Which fields were touched |
| `errors` | `FieldErrors<T>` | Validation errors |
| `isValid` | `boolean` | Form has no errors |

---

## 🔗 Useful TypeScript Utilities

```typescript
// Extract form data type from useForm
type FormData<T> = T extends UseFormReturn<infer U> ? U : never;

// Make all fields optional
type PartialFormData<T> = Partial<T>;

// Make specific fields required
type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Omit specific fields
type OmitFields<T, K extends keyof T> = Omit<T, K>;

// Extract field value type
type FieldValue<T, K extends keyof T> = T[K];
```

---

## 🐛 Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `property 'email' does not exist` | Field not in interface | Add field to type/schema |
| `valueAsNumber` returns NaN | Empty string input | Use `valueAsNumber: true` with fallback |
| Nested field error not showing | Wrong path syntax | Use dot notation: `'user.email'` |
| Form not updating | Missing re-render trigger | Use `watch()` to subscribe |
| Dynamic fields lose state | Missing `key` prop | Use `field.id` as key |
| Zod refine error at wrong field | Missing `path` | Set `path` to field name |
| Async validation not working | No error boundary | Use try-catch in refine |

---

## 📦 Custom Validation Example

```typescript
// utils/validators.ts
import { z } from 'zod';

// Password strength validator
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain an uppercase letter')
  .regex(/[a-z]/, 'Must contain a lowercase letter')
  .regex(/[0-9]/, 'Must contain a number')
  .regex(/[^A-Za-z0-9]/, 'Must contain a special character');

// Phone number validator (international)
export const phoneSchema = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');

// Credit card validator (Luhn algorithm)
export const creditCardSchema = z.string()
  .regex(/^\d{16}$/, 'Must be 16 digits')
  .refine(luhnCheck, 'Invalid card number');

function luhnCheck(cardNumber: string): boolean {
  let sum = 0;
  let isEven = false;
  for (let i = cardNumber.length - 1; i >= 0; i--) {
    let digit = parseInt(cardNumber.charAt(i), 10);
    if (isEven) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    isEven = !isEven;
  }
  return sum % 10 === 0;
}
```

---

## 💡 Best Practices

| Practice | Why |
|----------|-----|
| **Use Zod for single source of truth** | Types and validation stay in sync |
| **Set `mode: 'onChange'`** | Provides instant feedback |
| **Use `valueAsNumber` for numbers** | Automatically converts input values |
| **Provide `defaultValues`** | Prevents uncontrolled/controlled warnings |
| **Use `FormProvider` for deep nesting** | Avoids prop drilling register function |
| **Extract step validation** | Only validate current step in multi-step forms |
| **Persist form data** | Save to localStorage for recovery |
| **Type formData before submission** | Ensures data integrity |
