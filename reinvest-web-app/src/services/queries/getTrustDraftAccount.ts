import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { TrustDraftAccount } from 'types/graphql';

const getTrustDraftAccountQuery = gql`
  query getTrustDraftAccount($accountId: ID) {
    getTrustDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetTrustDraftAccount = (accountId: string): UseQueryResult<TrustDraftAccount> => {
  const api = getApiClient();

  return useQuery<TrustDraftAccount>({
    queryKey: ['getTrustDraftAccount', accountId],
    queryFn: async () => {
      const { getTrustDraftAccount } = await api.request<any>(getTrustDraftAccountQuery, { accountId });

      return getTrustDraftAccount;
    },
  });
};
