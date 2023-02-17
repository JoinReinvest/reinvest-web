import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const getAccountQuery = gql`
  query getAccount($accountId: String) {
    getAccount(accountId: $accountId) {
      id
      type
    }
  }
`;

export const useGetAccount = (accountId: string) => {
  const graphQLClient = GraphQLClient();

  return useQuery({
    queryKey: ['getAccount', accountId],
    queryFn: async () => {
      const { getAccount } = await graphQLClient.request(getAccountQuery, { accountId });

      return getAccount;
    },
  });
};
