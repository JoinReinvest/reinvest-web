import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js'

export interface UserAuthenticationInterface {
  email: string;
  password: string;
}

const authenticateUser = async (cognitoUser: CognitoUser, cognitoAuthenticationDetails: AuthenticationDetails): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
    })
  })
}

export const signin = async ({ email, password }: UserAuthenticationInterface, userPool: CognitoUserPool) => {
  const authenticationData = {
    Username: email,
    Password: password,
  }

  const authenticationDetails = new AuthenticationDetails(authenticationData)

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool })

  const authenticatedUser = await authenticateUser(cognitoUser, authenticationDetails)

  return {
    accessToken: authenticatedUser.getAccessToken(),
    idToken: authenticatedUser.getIdToken(),
    refreshToken: authenticatedUser.getRefreshToken(),
  }
}
