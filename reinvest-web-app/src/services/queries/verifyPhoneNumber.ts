import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';

import { Mutation } from '../../types/graphql';

const verifyPhoneNumberMutation = gql`
  mutation verifyPhoneNumber($countryCode: String, $phoneNumber: String, $authCode: String) {
    verifyPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber, authCode: $authCode)
  }
`;

export const useVerifyPhoneNumber = (): UseMutationResult<
  Mutation['verifyPhoneNumber'],
  Error,
  { authCode: string; countryCode: string; phoneNumber: string }
> =>
  useMutation({
    mutationFn: async input => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { verifyPhoneNumber } = await api.request<Mutation>(verifyPhoneNumberMutation, { ...input });

      return verifyPhoneNumber;
    },
  });
