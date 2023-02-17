import { useQuery } from '@tanstack/react-query';
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

export const useGetProfileCompletionStatus = () => {
  const graphQLClient = GraphQLClient();

  return useQuery({
    queryKey: ['getProfileCompletionStatus'],
    queryFn: async () => {
      const { profileCompletionStatus } = await graphQLClient.request(getProfileCompletionStatusQuery);

      return profileCompletionStatus;
    },
  });
};
