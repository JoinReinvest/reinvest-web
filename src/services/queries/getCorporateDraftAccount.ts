import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { CorporateDraftAccount } from 'types/graphql';

const getCorporateDraftAccountQuery = gql`
  query getCorporateDraftAccount($accountId: ID) {
    getCorporateDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetCorporateDraftAccount = (accountId: string): UseQueryResult<CorporateDraftAccount> => {
  const api = getApiClient();

  return useQuery<CorporateDraftAccount>({
    queryKey: ['getCorporateDraftAccount', accountId],
    queryFn: async () => {
      const { getCorporateDraftAccount } = await api.request<any>(getCorporateDraftAccountQuery, { accountId });

      return getCorporateDraftAccount;
    },
  });
};
