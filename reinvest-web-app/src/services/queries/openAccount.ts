import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { useApiClient } from '../useApiClient';

const openAccountMutation = gql`
  mutation openAccount($draftAccountId: String) {
    openAccount(draftAccountId: $draftAccountId)
  }
`;

export const useOpenAccount = (draftAccountId: string): UseMutationResult<boolean> => {
  const api = useApiClient();

  return useMutation({
    mutationFn: async () => {
      const { openAccount } = await api.request(openAccountMutation, { draftAccountId });

      return openAccount;
    },
  });
};
