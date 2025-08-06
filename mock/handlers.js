import { http, HttpResponse } from 'msw';
import user from './data/user.json';

export const handlers = [
  http.get('https://jsonplaceholder.typicode.com/posts/1', () => HttpResponse.json(user))
];
