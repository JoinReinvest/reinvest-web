import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { Profile } from 'types/graphql';

import { apiClient } from './apiClient';

const getProfileQuery = gql`
  query getProfile {
    getProfile {
      externalId
      label
      avatarUrl
      accounts {
        id
        type
        avatarUrl
        positionTotal
      }
      details {
        firstName
        middleName
        lastName
        dateOfBirth
        domicile
        address {
          addressLine1
          addressLine2
          city
          zip
          country
          state
        }
      }
      completionStatus {
        detailsCompleted
        phoneCompleted
      }
    }
  }
`;

export const useGetAccount = (): UseQueryResult<Profile> => {
  const api = apiClient();

  return useQuery<Profile>({
    queryKey: ['getProfile'],
    queryFn: async () => {
      const { getProfile } = await api.request(getProfileQuery);

      return getProfile;
    },
  });
};
