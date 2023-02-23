import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { Profile } from 'types/graphql';

import { useApiClient } from '../useApiClient';
import { AddressFragment } from './fragments/address';

const getProfileQuery = gql`
  ${AddressFragment}
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
          ...AddressFragment
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
  const api = useApiClient();

  return useQuery<Profile>({
    queryKey: ['getProfile'],
    queryFn: async () => {
      const { getProfile } = await api.request(getProfileQuery);

      return getProfile;
    },
  });
};
