import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Mutation, ProfileDetailsInput } from 'types/graphql';

import { AccountsFragment } from './fragments/accounts';
import { AvatarFragment } from './fragments/avatar';
import { ProfileDetailsFragment } from './fragments/profileDetails';

const completeProfileDetailsMutation = gql`
  ${ProfileDetailsFragment}
  ${AccountsFragment}
  ${AvatarFragment}
  mutation completeProfileDetails($input: ProfileDetailsInput) {
    completeProfileDetails(input: $input) {
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
        ...AccountsFragment
      }
    }
  }
`;

export const useCompleteProfileDetails = (input: ProfileDetailsInput): UseMutationResult<Mutation['completeProfileDetails']> =>
  useMutation({
    mutationFn: async () => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { completeProfileDetails } = await api.request<Mutation>(completeProfileDetailsMutation, { input });

      return completeProfileDetails;
    },
  });
