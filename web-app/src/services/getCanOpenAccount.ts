import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AccountType } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const getCanOpenAccountQuery = gql`
  query canOpenAccount($accountType: String) {
    canOpenAccount(accountType: $accountType) {
      id
      type
    }
  }
`;

export const useGetCanOpenAccount = (accountType: AccountType): UseQueryResult<boolean> => {
  const graphQLClient = GraphQLClient();

  return useQuery<boolean>({
    queryKey: ['getCanOpenAccount', accountType],
    queryFn: async () => {
      const { getCanOpenAccount } = await graphQLClient.request(getCanOpenAccountQuery, { accountType });

      return getCanOpenAccount;
    },
  });
};
