import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

import { AccountsFragment } from './fragments/accounts';
import { AddressFragment } from './fragments/address';
import { CompletionStatusFragment } from './fragments/completionStatus';
import { ProfileDetailsFragment } from './fragments/profileDetails';

export const getProfileQuery = gql`
  ${AccountsFragment}
  ${AddressFragment}
  ${CompletionStatusFragment}
  ${ProfileDetailsFragment}
  query getProfile {
    getProfile {
      externalId
      label
      avatarUrl
      accounts {
        ...AccountsFragment
      }
      details {
        ...ProfileDetailsFragment
        address {
          ...AddressFragment
        }
      }
      completionStatus {
        ...CompletionStatusFragment
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
