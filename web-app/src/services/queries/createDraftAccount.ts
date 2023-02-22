import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { AccountType, DraftAccount } from 'graphql/types';
import { gql } from 'graphql-request';

import { useApiClient } from '../apiClient';

const createDraftAccountMutatuion = gql`
  mutation createDraftAccount($type: AccountType) {
    createDraftAccount(type: $type) {
      id
      type
    }
  }
`;

export const useCreateDraftAccount = (type: AccountType): UseMutationResult<DraftAccount> => {
  const api = useApiClient();

  return useMutation({
    mutationFn: async () => {
      const { createDraftAccount } = await api.request(createDraftAccountMutatuion, { type });

      return createDraftAccount;
    },
  });
};
