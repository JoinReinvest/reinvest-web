import { useMutation } from '@tanstack/react-query';
import { AccountType } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const createDraftAccountMutatuion = gql`
  mutation createDraftAccount($type: AccountType) {
    createDraftAccount(type: $type) {
      id
      type
    }
  }
`;

export const useCreateDraftAccountMutatuion = (type: AccountType) => {
  const graphQLClient = GraphQLClient();

  return useMutation({
    mutationFn: async () => {
      const { createDraftAccount } = await graphQLClient.request(createDraftAccountMutatuion, { type });

      return createDraftAccount;
    },
  });
};
