import { AuthenticationDetails, CognitoUser, CognitoUserAttribute, CognitoUserPool, CognitoUserSession } from 'amazon-cognito-identity-js';
import { env } from 'env';

export interface UserAuthenticationInterface {
  email: string;
  password: string;
}

const authenticateUser = async (cognitoUser: CognitoUser, cognitoAuthenticationDetails: AuthenticationDetails): Promise<CognitoUserSession> => {
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(cognitoAuthenticationDetails, {
      onSuccess: resolve,
      onFailure: reject,
    });
  });
};
export const getUserPoll = (): CognitoUserPool => {
  const poolData = {
    UserPoolId: env.aws.cognito.userPoolId,
    ClientId: env.aws.cognito.clientId,
  };

  return new CognitoUserPool(poolData);
};

const userPool = getUserPoll();

export const signin = async ({ email, password }: UserAuthenticationInterface) => {
  const authenticationData = {
    Username: email,
    Password: password,
  };

  const authenticationDetails = new AuthenticationDetails(authenticationData);

  const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

  const authenticatedUser = await authenticateUser(cognitoUser, authenticationDetails);

  return {
    accessToken: authenticatedUser.getAccessToken(),
    idToken: authenticatedUser.getIdToken(),
    refreshToken: authenticatedUser.getRefreshToken(),
  };
};

export const signup = async ({ email, password }: UserAuthenticationInterface) => {
  const userAttributes = [
    {
      Name: 'custom:incentive_token',
      Value: '123456',
    } as CognitoUserAttribute,
  ];

  return userPool.signUp(email, password, userAttributes, userAttributes, (err, result) => {
    if (err) {
      alert(err.message || JSON.stringify(err));

      return;
    }

    const cognitoUser = result.user;
    console.log('user name is ' + cognitoUser.getUsername());
  });
};

export const confirmRegistered = async (email: string, authCode: string, callback: (response: string) => void) => {
  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  cognitoUser.confirmRegistration(authCode, true, (err, result) => {
    if (err) {
      alert(err.message || JSON.stringify(err));
      callback(err.message || JSON.stringify(err));
    }

    callback(result);
  });
};
