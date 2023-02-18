import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const openAccountMutation = gql`
  mutation openAccount($draftAccountId: String) {
    openAccount(draftAccountId: $draftAccountId)
  }
`;

export const useOpenAccount = (draftAccountId: string): UseMutationResult<boolean> => {
  const graphQLClient = GraphQLClient();

  return useMutation({
    mutationFn: async () => {
      const { openAccount } = await graphQLClient.request(openAccountMutation, { draftAccountId });

      return openAccount;
    },
  });
};
