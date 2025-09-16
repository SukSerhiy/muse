import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  type User = {
    id: string;
    username?: string;
  } & DefaultUser;

  type Session = {
    user: DefaultSession['user'] & { id: string };
  } & DefaultSession;
}

declare module 'next-auth/jwt' {
  type JWT = {
    id?: string;
  };
}
