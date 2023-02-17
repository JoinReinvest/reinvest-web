import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { Profile, ProfileDetailsInput } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const completeProfileDetailsMutation = gql`
  mutation completeProfileDetails($input: ProfileDetailsInput) {
    completeProfileDetails(input: $input) {
      externalId
      label
      avatarUrl
      accounts {
        id
      }
      details {
        firstName
        middleName
        lastName
        dateOfBirth
        domicile
      }
      completionStatus {
        detailsCompleted
        phoneCompleted
      }
    }
  }
`;

export const useCompleteProfileDetails = (input: ProfileDetailsInput): UseMutationResult<Profile> => {
  const graphQLClient = GraphQLClient();

  return useMutation({
    mutationFn: async () => {
      const { completeProfileDetails } = await graphQLClient.request(completeProfileDetailsMutation, { input });

      return completeProfileDetails;
    },
  });
};
