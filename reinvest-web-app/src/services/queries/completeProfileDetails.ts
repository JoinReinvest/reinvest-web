import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Mutation, ProfileDetailsInput } from 'types/graphql';

import { ProfileDetailsFragment } from './fragments/profileDetails';

const completeProfileDetailsMutation = gql`
  ${ProfileDetailsFragment}
  mutation completeProfileDetails($input: ProfileDetailsInput) {
    completeProfileDetails(input: $input) {
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

export const useCompleteProfileDetails = (input: ProfileDetailsInput): UseMutationResult<Mutation['completeProfileDetails']> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { completeProfileDetails } = await api.request<Mutation>(completeProfileDetailsMutation, { input });

      return completeProfileDetails;
    },
  });
};
