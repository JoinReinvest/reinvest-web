import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { AccountType } from 'graphql/types';
import { gql } from 'graphql-request';

import { apiClient } from '../apiClient';

const getCanOpenAccountQuery = gql`
  query canOpenAccount($accountType: AccountType) {
    canOpenAccount(accountType: $accountType)
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
