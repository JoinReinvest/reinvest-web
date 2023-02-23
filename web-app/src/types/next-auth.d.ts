import { Individual } from './graphql';

interface User extends Individual {
  email?: string | null | undefined;
  image?: string | null | undefined;
  name?: string | null | undefined;
}

declare module 'next-auth' {
  interface Session {
    token: string;
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string;
    user: User;
  }
}
