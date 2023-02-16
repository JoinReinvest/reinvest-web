import { CognitoUserPool } from 'amazon-cognito-identity-js';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { env } from '../../../env';
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

        return token;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);

      return token;
    },
    async session({ session, token }) {
      session.token = token.user;

      return session;
    },
  },
};
export default NextAuth(authOptions);
