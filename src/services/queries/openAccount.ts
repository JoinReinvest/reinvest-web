import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';

const openAccountMutation = gql`
  mutation openAccount($draftAccountId: String) {
    openAccount(draftAccountId: $draftAccountId)
  }
`;

export const useOpenAccount = (draftAccountId: string): UseMutationResult<boolean> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { openAccount } = await api.request<any>(openAccountMutation, { draftAccountId });

      return openAccount;
    },
  });
};
