import { Profile } from './graphql'

interface User extends Profile['details'] {
  email?: string;
  image?: string;
  name?: string;
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
