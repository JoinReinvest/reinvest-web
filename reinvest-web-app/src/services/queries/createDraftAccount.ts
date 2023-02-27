import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { AccountType, DraftAccount } from 'types/graphql';

import { useApiClient } from '../useApiClient';

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
