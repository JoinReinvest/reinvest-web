import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { AccountType } from 'types/graphql';

const getCanOpenAccountQuery = gql`
  query canOpenAccount($accountType: AccountType) {
    canOpenAccount(accountType: $accountType)
  }
`;

export const useGetCanOpenAccount = (accountType: AccountType): UseQueryResult<boolean> => {
  const api = getApiClient();

  return useQuery<boolean>({
    queryKey: ['getCanOpenAccount', accountType],
    queryFn: async () => {
      const { getCanOpenAccount } = await api.request<any>(getCanOpenAccountQuery, { accountType });

      return getCanOpenAccount;
    },
  });
};
