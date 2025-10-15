'use server';
import * as z from 'zod';

import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { editProfileSchema } from '@/lib/validation';

type FormState = {
  success: boolean;
  fields?: Record<string, string>;
  errors?: string | Record<string, string>;
};

export async function editProfile(
  previousState: FormState,
  formData: FormData
): Promise<FormState> {
  const raw = Object.fromEntries(formData.entries());

  const data = {
    name: raw.name ? String(raw.name) : null,
    gender: raw.gender ? String(raw.gender) : null,
    dob: raw.dob ? new Date(String(raw.dob)) : null,
    country: raw.country ? String(raw.country) : null,
    bio: raw.bio ? String(raw.bio) : null,
  };

  const session = await auth();
  const { id: userId } = session?.user || {};

  if (!userId) {
    throw new Error('User not found');
  }

  console.log('data', data);

  const result = editProfileSchema.safeParse(data);

  console.log('result', result);

  if (!result.success) {
    const fieldErrors: Record<string, string> = {};
    const flattened = z.flattenError(result.error);
    for (const [k, v] of Object.entries(flattened.fieldErrors)) {
      if (v && v.length) fieldErrors[k] = v[0];
    }
    return { success: false, errors: fieldErrors };
  }

  await db.user.update({
    where: { id: userId },
    data: data,
  });

  return { success: true };
}
