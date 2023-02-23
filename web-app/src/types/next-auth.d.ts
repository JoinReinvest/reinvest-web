import { DefaultSession } from 'next-auth';

import { Individual } from './graphql';

declare module 'next-auth' {
  interface Session {
    token: string;
    user: DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    token: string;
    user: Individual;
  }
}
