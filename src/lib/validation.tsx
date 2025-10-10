import * as z from 'zod';

export const signInSchema = z.object({
  email: z.email('Invalid email').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number and special character.'
    ),
});

export const signUpSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  email: z.email('Invalid email').min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number and special character.'
    ),
});

export const editProfileSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  gender: z.enum(['male', 'female', 'other']).nullable(),
  dateOfBirth: z.date().optional().nullable(),
  country: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
});
