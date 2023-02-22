import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { FileLink } from 'graphql/types';
import { gql } from 'graphql-request';

import { useApiClient } from '../apiClient';

const createAvatarFileLinkMutation = gql`
  mutation createAvatarFileLink {
    createAvatarFileLink {
      url
      id
    }
  }
`;

export const useCreateAvatarFileLink = (): UseMutationResult<FileLink> => {
  const api = useApiClient();

  return useMutation({
    mutationFn: async () => {
      const { createAvatarFileLink } = await api.request(createAvatarFileLinkMutation);

      return createAvatarFileLink;
    },
  });
};
