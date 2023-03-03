import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

export const getProfileQuery = gql`
  query getProfile {
    getProfile {
      externalId
      label
      avatar {
        id
      }
      isCompleted
      details {
        firstName
        middleName
        lastName
        dateOfBirth
        ssn
      }
      accounts {
        id
      }
    }
  }
`;

export const useGetUserProfile = (): UseQueryResult<Query['getProfile']> => {
  const api = getApiClient();

  return useQuery<Query['getProfile']>({
    queryKey: ['getProfile'],
    queryFn: async () => {
      const { getProfile } = await api.request<Query>(getProfileQuery);

      return getProfile;
    },
  });
};
