import { AuthenticationDetails, CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

import { getUserPoll } from '../getUserPool';

export interface UserAuthenticationInterface {
  email: string;
  password: string;
  referralCode?: string;
}

export const cognitoCallbacks = (resolve, reject) => ({
  onSuccess: resolve,
  onFailure: reject,
  mfaRequired: codeDeliveryDetails => {
    console.log('codeDeliveryDetails', codeDeliveryDetails);
  },
});

const authenticateUser = async (cognitoUser: CognitoUser, cognitoAuthenticationDetails: AuthenticationDetails): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(cognitoAuthenticationDetails, cognitoCallbacks(resolve, reject));
  });
};

export const signin = async ({ email, password }: UserAuthenticationInterface) => {
  const authenticationData = {
    Username: email,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const userPool = getUserPoll();

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  const authenticatedUser = await authenticateUser(cognitoUser, authenticationDetails);

  return {
    accessToken: authenticatedUser.getAccessToken(),
    idToken: authenticatedUser.getIdToken(),
    refreshToken: authenticatedUser.getRefreshToken(),
  };
};
