import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { FileLink } from 'types/graphql';

const createAvatarFileLinkMutation = gql`
  mutation createAvatarFileLink {
    createAvatarFileLink {
      url
      id
    }
  }
`;

export const useCreateAvatarFileLink = (): UseMutationResult<FileLink> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { createAvatarFileLink } = await api.request<any>(createAvatarFileLinkMutation);

      return createAvatarFileLink;
    },
  });
};
