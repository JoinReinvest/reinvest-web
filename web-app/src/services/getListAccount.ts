import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { DraftAccount } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const accountDraftsQuery = gql`
  query {
    listAccountDrafts {
      id
      type
    }
  }
`;

export const useGetListAccount = (): UseQueryResult<DraftAccount[]> => {
  const graphQLClient = GraphQLClient();

  return useQuery<DraftAccount[]>({
    queryKey: ['getAccountDrafts'],
    queryFn: async () => {
      const { listAccountDrafts } = await graphQLClient.request(accountDraftsQuery);

      return listAccountDrafts;
    },
  });
};
