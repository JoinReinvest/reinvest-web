import { CognitoUser } from 'amazon-cognito-identity-js';

import { getUserPoll } from './getUserPool';

export const getCognitoUser = (email: string) => {
  const userPool = getUserPoll();

  return new CognitoUser({ Username: email, Pool: userPool });
};
