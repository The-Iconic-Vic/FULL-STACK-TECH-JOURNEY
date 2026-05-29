# 📚 Day 61 Resources - Type-Safe Forms with React Hook Form

## 📖 Official Documentation

| Resource | Link | Description |
|----------|------|-------------|
| React Hook Form | https://react-hook-form.com | Official documentation with TypeScript examples |
| React Hook Form API Reference | https://react-hook-form.com/api | Complete API documentation |
| Zod Documentation | https://zod.dev | Full Zod schema validation guide |
| Zod GitHub | https://github.com/colinhacks/zod | Source code and examples |
| @hookform/resolvers | https://github.com/react-hook-form/resolvers | Resolvers for Zod, Yup, and more |
| React Hook Form + TypeScript | https://react-hook-form.com/ts | TypeScript-specific guide |

---

## 🎥 Video Tutorials

| Topic | Link | Duration |
|-------|------|----------|
| React Hook Form with TypeScript | https://youtu.be/6ThXsUwLWvc | 25 min |
| Zod Crash Course | https://youtu.be/2jM5l1QxE1g | 20 min |
| Multi-Step Forms with React Hook Form | https://youtu.be/0DdM6H1QjYM | 30 min |
| Dynamic Form Fields with useFieldArray | https://youtu.be/JfR7xGxBqZY | 18 min |
| Form Validation with Zod | https://youtu.be/9ZZxmB7aF7A | 15 min |

---

## 📦 Installation Commands

```bash
# Core packages
npm install react-hook-form
npm install zod
npm install @hookform/resolvers

# For password strength checking
npm install zxcvbn

# For date handling (optional)
npm install date-fns
```

---

## 📝 TypeScript Type Definitions

### useForm Type Signatures

```typescript
import { UseFormReturn, FieldValues, Path, RegisterOptions } from 'react-hook-form';

// Basic useForm type
function useForm<TFieldValues extends FieldValues = FieldValues>(
  props?: UseFormProps<TFieldValues>
): UseFormReturn<TFieldValues>;

// Register type
type Register<TFieldValues> = (
  name: Path<TFieldValues>,
  options?: RegisterOptions<TFieldValues>
) => { onChange, onBlur, ref, name };

// FormState type
interface FormState<TFieldValues> {
  isDirty: boolean;
  dirtyFields: Partial<Record<keyof TFieldValues, boolean>>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  isSubmitSuccessful: boolean;
  submitCount: number;
  touchedFields: Partial<Record<keyof TFieldValues, boolean>>;
  errors: FieldErrors<TFieldValues>;
  isValid: boolean;
}
```

### Zod Type Helpers

```typescript
import { z } from 'zod';

// Infer type from schema
type FormData = z.infer<typeof schema>;

// Create partial schema (all fields optional)
type PartialSchema = z.infer<typeof schema.partial()>;

// Create required schema (all fields required)
type RequiredSchema = z.infer<typeof schema.required()>;

// Pick specific fields
type PickedSchema = z.infer<z.pick(schema, ['email', 'password'])>;

// Omit specific fields
type OmittedSchema = z.infer<z.omit(schema, ['confirmPassword'])>;

// Deep partial (nested optional)
type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
```

---

## 🧪 Common Zod Schemas Reference

### Authentication Schemas

```typescript
// Login schema
export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

// Registration schema
export const registerSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Must contain uppercase')
    .regex(/[a-z]/, 'Must contain lowercase')
    .regex(/[0-9]/, 'Must contain a number'),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email'),
});

// Reset password schema
export const resetPasswordSchema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});
```

### User Profile Schemas

```typescript
// Personal info schema
export const personalInfoSchema = z.object({
  firstName: z.string().min(2, 'First name required'),
  lastName: z.string().min(2, 'Last name required'),
  dateOfBirth: z.string().refine(date => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18;
  }, 'Must be at least 18'),
  gender: z.enum(['male', 'female', 'other', 'prefer-not-to-say']),
});

// Contact info schema
export const contactInfoSchema = z.object({
  email: z.string().email(),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone'),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(1),
    zipCode: z.string().regex(/^\d{5}$/, 'Invalid ZIP'),
    country: z.string().min(1),
  }),
});
```

### Payment Schemas

```typescript
// Credit card schema
export const creditCardSchema = z.object({
  cardNumber: z.string()
    .regex(/^\d{16}$/, 'Must be 16 digits'),
  cardholderName: z.string().min(1, 'Name required'),
  expiryDate: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Format: MM/YY')
    .refine(date => {
      const [month, year] = date.split('/');
      const expiry = new Date(2000 + parseInt(year), parseInt(month));
      return expiry > new Date();
    }, 'Card expired'),
  cvv: z.string()
    .regex(/^\d{3,4}$/, 'Invalid CVV'),
});

// Billing address schema
export const billingAddressSchema = z.object({
  sameAsShipping: z.boolean(),
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.sameAsShipping) {
    if (!data.address) {
      ctx.addIssue({ code: 'custom', message: 'Address required', path: ['address'] });
    }
    if (!data.city) {
      ctx.addIssue({ code: 'custom', message: 'City required', path: ['city'] });
    }
    if (!data.zipCode) {
      ctx.addIssue({ code: 'custom', message: 'ZIP code required', path: ['zipCode'] });
    }
  }
});
```

