import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { GenericFieldInput, SignatureId, TemplateName } from 'graphql/types';

import { apiClient } from './apiClient';

const signDocumentFromTemplateMutation = gql`
  mutation signDocumentFromTemplate($templateId: TemplateName, $fields: [GenericFieldInput], signature: String) {
    signDocumentFromTemplate(templateId: $templateId, fields: $fields, signature: $signature) {
      url
      id
    }
  }
`;

export const useSignDocumentFromTemplate = (templateId: TemplateName, fields: GenericFieldInput[], signature: string): UseMutationResult<SignatureId> => {
  const api = apiClient();

  return useMutation({
    mutationFn: async () => {
      const { signDocumentFromTemplate } = await api.request(signDocumentFromTemplateMutation, { templateId, fields, signature });

      return signDocumentFromTemplate;
    },
  });
};
