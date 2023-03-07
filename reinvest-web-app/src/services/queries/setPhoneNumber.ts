import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';

import { Mutation } from '../../types/graphql';

const setPhoneNumberMutation = gql`
  mutation setPhoneNumber($countryCode: String, phoneNumber: String) {
    setPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber)
  }
`;

export const useSetPhoneNumber = (countryCode: string, phoneNumber: string): UseMutationResult<Mutation['setPhoneNumber']> => {
  const api = getApiClient;

  return useMutation({
    mutationFn: async () => {
      const { setPhoneNumber } = await api.request<Mutation>(setPhoneNumberMutation, { countryCode, phoneNumber });

      return setPhoneNumber;
    },
  });
};
