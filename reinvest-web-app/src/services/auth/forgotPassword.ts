import { getCognitoUser } from 'services/getCognitoUser';

export const forgotPassword = async (email: string): Promise<string> => {
  const cognitoUser = getCognitoUser(email);

  return new Promise((resolve, reject) => {
    cognitoUser.forgotPassword({
      onSuccess: () => resolve('SUCCESS'),
      onFailure: err => reject(err.message),
    });
  });
};
