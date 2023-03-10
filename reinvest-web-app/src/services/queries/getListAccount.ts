import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

const accountDraftsQuery = gql`
  query listAccountDrafts {
    listAccountDrafts {
      id
      type
    }
  }
`;

export const useGetListAccount = (): UseQueryResult<Query['listAccountDrafts']> =>
  useQuery<Query['listAccountDrafts']>({
    queryKey: ['getAccountDrafts'],
    queryFn: async () => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { listAccountDrafts } = await api.request<Query>(accountDraftsQuery);

      return listAccountDrafts;
    },
  });
