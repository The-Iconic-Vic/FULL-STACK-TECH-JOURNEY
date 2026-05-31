import { z } from 'zod';

// Sub-schemas for clean reusable validations
export const firstNameSchema = z.string()
  .trim()
  .min(2, 'First name must be at least 2 characters')
  .max(50, 'First name cannot exceed 50 characters');

export const lastNameSchema = z.string()
  .trim()
  .min(2, 'Last name must be at least 2 characters')
  .max(50, 'Last name cannot exceed 50 characters');

export const emailSchema = z.string()
  .trim()
  .min(1, 'Email address is required')
  .email('Please enter a valid email address');

// Matches 10-20 digits, optionally starting with +, allowing spaces, dashes, and parentheses
export const phoneSchema = z.string()
  .trim()
  .min(1, 'Phone number is required')
  .regex(/^\+?[0-9\s\-()]{10,20}$/, 'Phone number must contain 10-20 digits (e.g., +1 234 567 8900)');

export const usernameSchema = z.string()
  .trim()
  .min(3, 'Username must be at least 3 characters')
  .max(20, 'Username cannot exceed 20 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain alphanumeric characters and underscores');

export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Must contain at least one special character');

export const acceptTermsSchema = z.literal(true, {
  message: 'You must accept the terms and conditions',
});

// --- Step-level Schemas ---

// Step 1: Personal Info
export const personalInfoSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  phone: phoneSchema,
});

// Step 2: Account Details (Requires refinement for password matching)
export const accountDetailsSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// Step 3: Confirmation
export const confirmationSchema = z.object({
  acceptTerms: acceptTermsSchema,
});

// --- Unified Final Form Schema ---
export const registrationSchema = z.object({
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  email: emailSchema,
  phone: phoneSchema,
  username: usernameSchema,
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password'),
  acceptTerms: acceptTermsSchema,
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

// --- TypeScript Interfaces ---
export type PersonalInfoData = z.infer<typeof personalInfoSchema>;
export type AccountDetailsData = z.infer<typeof accountDetailsSchema>;
export type ConfirmationData = z.infer<typeof confirmationSchema>;
export type MultiStepFormData = z.infer<typeof registrationSchema>;
export type StepFieldNames = keyof MultiStepFormData;
