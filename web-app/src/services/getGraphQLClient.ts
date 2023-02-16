import { GraphQLClient } from 'graphql-request';

export const getGraphQLClient = (token: string) =>
  new GraphQLClient(process.env.API_URL || '', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
