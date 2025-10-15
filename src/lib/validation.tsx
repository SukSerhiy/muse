import * as z from 'zod';

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])[^\s]{8,}$/;

export const signInSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Validation.email_is_required' })
    .pipe(z.email({ message: 'Validation.invalid_email' })),
  password: z
    .string()
    .min(1, 'Validation.password_is_required')
    .min(8, 'Validation.password_length')
    .regex(PASSWORD_REGEX, 'Validation.password_format'),
});

export const signUpSchema = z.object({
  email: z
    .email('Validation.invalid_email')
    .min(1, 'Validation.email_is_required'),
  password: z
    .string()
    .min(1, 'Validation.password_is_required')
    .min(8, 'Validation.password_length')
    .regex(PASSWORD_REGEX, 'Validation.password_format'),
});

export const editProfileSchema = z.object({
  name: z.string().max(100, 'Validation.username_is_too_long').nullable(),
  gender: z.enum(['male', 'female', 'other']).nullable(),
  dob: z.date().optional().nullable(),
  country: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
});
