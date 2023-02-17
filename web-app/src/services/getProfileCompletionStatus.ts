import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ProfileCompletionStatus } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const getProfileCompletionStatusQuery = gql`
  query profileCompletionStatus {
    profileCompletionStatus {
      detailsCompleted
      phoneCompleted
    }
  }
`;

export const useGetProfileCompletionStatus = (): UseQueryResult<ProfileCompletionStatus> => {
  const graphQLClient = GraphQLClient();

  return useQuery<ProfileCompletionStatus>({
    queryKey: ['getProfileCompletionStatus'],
    queryFn: async () => {
      const { profileCompletionStatus } = await graphQLClient.request(getProfileCompletionStatusQuery);

      return profileCompletionStatus;
    },
  });
};
