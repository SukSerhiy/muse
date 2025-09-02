import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  type User = {
    username: string;
  } & DefaultUser

  type Session = {
    user: User;
  } & DefaultSession
}
