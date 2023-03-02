import { CognitoUserAttribute } from 'amazon-cognito-identity-js';

import { getUserPoll } from '../getUserPool';
import { UserAuthenticationInterface } from './signin';

export const signup = async ({ email, password, referralCode }: UserAuthenticationInterface, callback: (result: string | Error | undefined) => void) => {
  const userAttributes = [
    {
      Name: 'custom:incentive_token',
      Value: referralCode || '',
    } as CognitoUserAttribute,
  ];

  const userPool = getUserPoll();

  return userPool.signUp(email, password, userAttributes, userAttributes, (err, result) => {
    if (err) {
      return callback(err);
    }

    const cognitoUser = result?.user;

    return callback(cognitoUser?.getUsername());
  });
};
