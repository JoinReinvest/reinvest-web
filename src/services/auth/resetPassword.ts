import { getCognitoUser } from 'services/getCognitoUser';

export const resetPassword = (email: string, newPassword: string, authenticationCode: string): Promise<string> => {
  const cognitoUser = getCognitoUser(email);

  return new Promise((resolve, reject) => {
    cognitoUser.confirmPassword(authenticationCode, newPassword, {
      onSuccess: resolve,
      onFailure: err => reject(err.message),
    });
  });
};
