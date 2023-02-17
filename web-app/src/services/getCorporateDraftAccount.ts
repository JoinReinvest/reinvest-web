import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const getCorporateDraftAccountQuery = gql`
  query getCorporateDraftAccount($accountId: ID) {
    getCorporateDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetCorporateDraftAccount = (accountId: string) => {
  const graphQLClient = GraphQLClient();

  return useQuery({
    queryKey: ['getCorporateDraftAccount', accountId],
    queryFn: async () => {
      const { getCorporateDraftAccount } = await graphQLClient.request(getCorporateDraftAccountQuery, { accountId });

      return getCorporateDraftAccount;
    },
  });
};
