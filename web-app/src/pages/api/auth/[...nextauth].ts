import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { env } from 'env';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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
      // This methods expect to return an user-like object or `null | false`
      // if the authorization fails.
      async authorize({ email, password }: { email: string; password: string }) {
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
