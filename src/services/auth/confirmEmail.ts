import { getCognitoUser } from 'services/getCognitoUser';

export const confirmEmail = async (email: string, authCode: string, callback: (response: string) => void) => {
  const cognitoUser = getCognitoUser(email);

  return cognitoUser.confirmRegistration(authCode, true, (err, result) => {
    if (err) {
      return callback(err.message || err);
    }

    return callback(result);
  });
};
