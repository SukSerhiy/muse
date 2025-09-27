import { FetchOptions } from './types';

export async function getData<T>(
  url: string,
  options?: FetchOptions
): Promise<T> {
  try {
    const response: Response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw error;
  }
}
