import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';

import { Mutation } from '../../types/graphql';

const openAccountMutation = gql`
  mutation openAccount($draftAccountId: String) {
    openAccount(draftAccountId: $draftAccountId)
  }
`;

export const useOpenAccount = (draftAccountId: string): UseMutationResult<Mutation['openAccount']> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { openAccount } = await api.request<Mutation>(openAccountMutation, { draftAccountId });

      return openAccount;
    },
  });
};
