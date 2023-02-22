import { env } from 'env';
import { GraphQLError } from 'graphql/error';
import { GraphQLClient } from 'graphql-request';
import { useSession } from 'next-auth/react';

export const useApiClient = () => {
  const { data: session } = useSession();

  const token = session?.token;

  if (!token) {
    throw new GraphQLError('Empty token');
  }

  return new GraphQLClient(env.apiUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
