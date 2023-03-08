import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

import { AvatarFragment } from './fragments/avatar';
import { ProfileDetailsFragment } from './fragments/profileDetails';

export const getProfileQuery = gql`
  ${ProfileDetailsFragment}
  ${AvatarFragment}
  query getProfile {
    getProfile {
      externalId
      label
      avatar {
        ...AvatarFragment
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

export const useGetUserProfile = () =>
  useQuery<Query['getProfile'] | null>({
    queryKey: ['getProfile'],
    queryFn: async () => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { getProfile } = await api.request<Query>(getProfileQuery);

      return getProfile;
    },
  });
