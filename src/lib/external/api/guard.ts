import { ApiError, Response } from './types';

export function isError<T>(res: Response<T>): res is { error: ApiError } {
  return typeof res === 'object' && res !== null && 'error' in res;
}
