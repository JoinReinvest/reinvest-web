import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { CorporateDraftAccount, Maybe, Mutation } from 'types/graphql';

const completeCorporateDraftAccountMutation = gql`
  mutation completeCorporateDraftAccount($accountId: ID) {
    completeCorporateDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useCompleteCorporateDraftAccount = (accountId: string): UseMutationResult<Maybe<CorporateDraftAccount> | undefined> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { completeCorporateDraftAccount } = await api.request<Mutation>(completeCorporateDraftAccountMutation, { accountId });

      return completeCorporateDraftAccount;
    },
  });
};
