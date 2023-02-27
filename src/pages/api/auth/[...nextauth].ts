import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signin } from 'services/auth/signin';
import { getApiClient } from 'services/getApiClient';
import { getProfileQuery } from 'services/queries/getProfile';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      // @ts-expect-error - refer to https://next-auth.js.org/v3/providers/credentials#example
      async authorize({ email, password }: { email: string; password: string }) {
        const authData = await signin({ email, password });

        const authToken = authData.accessToken.getJwtToken();

        const client = getApiClient(authToken);

        const { getProfile } = await client.request(getProfileQuery);

        return {
          token: authToken,
          user: getProfile.details,
        };
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    jwt({ token, user }) {
      return {
        ...token,
        ...user,
      };
    },
    session({ token, session }) {
      return {
        ...session,
        ...token,
      };
    },
  },
});
