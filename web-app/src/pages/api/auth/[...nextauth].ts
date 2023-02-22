import { CognitoUserPool } from 'amazon-cognito-identity-js';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
      async authorize({ email, password }) {
        const poolData = {
          UserPoolId: env.aws.cognito.userPoolId,
          ClientId: env.aws.cognito.clientId,
        };

        const authData = await signin({ email, password }, new CognitoUserPool(poolData));

        return authData.accessToken.getJwtToken();
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
        user,
      };
    },
    session({ token, session }) {
      return {
        ...session,
        token: token.user as string,
      };
    },
  },
});
