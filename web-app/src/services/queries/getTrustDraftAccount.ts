import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { TrustDraftAccount } from 'graphql/types';
import { gql } from 'graphql-request';

import { apiClient } from '../apiClient';

const getTrustDraftAccountQuery = gql`
  query getTrustDraftAccount($accountId: ID) {
    getTrustDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetTrustDraftAccount = (accountId: string): UseQueryResult<TrustDraftAccount> => {
  const api = apiClient();

  return useQuery<TrustDraftAccount>({
    queryKey: ['getTrustDraftAccount', accountId],
    queryFn: async () => {
      const { getTrustDraftAccount } = await api.request(getTrustDraftAccountQuery, { accountId });

      return getTrustDraftAccount;
    },
  });
};
