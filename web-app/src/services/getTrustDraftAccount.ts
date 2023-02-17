import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TrustDraftAccount } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const getTrustDraftAccountQuery = gql`
  query getTrustDraftAccount($accountId: ID) {
    getTrustDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetTrustDraftAccount = (accountId: string): UseQueryResult<TrustDraftAccount> => {
  const graphQLClient = GraphQLClient();

  return useQuery<TrustDraftAccount>({
    queryKey: ['getTrustDraftAccount', accountId],
    queryFn: async () => {
      const { getTrustDraftAccount } = await graphQLClient.request(getTrustDraftAccountQuery, { accountId });

      return getTrustDraftAccount;
    },
  });
};
