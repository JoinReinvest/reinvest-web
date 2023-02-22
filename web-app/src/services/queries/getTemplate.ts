import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Template } from 'graphql/types';
import { gql } from 'graphql-request';

import { useApiClient } from '../apiClient';

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
  const api = useApiClient();

  return useQuery<Template>({
    queryKey: ['getTemplate'],
    queryFn: async () => {
      const { getTemplate } = await api.request(getTemplateQuery);

      return getTemplate;
    },
  });
};
