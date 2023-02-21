import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { apiClient } from './apiClient';

export const accountDraftsQuery = gql`
  query {
    listAccountDrafts {
      id
      type
    }
  }
`;

export const useGetListAccount = () => {
  const api = apiClient();

  return useQuery({
    queryKey: ['getAccountDrafts'],
    queryFn: async () => {
      const { listAccountDrafts } = await api.request(accountDraftsQuery);

      return listAccountDrafts;
    },
  });
};
