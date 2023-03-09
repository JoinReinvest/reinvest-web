import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

const getIndividualDraftAccountQuery = gql`
  query getIndividualDraftAccount($accountId: ID) {
    getIndividualDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetIndividualDraftAccount = (accountId: string): UseQueryResult<Query['getIndividualDraftAccount']> =>
  useQuery<Query['getIndividualDraftAccount']>({
    queryKey: ['getIndividualDraftAccount', accountId],
    queryFn: async () => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { getIndividualDraftAccount } = await api.request<Query>(getIndividualDraftAccountQuery, { accountId });

      return getIndividualDraftAccount;
    },
  });