---

## 🔧 Custom Validation Helpers

```typescript
// utils/validators.ts
import { z } from 'zod';

// Password strength levels
export const passwordStrength = z.string()
  .min(8, 'Too weak')
  .refine(pwd => /[A-Z]/.test(pwd), 'Need uppercase')
  .refine(pwd => /[a-z]/.test(pwd), 'Need lowercase')
  .refine(pwd => /[0-9]/.test(pwd), 'Need number')
  .refine(pwd => /[^A-Za-z0-9]/.test(pwd), 'Need special character');

// Phone number (international format)
export const phoneNumber = z.string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number');

// URL with https requirement
export const secureUrl = z.string()
  .url('Invalid URL')
  .startsWith('https://', 'Must use HTTPS');

// Username (alphanumeric + underscore)
export const username = z.string()
  .regex(/^[a-zA-Z0-9_]{3,20}$/, '3-20 chars, letters, numbers, underscore');

// Postal code (US, Canada, UK)
export const postalCode = z.string()
  .regex(/^\d{5}(-\d{4})?$/, 'Invalid US ZIP code')
  .or(z.string().regex(/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/, 'Invalid Canadian postal code'))
  .or(z.string().regex(/^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/, 'Invalid UK postcode'));

// Age validation
export const age = z.number()
  .min(18, 'Must be at least 18')
  .max(120, 'Invalid age');

// Future date validation
export const futureDate = z.string()
  .refine(date => new Date(date) > new Date(), 'Date must be in the future');

// Past date validation
export const pastDate = z.string()
  .refine(date => new Date(date) < new Date(), 'Date must be in the past');
```

---

## 🎨 Example: Complete Registration Form with All Features

```typescript
// schemas/completeRegistrationSchema.ts
import { z } from 'zod';

export const completeRegistrationSchema = z.object({
  // Step 1: Account
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Password too short'),
  confirmPassword: z.string(),
  
  // Step 2: Profile
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  dateOfBirth: z.string().refine(date => {
    const age = new Date().getFullYear() - new Date(date).getFullYear();
    return age >= 18;
  }, 'Must be 18+'),
  
  // Step 3: Contact
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/),
  address: z.string().min(5),
  city: z.string().min(2),
  
  // Step 4: Preferences
  newsletter: z.boolean(),
  termsAccepted: z.boolean().refine(val => val === true, 'Must accept terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type CompleteRegistrationData = z.infer<typeof completeRegistrationSchema>;
```

---

## 📚 Further Reading

| Topic | Link |
|-------|------|
| React Hook Form Best Practices | https://react-hook-form.com/advanced |
| Zod Error Handling | https://zod.dev/error-handling |
| Building Accessible Forms | https://react-hook-form.com/accessibility |
| Form Performance Optimization | https://react-hook-form.com/performance |
| Testing Forms with React Hook Form | https://react-hook-form.com/testing |
| React Hook Form vs Formik | https://react-hook-form.com/compare |

---

## 🔗 Related Day Resources

| Day | Topic | Link |
|-----|-------|------|
| Day 59 | Typing Custom Hooks | [Resource](./day-59-resources.md) |
| Day 60 | Typing Context & Global State | [Resource](./day-60-resources.md) |
| Day 61 | Type-Safe Forms | Current |
| Day 62 | TypeScript with Redux Toolkit | Coming Soon |

---

## ✅ Resources Checklist

- [ ] React Hook Form official docs
- [ ] Zod documentation
- [ ] @hookform/resolvers guide
- [ ] Watch React Hook Form TypeScript tutorial
- [ ] Practice basic typed form
- [ ] Create Zod schema with multiple validations
- [ ] Infer types from schema using `z.infer`
- [ ] Implement nested form data
- [ ] Add dynamic fields with `useFieldArray`
- [ ] Build multi-step form
- [ ] Add form persistence
- [ ] Test all validation rules

---

## 💡 Pro Tips Summary

| Tip | Explanation |
|-----|-------------|
| **Use `z.infer` for types** | Single source of truth for types and validation |
| **Set `mode: 'onChange'`** | Provides instant user feedback |
| **Use `valueAsNumber`** | Automatically converts number inputs |
| **Provide `defaultValues`** | Prevents React warnings |
| **Extract step validation** | Only validate current step |
| **Persist form data** | Save to localStorage for recovery |
| **Use `FormProvider`** | Avoids prop drilling register |
| **Test async validation** | Mock API calls in tests |

