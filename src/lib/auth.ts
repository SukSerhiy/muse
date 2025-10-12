import { PrismaAdapter } from '@auth/prisma-adapter';
import { compare } from 'bcrypt';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

import { db } from './db';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: 'jwt',
  },
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          if (credentials == null) return null;

          const user = await db.user.findUnique({
            where: {
              email: String(credentials?.email),
            },
          });

          if (!user) {
            throw new Error('User not found');
          }

          const isMatch = await compare(
            String(credentials.password),
            String(user.password)
          );

          if (!isMatch) {
            throw new Error('Check your password');
          }

          return {
            id: String(user.id),
            name: user.name,
            email: user.email,
            image: null,
          };
        } catch (error: unknown) {
          throw error;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,

      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  // debug: true,
  callbacks: {
    async signIn() {
      return true;
    },
    async jwt({ token, user }) {
      if (user && user.id) token.id = String(user.id);
      return token;
    },
    async session({ session, token }) {
      if (session.user && typeof token.id === 'string')
        session.user.id = token.id;
      return session;
    },
  },
});
