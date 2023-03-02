import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { AccountType } from 'types/graphql';

import { useApiClient } from '../useApiClient';

const getCanOpenAccountQuery = gql`
  query canOpenAccount($accountType: AccountType) {
    canOpenAccount(accountType: $accountType)
  }
`;

export const useGetCanOpenAccount = (accountType: AccountType): UseQueryResult<boolean> => {
  const api = useApiClient();

  return useQuery<boolean>({
    queryKey: ['getCanOpenAccount', accountType],
    queryFn: async () => {
      const { getCanOpenAccount } = await api.request(getCanOpenAccountQuery, { accountType });

      return getCanOpenAccount;
    },
  });
};
