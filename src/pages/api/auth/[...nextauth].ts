import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { env } from 'env';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getApiClient } from 'services/getApiClient';
import { getProfileQuery } from 'services/queries/getProfile';
import { signin } from 'services/signin';

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
        const poolData = {
          UserPoolId: env.aws.cognito.userPoolId,
          ClientId: env.aws.cognito.clientId,
        };

        const authData = await signin({ email, password }, new CognitoUserPool(poolData));

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
