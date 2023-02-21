import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { Profile, ProfileDetailsInput } from 'types/graphql';

import { apiClient } from './apiClient';

const completeProfileDetailsMutation = gql`
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
  const api = apiClient();

  return useMutation({
    mutationFn: async () => {
      const { completeProfileDetails } = await api.request(completeProfileDetailsMutation, { input });

      return completeProfileDetails;
    },
  });
};
