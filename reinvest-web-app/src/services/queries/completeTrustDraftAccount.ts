import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { TrustDraftAccount } from 'types/graphql';

const completeTrustDraftAccountMutation = gql`
  mutation completeTrustDraftAccount($accountId: ID) {
    completeTrustDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useCompleteTrustDraftAccount = (accountId: string): UseMutationResult<TrustDraftAccount> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { completeTrustDraftAccount } = await api.request(completeTrustDraftAccountMutation, { accountId });

      return completeTrustDraftAccount;
    },
  });
};
