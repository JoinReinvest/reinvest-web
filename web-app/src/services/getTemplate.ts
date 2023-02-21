import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Template } from 'types/graphql';
import { gql } from 'graphql-request';

import { apiClient } from './apiClient';

const getTemplateQuery = gql`
  query getTemplate() {
    getTemplate {
      templateName
      content
      fields
    }
  }
`;

export const useGetTemplate = (): UseQueryResult<Template> => {
  const api = apiClient();

  return useQuery<Template>({
    queryKey: ['getTemplate'],
    queryFn: async () => {
      const { getTemplate } = await api.request(getTemplateQuery);

      return getTemplate;
    },
  });
};
