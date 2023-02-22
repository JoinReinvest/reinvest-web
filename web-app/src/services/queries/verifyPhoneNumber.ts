import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { apiClient } from '../apiClient';

const verifyPhoneNumberMutation = gql`
  mutation verifyPhoneNumber($countryCode: String, phoneNumber: String, authCode: String) {
    verifyPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber, authCode: $authCode)
  }
`;

export const useVerifyPhoneNumber = (countryCode: string, phoneNumber: string, authCode: string): UseMutationResult<boolean> => {
  const api = apiClient();

  return useMutation({
    mutationFn: async () => {
      const { verifyPhoneNumber } = await api.request(verifyPhoneNumberMutation, { countryCode, phoneNumber, authCode });

      return verifyPhoneNumber;
    },
  });
};
