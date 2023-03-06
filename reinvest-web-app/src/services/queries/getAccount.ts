import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

import { AvatarFragment } from './fragments/avatar';

const getAccountQuery = gql`
  ${AvatarFragment}
  query getAccount($accountId: String) {
    getAccount(accountId: $accountId) {
      id
      type
      avatar {
        ...AvatarFragment
      }
      positionTotal
    }
  }
`;

export const useGetAccount = (accountId: string): UseQueryResult<Query['getAccount']> => {
  const api = getApiClient;

  return useQuery<Query['getAccount']>({
    queryKey: ['getAccount', accountId],
    queryFn: async () => {
      const { getAccount } = await api.request<Query>(getAccountQuery, { accountId });

      return getAccount;
    },
  });
};
