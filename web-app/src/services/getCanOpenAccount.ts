import { useQuery } from '@tanstack/react-query';
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

export const useGetCanOpenAccount = (accountType: AccountType) => {
  const graphQLClient = GraphQLClient();

  return useQuery({
    queryKey: ['getCanOpenAccount', accountType],
    queryFn: async () => {
      const { getCanOpenAccount } = await graphQLClient.request(getCanOpenAccountQuery, { accountType });

      return getCanOpenAccount;
    },
  });
};
