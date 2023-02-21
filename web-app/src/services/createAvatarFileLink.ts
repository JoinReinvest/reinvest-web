import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { FileLink } from 'graphql/types';

import { apiClient } from './apiClient';

const createAvatarFileLinkMutation = gql`
  mutation createAvatarFileLink {
    createAvatarFileLink {
      url
      id
    }
  }
`;

export const useCreateAvatarFileLink = (): UseMutationResult<FileLink> => {
  const api = apiClient();

  return useMutation({
    mutationFn: async () => {
      const { createAvatarFileLink } = await api.request(createAvatarFileLinkMutation);

      return createAvatarFileLink;
    },
  });
};
