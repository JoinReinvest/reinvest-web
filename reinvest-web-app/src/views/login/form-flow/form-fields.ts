import { CognitoUser } from '@aws-amplify/auth';

export interface LoginFormFields {
  authenticationCode: string;
  email: string;
  password: string;
  user?: CognitoUser;
}
