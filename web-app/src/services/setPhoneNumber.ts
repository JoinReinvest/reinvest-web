import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { apiClient } from './apiClient';

const setPhoneNumberMutation = gql`
  mutation setPhoneNumber($countryCode: String, phoneNumber: String) {
    setPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber)
  }
`;

export const useSetPhoneNumber = (countryCode: string, phoneNumber: string): UseMutationResult<boolean> => {
  const api = apiClient();

  return useMutation({
    mutationFn: async () => {
      const { setPhoneNumber } = await api.request(setPhoneNumberMutation, { countryCode, phoneNumber });

      return setPhoneNumber;
    },
  });
};
