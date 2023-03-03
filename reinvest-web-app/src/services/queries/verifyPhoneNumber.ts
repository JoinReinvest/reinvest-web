import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';

import { Mutation } from '../../types/graphql';

const verifyPhoneNumberMutation = gql`
  mutation verifyPhoneNumber($countryCode: String, phoneNumber: String, authCode: String) {
    verifyPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber, authCode: $authCode)
  }
`;

export const useVerifyPhoneNumber = (countryCode: string, phoneNumber: string, authCode: string): UseMutationResult<Mutation['verifyPhoneNumber']> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { verifyPhoneNumber } = await api.request<Mutation>(verifyPhoneNumberMutation, { countryCode, phoneNumber, authCode });

      return verifyPhoneNumber;
    },
  });
};
