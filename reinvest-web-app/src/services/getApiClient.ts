import { Auth, CognitoUser } from '@aws-amplify/auth';
import { env } from 'env';
import { GraphQLClient } from 'graphql-request';

export const getApiClient = async () => {
  try {
    const currentUser: CognitoUser = await Auth.currentAuthenticatedUser();

    return new GraphQLClient(env.apiUrl, {
      requestMiddleware: async request => {
        const token = currentUser.getSignInUserSession()?.getAccessToken().getJwtToken();

        return {
          ...request,
          headers: { ...request.headers, Authorization: `Bearer ${token}` },
        };
      },
    });
  } catch (err) {
    console.log('1111111111111111111', err);

    return null;
  }
};
