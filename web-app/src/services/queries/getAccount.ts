import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { Account } from 'types/graphql';

import { useApiClient } from '../apiClient';

const getAccountQuery = gql`
  query getAccount($accountId: String) {
    getAccount(accountId: $accountId) {
      id
      type
    }
  }
`;

export const useGetAccount = (accountId: string): UseQueryResult<Account> => {
  const api = useApiClient();

  return useQuery<Account>({
    queryKey: ['getAccount', accountId],
    queryFn: async () => {
      const { getAccount } = await api.request(getAccountQuery, { accountId });

      return getAccount;
    },
  });
};
