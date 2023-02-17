import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const setPhoneNumberMutation = gql`
  mutation setPhoneNumber($countryCode: String, phoneNumber: String) {
    setPhoneNumber(countryCode: $countryCode, phoneNumber: $phoneNumber)
  }
`;

export const useSetPhoneNumber = (countryCode: string, phoneNumber: string): UseMutationResult<boolean> => {
  const graphQLClient = GraphQLClient();

  return useMutation({
    mutationFn: async () => {
      const { setPhoneNumber } = await graphQLClient.request(setPhoneNumberMutation, { countryCode, phoneNumber });

      return setPhoneNumber;
    },
  });
};
