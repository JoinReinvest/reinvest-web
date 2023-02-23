import { env } from 'env';
import { GraphQLError } from 'graphql';
import { GraphQLClient } from 'graphql-request';

export const getApiClient = (token: string | undefined) => {
  if (!token) {
    throw new GraphQLError('Empty token');
  }

  return new GraphQLClient(env.apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
