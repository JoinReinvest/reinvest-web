import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { useApiClient } from '../useApiClient';

const setPhoneNumberMutation = gql`
  mutation setPhoneNumber($countryCode: String, phoneNumber: String) {
    setPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber)
  }
`;

export const useSetPhoneNumber = (countryCode: string, phoneNumber: string): UseMutationResult<boolean> => {
  const api = useApiClient();

  return useMutation({
    mutationFn: async () => {
      const { setPhoneNumber } = await api.request(setPhoneNumberMutation, { countryCode, phoneNumber });

      return setPhoneNumber;
    },
  });
};
