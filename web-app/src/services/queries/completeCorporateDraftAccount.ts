import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { CorporateDraftAccount } from 'graphql/types';
import { gql } from 'graphql-request';

import { useApiClient } from '../apiClient';

const completeCorporateDraftAccountMutation = gql`
  mutation completeCorporateDraftAccount($accountId: ID) {
    completeCorporateDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useCompleteCorporateDraftAccount = (accountId: string): UseMutationResult<CorporateDraftAccount> => {
  const api = useApiClient();

  return useMutation({
    mutationFn: async () => {
      const { completeCorporateDraftAccount } = await api.request(completeCorporateDraftAccountMutation, { accountId });

      return completeCorporateDraftAccount;
    },
  });
};
