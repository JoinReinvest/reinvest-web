import { CognitoUserPool } from 'amazon-cognito-identity-js'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { env } from '../../../env'
import { signin } from '../../../services/signin'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      id: 'credentials',
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
      },
      async authorize ({ email, password }) {
        const poolData = {
          UserPoolId: env.aws.cognito.userPoolId,
          ClientId: env.aws.cognito.clientId,
        }
console.log(123)
        const authData = await signin({ email, password }, new CognitoUserPool(poolData))

        return authData.accessToken.getJwtToken()
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);

      console.log(111)
      console.log('jwt', token)
      console.log('jwt', user)

      return token;
    },
    async session({ session, token }) {
      session.token = token.user;

      console.log(222)
      console.log('session', session)
      console.log('session', token)

      return session;
    },
  },
})
