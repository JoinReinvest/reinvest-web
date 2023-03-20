import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Mutation } from 'types/graphql';

const createDocumentsFileLinksMutation = gql`
  mutation createDocumentsFileLinks($numberOfLinks: numberOfLinks_Int_NotNull_min_1_max_10!) {
    createDocumentsFileLinks(numberOfLinks: $numberOfLinks) {
      id
      url
    }
  }
`;

export const useCreateDocumentsFileLinks = (): UseMutationResult<Mutation['createDocumentsFileLinks'], Error, { numberOfLinks: number }> =>
  useMutation({
    mutationFn: async input => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { createDocumentsFileLinks } = await api.request<Mutation>(createDocumentsFileLinksMutation, { ...input });

      return createDocumentsFileLinks;
    },
  });
