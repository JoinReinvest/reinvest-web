import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';

import { Mutation } from '../../types/graphql';

const removeDraftAccountMutatuion = gql`
  mutation removeDraftAccount($id: ID) {
    removeDraftAccount(id: $id)
  }
`;

export const useRemoveDraftAccount = (id: string): UseMutationResult<Mutation['removeDraftAccount']> => {
  const api = getApiClient;

  return useMutation({
    mutationFn: async () => {
      const { removeDraftAccount } = await api.request<Mutation>(removeDraftAccountMutatuion, { id });

      return removeDraftAccount;
    },
  });
};
