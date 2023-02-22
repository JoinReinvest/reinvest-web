import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Account } from 'graphql/types';
import { gql } from 'graphql-request';

import { apiClient } from '../apiClient';

const getAccountQuery = gql`
  query getAccount($accountId: String) {
    getAccount(accountId: $accountId) {
      id
      type
    }
  }
`;

export const useGetAccount = (accountId: string): UseQueryResult<Account> => {
  const api = apiClient();

  return useQuery<Account>({
    queryKey: ['getAccount', accountId],
    queryFn: async () => {
      const { getAccount } = await api.request(getAccountQuery, { accountId });

      return getAccount;
    },
  });
};
