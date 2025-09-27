import { isError } from '@/lib/external/api/guard';
import { Response } from '@/lib/external/api/types';

export function withErrorGuard<T>(promise: Promise<Response<T>>): Promise<T> {
  return promise.then((res) => {
    if (isError(res)) {
      throw new Error(res.error.message);
    }
    return res as T;
  });
}

export async function withErrorGuardAndMap<T, R = T>(
  promise: Promise<Response<T>>,
  mapper?: (data: T) => R
): Promise<R> {
  const res = await withErrorGuard(promise);
  return mapper ? mapper(res) : (res as unknown as R);
}
