import { CognitoUser } from 'amazon-cognito-identity-js';

import { getUserPoll } from '../getUserPool';

export const confirmEmail = async (email: string, authCode: string, callback: (response: string) => void) => {
  const userPool = getUserPoll();

  const userData = {
    Username: email,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);

  return cognitoUser.confirmRegistration(authCode, true, (err, result) => {
    if (err) {
      return callback(err.message || err);
    }

    return callback(result);
  });
};
