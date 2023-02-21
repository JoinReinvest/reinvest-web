import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { DraftAccount } from 'graphql/types';

import { apiClient } from './apiClient';

const accountDraftsQuery = gql`
  query {
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
