import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FileLink } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const createAvatarFileLinkMutation = gql`
  mutation createAvatarFileLink {
    createAvatarFileLink {
      url
      id
    }
  }
`;

export const useCompleteProfileDetails = (): UseMutationResult<FileLink> => {
  const graphQLClient = GraphQLClient();

  return useMutation({
    mutationFn: async () => {
      const { createAvatarFileLink } = await graphQLClient.request(createAvatarFileLinkMutation);

      return createAvatarFileLink;
    },
  });
};
