import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const getTrustDraftAccountQuery = gql`
  query getTrustDraftAccount($accountId: ID) {
    getTrustDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetTrustDraftAccount = (accountId: string) => {
  const graphQLClient = GraphQLClient();

  return useQuery({
    queryKey: ['getTrustDraftAccount', accountId],
    queryFn: async () => {
      const { getTrustDraftAccount } = await graphQLClient.request(getTrustDraftAccountQuery, { accountId });

      return getTrustDraftAccount;
    },
  });
};
