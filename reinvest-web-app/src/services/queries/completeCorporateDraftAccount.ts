import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Mutation } from 'types/graphql';

const completeCorporateDraftAccountMutation = gql`
  mutation completeCorporateDraftAccount($accountId: ID) {
    completeCorporateDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useCompleteCorporateDraftAccount = (accountId: string): UseMutationResult<Mutation['completeCorporateDraftAccount']> =>
  useMutation({
    mutationFn: async () => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { completeCorporateDraftAccount } = await api.request<Mutation>(completeCorporateDraftAccountMutation, { accountId });

      return completeCorporateDraftAccount;
    },
  });
