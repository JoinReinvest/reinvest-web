import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AccountType } from 'types/graphql';
import { gql } from 'graphql-request';

import { apiClient } from './apiClient';

const getCanOpenAccountQuery = gql`
  query canOpenAccount($accountType: String) {
    canOpenAccount(accountType: $accountType) {
      id
      type
    }
  }
`;

export const useGetCanOpenAccount = (accountType: AccountType): UseQueryResult<boolean> => {
  const api = apiClient();

  return useQuery<boolean>({
    queryKey: ['getCanOpenAccount', accountType],
    queryFn: async () => {
      const { getCanOpenAccount } = await api.request(getCanOpenAccountQuery, { accountType });

      return getCanOpenAccount;
    },
  });
};
