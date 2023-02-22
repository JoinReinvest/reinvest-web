import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { ProfileCompletionStatus } from 'types/graphql';

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
