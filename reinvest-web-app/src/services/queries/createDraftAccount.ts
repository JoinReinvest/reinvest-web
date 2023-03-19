import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Mutation } from 'types/graphql';

const createDraftAccountMutatuion = gql`
  mutation createDraftAccount($type: DraftAccountType) {
    createDraftAccount(type: $type) {
      id
      type
    }
  }
`;

export const useCreateDraftAccount = (): UseMutationResult<Mutation['createDraftAccount'], Error> =>
  useMutation({
    mutationFn: async type => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { createDraftAccount } = await api.request<Mutation>(createDraftAccountMutatuion, { type });

      return createDraftAccount;
    },
  });
