import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { Profile } from 'types/graphql';

import { useApiClient } from '../useApiClient';
import { AccountsFragment } from './fragments/accounts';
import { AddressFragment } from './fragments/address';
import { CompletionStatusFragment } from './fragments/completionStatus';
import { ProfileDetailsFragment } from './fragments/profileDetails';

const getProfileQuery = gql`
  ${ProfileDetailsFragment}
  ${CompletionStatusFragment}
  ${AccountsFragment}
  ${AddressFragment}
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

export const useGetAccount = (): UseQueryResult<Profile> => {
  const api = useApiClient();

  return useQuery<Profile>({
    queryKey: ['getProfile'],
    queryFn: async () => {
      const { getProfile } = await api.request(getProfileQuery);

      return getProfile;
    },
  });
};
