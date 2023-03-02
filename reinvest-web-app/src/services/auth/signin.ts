import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';
import { getCognitoUser } from 'services/getCognitoUser';

export interface UserAuthenticationInterface {
  email: string;
  password: string;
  referralCode?: string;
}

const authenticateUser = async (cognitoUser: CognitoUser, cognitoAuthenticationDetails: AuthenticationDetails): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};

export const signin = async ({ email, password }: UserAuthenticationInterface) => {
  const authenticationData = {
    Username: email,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const cognitoUser = getCognitoUser(email);

  const authenticatedUser = await authenticateUser(cognitoUser, authenticationDetails);

  return {
    accessToken: authenticatedUser.getAccessToken(),
    idToken: authenticatedUser.getIdToken(),
    refreshToken: authenticatedUser.getRefreshToken(),
  };
};
