import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { CorporateDraftAccount } from 'types/graphql';
import { gql } from 'graphql-request';

import { apiClient } from './apiClient';

const getCorporateDraftAccountQuery = gql`
  query getCorporateDraftAccount($accountId: ID) {
    getCorporateDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetCorporateDraftAccount = (accountId: string): UseQueryResult<CorporateDraftAccount> => {
  const api = apiClient();

  return useQuery<CorporateDraftAccount>({
    queryKey: ['getCorporateDraftAccount', accountId],
    queryFn: async () => {
      const { getCorporateDraftAccount } = await api.request(getCorporateDraftAccountQuery, { accountId });

      return getCorporateDraftAccount;
    },
  });
};
