import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { DraftAccount } from 'types/graphql';

import { useApiClient } from '../apiClient';

const accountDraftsQuery = gql`
  query listAccountDrafts {
    listAccountDrafts {
      id
      type
    }
  }
`;

export const useGetListAccount = (): UseQueryResult<DraftAccount[]> => {
  const api = useApiClient();

  return useQuery<DraftAccount[]>({
    queryKey: ['getAccountDrafts'],
    queryFn: async () => {
      const { listAccountDrafts } = await api.request(accountDraftsQuery);

      return listAccountDrafts;
    },
  });
};
