import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { env } from 'env';

export const getUserPoll = (): CognitoUserPool => {
  const poolData = {
    UserPoolId: env.aws.cognito.userPoolId,
    ClientId: env.aws.cognito.clientId,
  };

  return new CognitoUserPool(poolData);
};
