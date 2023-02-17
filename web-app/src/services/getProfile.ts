import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Profile } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const getProfileQuery = gql`
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
  const graphQLClient = GraphQLClient();

  return useQuery<Profile>({
    queryKey: ['getProfile'],
    queryFn: async () => {
      const { getProfile } = await graphQLClient.request(getProfileQuery);

      return getProfile;
    },
  });
};
