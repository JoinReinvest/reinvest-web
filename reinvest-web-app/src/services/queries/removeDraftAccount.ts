import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';

const removeDraftAccountMutatuion = gql`
  mutation removeDraftAccount($id: ID) {
    removeDraftAccount(id: $id)
  }
`;

export const useRemoveDraftAccount = (id: string): UseMutationResult<boolean> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { removeDraftAccount } = await api.request(removeDraftAccountMutatuion, { id });

      return removeDraftAccount;
    },
  });
};
