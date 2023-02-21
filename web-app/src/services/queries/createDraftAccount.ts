import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { AccountType, DraftAccount } from 'graphql/types';

import { apiClient } from '../apiClient';

const createDraftAccountMutatuion = gql`
  mutation createDraftAccount($type: AccountType) {
    createDraftAccount(type: $type) {
      id
      type
    }
  }
`;

export const useCreateDraftAccount = (type: AccountType): UseMutationResult<DraftAccount> => {
  const api = apiClient();

  return useMutation({
    mutationFn: async () => {
      const { createDraftAccount } = await api.request(createDraftAccountMutatuion, { type });

      return createDraftAccount;
    },
  });
};
