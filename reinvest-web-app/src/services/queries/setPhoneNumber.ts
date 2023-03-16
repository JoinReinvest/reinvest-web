import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';

import { Mutation } from '../../types/graphql';

const setPhoneNumberMutation = gql`
  mutation setPhoneNumber($countryCode: String, $phoneNumber: String) {
    setPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber)
  }
`;

export const useSetPhoneNumber = (): UseMutationResult<Mutation['setPhoneNumber'], unknown, { countryCode: string; phoneNumber: string }> =>
  useMutation({
    mutationFn: async input => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { setPhoneNumber } = await api.request<Mutation>(setPhoneNumberMutation, { ...input });

      return setPhoneNumber;
    },
  });
