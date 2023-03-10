import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Mutation } from 'types/graphql';

import { AccountsFragment } from './fragments/accounts';
import { ProfileDetailsFragment } from './fragments/profileDetails';

const completeProfileDetailsMutation = gql`
  ${ProfileDetailsFragment}
  ${AccountsFragment}
  mutation completeProfileDetails($input: ProfileDetailsInput) {
    completeProfileDetails(input: $input) {
      externalId
      label
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

export const useCompleteProfileDetails = (): UseMutationResult<Mutation['completeProfileDetails']> =>
  useMutation({
    mutationFn: async input => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { completeProfileDetails } = await api.request<Mutation>(completeProfileDetailsMutation, { input });

      return completeProfileDetails;
    },
  });
