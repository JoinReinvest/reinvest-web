import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { GenericFieldInput, SignatureId, TemplateName } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const signDocumentFromTemplateMutation = gql`
  mutation signDocumentFromTemplate($templateId: TemplateName, $fields: [GenericFieldInput], signature: String) {
    signDocumentFromTemplate(templateId: $templateId, fields: $fields, signature: $signature) {
      url
      id
    }
  }
`;

export const useSignDocumentFromTemplate = (templateId: TemplateName, fields: GenericFieldInput[], signature: string): UseMutationResult<SignatureId> => {
  const graphQLClient = GraphQLClient();

  return useMutation({
    mutationFn: async () => {
      const { signDocumentFromTemplate } = await graphQLClient.request(signDocumentFromTemplateMutation, { templateId, fields, signature });

      return signDocumentFromTemplate;
    },
  });
};
