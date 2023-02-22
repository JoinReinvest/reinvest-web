import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { DraftAccount } from 'graphql/types';
import { gql } from 'graphql-request';

import { apiClient } from '../apiClient';

const accountDraftsQuery = gql`
  query listAccountDrafts {
    listAccountDrafts {
      id
      type
    }
  }
`;

export const useGetListAccount = (): UseQueryResult<DraftAccount[]> => {
  const api = apiClient();

  return useQuery<DraftAccount[]>({
    queryKey: ['getAccountDrafts'],
    queryFn: async () => {
      const { listAccountDrafts } = await api.request(accountDraftsQuery);

      return listAccountDrafts;
    },
  });
};
