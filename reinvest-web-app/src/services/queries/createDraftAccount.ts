import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { DraftAccountType, Mutation } from 'types/graphql';

const createDraftAccountMutatuion = gql`
  mutation createDraftAccount($type: DraftAccountType) {
    createDraftAccount(type: $type) {
      id
      type
    }
  }
`;

export const useCreateDraftAccount = (type: DraftAccountType): UseMutationResult<Mutation['createDraftAccount']> =>
  useMutation({
    mutationFn: async () => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { createDraftAccount } = await api.request<Mutation>(createDraftAccountMutatuion, { type });

      return createDraftAccount;
    },
  });
