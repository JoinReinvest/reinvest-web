import { CognitoUserPool } from 'amazon-cognito-identity-js'
import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { env } from '../../../env'
import { signin } from '../../../services/signin'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      async authorize ({ email, password }) {
        const poolData = {
          UserPoolId: env.aws.cognito.userPoolId,
          ClientId: env.aws.cognito.clientId,
        }

        const authData = await signin({ email, password }, new CognitoUserPool(poolData))

        return authData.accessToken.getJwtToken()
      },
    }),
  ],
  callbacks: {
    async jwt ({ token, user }) {
      console.log(111)
      console.log(token)
      console.log(user)

      return token
    },
    async session ({ session, token }) {
      console.log(222)
      console.log(session)
      console.log(token)

      return session
    },
  },
})
