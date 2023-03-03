import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

import { AccountsFragment } from './fragments/accounts';
import { AddressFragment } from './fragments/address';
import { ProfileDetailsFragment } from './fragments/profileDetails';

export const getProfileQuery = gql`
  ${AccountsFragment}
  ${AddressFragment}
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
        type
        avatar {
          id
          url
        }
        positionTotal
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
