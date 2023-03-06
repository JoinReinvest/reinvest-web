import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

import { ProfileDetailsFragment } from './fragments/profileDetails';

export const getProfileQuery = gql`
  ${ProfileDetailsFragment}
  query getProfile {
    getProfile {
      externalId
      label
      avatar {
        id
        url
      }
      isCompleted
      details {
        ...ProfileDetailsFragment
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
