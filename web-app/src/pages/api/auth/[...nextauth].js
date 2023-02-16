import { CognitoUserPool } from 'amazon-cognito-identity-js';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '../../../env';
import { getGraphQLClient } from '../../../services/getGraphQLClient';
import { accountDraftsQuery } from '../../../services/getListAccount';
import { signin } from '../../../services/signin';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const poolData = {
          UserPoolId: env.aws.cognito.userPoolId,
          ClientId: env.aws.cognito.clientId,
        };

        const authData = await signin({ email, password }, new CognitoUserPool(poolData));

        const token = authData.accessToken.getJwtToken();

        const client = getGraphQLClient(token);

        return client.request(accountDraftsQuery);
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;

      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }

      return token;
    },
  },
};
export default NextAuth(authOptions);
