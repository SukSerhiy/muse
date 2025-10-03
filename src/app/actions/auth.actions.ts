'use server';
import type { ProviderId } from 'next-auth/providers';

import { hash } from 'bcrypt';
import * as z from 'zod';

import { signIn } from '@/lib/auth';
import { db } from '@/lib/db';
import { signUpSchema } from '@/lib/validation';

export async function doSocialLogin(formData: FormData) {
  const action = formData.get('action');
  await signIn(action as ProviderId, { redirectTo: '/home' });
}

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: string | Record<string, string>;
};

export async function signUp(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries());

  const data = {
    username: String(raw.username ?? ''),
    email: String(raw.email ?? ''),
    password: String(raw.password ?? ''),
  };

  const { username, email, password } = data;

  const result = signUpSchema.safeParse(data);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    const flattened = z.flattenError(result.error);
    for (const [k, v] of Object.entries(flattened.fieldErrors)) {
      if (v && v.length) fieldErrors[k] = v[0];
    }
    return { success: false, errors: fieldErrors };
  }

  const userByUsername = await db.user.findUnique({
    where: { username },
  });

  if (userByUsername) {
    return {
      success: false,
      errors: {
        username: 'this_email_is_already_in_use',
      },
    };
  }

  const userByEmail = await db.user.findUnique({
    where: { email },
  });

  if (userByEmail) {
    return {
      success: false,
      errors: {
        email: 'this_email_is_already_in_use',
      },
    };
  }

  const hashedPassword = await hash(password, 10);

  await db.user.create({
    data: {
      username: data.username,
      password: hashedPassword,
      email: data.email,
      provider: 'CREDENTIALS',
    },
  });

  return { success: true };
}
