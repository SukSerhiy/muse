export type ApiError = { type: string; message: string; code: number };

export type Response<T> = T | { error: ApiError };

export function isError<T>(res: Response<T>): res is { error: ApiError } {
  return typeof res === 'object' && res !== null && 'error' in res;
}
