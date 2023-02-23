import { CognitoUserPool } from 'amazon-cognito-identity-js';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getApiClient } from 'services/getApiClient';
import { getIndividualQuery } from 'services/queries/getIndividual';

import { env } from '../../../env';
import { signin } from '../../../services/signin';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize({ email, password }: { email: string; password: string }) {
        const poolData = {
          UserPoolId: env.aws.cognito.userPoolId,
          ClientId: env.aws.cognito.clientId,
        };

        const authData = await signin({ email, password }, new CognitoUserPool(poolData));

        const authToken = authData.accessToken.getJwtToken();

        const client = getApiClient(authToken);

        const { getIndividual } = await client.request(getIndividualQuery);

        return {
          token: authToken,
          user: getIndividual,
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
        token: token.token,
        user: token.user as object,
      };
    },
  },
});
