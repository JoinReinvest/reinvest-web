import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CorporateDraftAccount } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const getCorporateDraftAccountQuery = gql`
  query getCorporateDraftAccount($accountId: ID) {
    getCorporateDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetCorporateDraftAccount = (accountId: string): UseQueryResult<CorporateDraftAccount> => {
  const graphQLClient = GraphQLClient();

  return useQuery<CorporateDraftAccount>({
    queryKey: ['getCorporateDraftAccount', accountId],
    queryFn: async () => {
      const { getCorporateDraftAccount } = await graphQLClient.request(getCorporateDraftAccountQuery, { accountId });

      return getCorporateDraftAccount;
    },
  });
};
