import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Profile, ProfileDetailsInput } from 'types/graphql';

import { CompletionStatusFragment } from './fragments/completionStatus';
import { ProfileDetailsFragment } from './fragments/profileDetails';

const completeProfileDetailsMutation = gql`
  ${ProfileDetailsFragment}
  ${CompletionStatusFragment}
  mutation completeProfileDetails($input: ProfileDetailsInput) {
    completeProfileDetails(input: $input) {
      externalId
      label
      avatarUrl
      accounts {
        id
      }
      details {
        ...ProfileDetailsFragment
      }
      completionStatus {
        ...CompletionStatusFragment
      }
    }
  }
`;

export const useCompleteProfileDetails = (input: ProfileDetailsInput): UseMutationResult<Profile> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { completeProfileDetails } = await api.request(completeProfileDetailsMutation, { input });

      return completeProfileDetails;
    },
  });
};
