import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { getGraphQLClient } from './getGraphQLClient';

export const accountDraftsQuery = gql`
  query {
    listAccountDrafts {
      id
      type
    }
  }
`;

export const useGetListAccount = (token: string) => {
  const graphQLClient = getGraphQLClient(token);

  return useQuery({
    queryKey: ['getAccountDrafts'],
    queryFn: async () => {
      const { listAccountDrafts } = await graphQLClient.request(accountDraftsQuery);

      return listAccountDrafts;
    },
  });
};
