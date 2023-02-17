import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Account } from 'gql/types';
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

export const useGetAccount = (accountId: string): UseQueryResult<Account> => {
  const graphQLClient = GraphQLClient();

  return useQuery<Account>({
    queryKey: ['getAccount', accountId],
    queryFn: async () => {
      const { getAccount } = await graphQLClient.request(getAccountQuery, { accountId });

      return getAccount;
    },
  });
};
