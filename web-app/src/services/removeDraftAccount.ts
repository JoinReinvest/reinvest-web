import { useMutation } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const removeDraftAccountMutatuion = gql`
  mutation removeDraftAccount($id: ID) {
    removeDraftAccount(id: $id)
  }
`;

export const useRemoveDraftAccountMutatuion = (id: string) => {
  const graphQLClient = GraphQLClient();

  return useMutation({
    mutationFn: async () => {
      const { removeDraftAccount } = await graphQLClient.request(removeDraftAccountMutatuion, { id });

      return removeDraftAccount;
    },
  });
};
