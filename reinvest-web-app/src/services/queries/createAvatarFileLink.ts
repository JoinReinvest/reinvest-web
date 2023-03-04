import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Mutation } from 'types/graphql';

const createAvatarFileLinkMutation = gql`
  mutation createAvatarFileLink {
    createAvatarFileLink {
      url
      id
    }
  }
`;

export const useCreateAvatarFileLink = (): UseMutationResult<Mutation['createAvatarFileLink']> => {
  const api = getApiClient;

  return useMutation({
    mutationFn: async () => {
      const { createAvatarFileLink } = await api.request<Mutation>(createAvatarFileLinkMutation);

      return createAvatarFileLink;
    },
  });
};
