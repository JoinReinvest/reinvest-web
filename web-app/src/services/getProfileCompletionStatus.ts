import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProfileCompletionStatus } from 'types/graphql';
import { gql } from 'graphql-request';

import { apiClient } from './apiClient';

const getProfileCompletionStatusQuery = gql`
  query profileCompletionStatus {
    profileCompletionStatus {
      detailsCompleted
      phoneCompleted
    }
  }
`;

export const useGetProfileCompletionStatus = (): UseQueryResult<ProfileCompletionStatus> => {
  const api = apiClient();

  return useQuery<ProfileCompletionStatus>({
    queryKey: ['getProfileCompletionStatus'],
    queryFn: async () => {
      const { profileCompletionStatus } = await api.request(getProfileCompletionStatusQuery);

      return profileCompletionStatus;
    },
  });
};
