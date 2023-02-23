import { env } from 'env';
import { GraphQLClient } from 'graphql-request';

export const getApiClient = (token: string | undefined) => {
  if (!token) {
    throw new Error('Empty token');
  }

  return new GraphQLClient(env.apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
