import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Maybe, Query, TrustDraftAccount } from 'types/graphql';

const getTrustDraftAccountQuery = gql`
  query getTrustDraftAccount($accountId: ID) {
    getTrustDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetTrustDraftAccount = (accountId: string): UseQueryResult =>
  useQuery<Maybe<TrustDraftAccount> | undefined>({
    queryKey: ['getTrustDraftAccount', accountId],
    queryFn: async () => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { getTrustDraftAccount } = await api.request<Query>(getTrustDraftAccountQuery, { accountId });

      return getTrustDraftAccount;
    },
  });
