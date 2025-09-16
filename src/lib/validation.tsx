import * as z from 'zod';

export const signUpSchema = z.object({
  username: z.string().min(1, 'Username is required').max(100),
  email: z.email('invalid_email').min(1, 'email_is_required'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must contain at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and include uppercase, lowercase, number and special character.'
    ),
});
