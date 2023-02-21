import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { TrustDraftAccount } from 'graphql/types';

import { apiClient } from './apiClient';

const completeTrustDraftAccountMutation = gql`
  mutation completeTrustDraftAccount($accountId: ID) {
    completeTrustDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useCompleteTrustDraftAccount = (accountId: string): UseMutationResult<TrustDraftAccount> => {
  const api = apiClient();

  return useMutation({
    mutationFn: async () => {
      const { completeTrustDraftAccount } = await api.request(completeTrustDraftAccountMutation, { accountId });

      return completeTrustDraftAccount;
    },
  });
};
