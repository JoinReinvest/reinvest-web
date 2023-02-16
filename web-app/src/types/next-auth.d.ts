import NextAuth, { DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    token: string;
    user: DefaultSession['user'];
  }
}
