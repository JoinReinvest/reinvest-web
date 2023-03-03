import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { GenericFieldInput, Mutation, TemplateName } from 'types/graphql';

const signDocumentFromTemplateMutation = gql`
  mutation signDocumentFromTemplate($templateId: TemplateName, $fields: [GenericFieldInput], signature: String) {
    signDocumentFromTemplate(templateId: $templateId, fields: $fields, signature: $signature) {
      url
      id
    }
  }
`;

export const useSignDocumentFromTemplate = (
  templateId: TemplateName,
  fields: GenericFieldInput[],
  signature: string,
): UseMutationResult<Mutation['signDocumentFromTemplate']> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { signDocumentFromTemplate } = await api.request<Mutation>(signDocumentFromTemplateMutation, { templateId, fields, signature });

      return signDocumentFromTemplate;
    },
  });
};
