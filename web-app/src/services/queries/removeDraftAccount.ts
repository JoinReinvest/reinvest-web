import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { useApiClient } from '../useApiClient';

const removeDraftAccountMutatuion = gql`
  mutation removeDraftAccount($id: ID) {
    removeDraftAccount(id: $id)
  }
`;

export const useRemoveDraftAccount = (id: string): UseMutationResult<boolean> => {
  const api = useApiClient();

  return useMutation({
    mutationFn: async () => {
      const { removeDraftAccount } = await api.request(removeDraftAccountMutatuion, { id });

      return removeDraftAccount;
    },
  });
};
