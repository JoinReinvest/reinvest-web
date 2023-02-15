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
        const { username, password } = credentials;

        var poolData = {
          UserPoolId: env.awsCognito.userPoolId,
          ClientId: env.awsCognito.clientId,
        };

        await signin({ email: username, password }, new CognitoUserPool(poolData));
      },
    }),
  ],
};
export default NextAuth(authOptions);
