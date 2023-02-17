import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { CorporateDraftAccount } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const completeCorporateDraftAccountMutation = gql`
  mutation completeCorporateDraftAccount($accountId: ID) {
    completeCorporateDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useCompleteCorporateDraftAccount = (accountId: string): UseMutationResult<CorporateDraftAccount> => {
  const graphQLClient = GraphQLClient();

  return useMutation({
    mutationFn: async () => {
      const { completeCorporateDraftAccount } = await graphQLClient.request(completeCorporateDraftAccountMutation, { accountId });

      return completeCorporateDraftAccount;
    },
  });
};
