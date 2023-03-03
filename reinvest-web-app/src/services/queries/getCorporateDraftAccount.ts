import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

const getCorporateDraftAccountQuery = gql`
  query getCorporateDraftAccount($accountId: ID) {
    getCorporateDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetCorporateDraftAccount = (accountId: string): UseQueryResult<Query['getCorporateDraftAccount']> => {
  const api = getApiClient();

  return useQuery<Query['getCorporateDraftAccount']>({
    queryKey: ['getCorporateDraftAccount', accountId],
    queryFn: async () => {
      const { getCorporateDraftAccount } = await api.request<Query>(getCorporateDraftAccountQuery, { accountId });

      return getCorporateDraftAccount;
    },
  });
};
