import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { TrustDraftAccount } from 'types/graphql';

import { useApiClient } from '../useApiClient';

const completeTrustDraftAccountMutation = gql`
  mutation completeTrustDraftAccount($accountId: ID) {
    completeTrustDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useCompleteTrustDraftAccount = (accountId: string): UseMutationResult<TrustDraftAccount> => {
  const api = useApiClient();

  return useMutation({
    mutationFn: async () => {
      const { completeTrustDraftAccount } = await api.request(completeTrustDraftAccountMutation, { accountId });

      return completeTrustDraftAccount;
    },
  });
};
