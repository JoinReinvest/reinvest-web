import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { GenericFieldInput, SignatureId, TemplateName } from 'types/graphql';

const signDocumentFromTemplateMutation = gql`
  mutation signDocumentFromTemplate($templateId: TemplateName, $fields: [GenericFieldInput], signature: String) {
    signDocumentFromTemplate(templateId: $templateId, fields: $fields, signature: $signature) {
      url
      id
    }
  }
`;

export const useSignDocumentFromTemplate = (templateId: TemplateName, fields: GenericFieldInput[], signature: string): UseMutationResult<SignatureId> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { signDocumentFromTemplate } = await api.request<any>(signDocumentFromTemplateMutation, { templateId, fields, signature });

      return signDocumentFromTemplate;
    },
  });
};
