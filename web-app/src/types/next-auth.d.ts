import { DefaultSession } from 'next-auth';

import { Individual } from './graphql';

interface User extends Individual {
  email?: string | null | undefined;
  image?: string | null | undefined;
  name?: string | null | undefined;
}

declare module 'next-auth' {
  interface Session {
    token: string;
    user: DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string;
    user: User;
  }
}
