import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { AccountType, DraftAccount } from 'types/graphql';

const createDraftAccountMutatuion = gql`
  mutation createDraftAccount($type: AccountType) {
    createDraftAccount(type: $type) {
      id
      type
    }
  }
`;

export const useCreateDraftAccount = (type: AccountType): UseMutationResult<DraftAccount> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { createDraftAccount } = await api.request<any>(createDraftAccountMutatuion, { type });

      return createDraftAccount;
    },
  });
};
