import { isError } from '@/lib/external/api/guard';
import { Response } from '@/lib/external/api/types';

export async function withErrorGuard<T>(
  promise: Promise<Response<T>>
): Promise<T> {
  const res = await promise;
  if (isError(res)) {
    throw new Error(res.error.message);
  }
  return res;
}

export async function withErrorGuardAndMap<T, R = T>(
  promise: Promise<Response<T>>,
  mapper?: (res: T) => R
): Promise<R> {
  const res = await withErrorGuard(promise);
  return mapper ? mapper(res) : (res as unknown as R);
}
