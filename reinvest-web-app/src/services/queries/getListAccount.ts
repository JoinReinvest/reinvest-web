import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { DraftAccount } from 'types/graphql';

const accountDraftsQuery = gql`
  query listAccountDrafts {
    listAccountDrafts {
      id
      type
    }
  }
`;

export const useGetListAccount = (): UseQueryResult<DraftAccount[]> => {
  const api = getApiClient();

  return useQuery<DraftAccount[]>({
    queryKey: ['getAccountDrafts'],
    queryFn: async () => {
      const { listAccountDrafts } = await api.request(accountDraftsQuery);

      return listAccountDrafts;
    },
  });
};
