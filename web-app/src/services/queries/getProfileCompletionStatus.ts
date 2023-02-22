import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProfileCompletionStatus } from 'graphql/types';
import { gql } from 'graphql-request';

import { useApiClient } from '../apiClient';

const getProfileCompletionStatusQuery = gql`
  query profileCompletionStatus {
    profileCompletionStatus {
      detailsCompleted
      phoneCompleted
    }
  }
`;

export const useGetProfileCompletionStatus = (): UseQueryResult<ProfileCompletionStatus> => {
  const api = useApiClient();

  return useQuery<ProfileCompletionStatus>({
    queryKey: ['getProfileCompletionStatus'],
    queryFn: async () => {
      const { profileCompletionStatus } = await api.request(getProfileCompletionStatusQuery);

      return profileCompletionStatus;
    },
  });
};
