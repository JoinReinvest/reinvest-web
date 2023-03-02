import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Template } from 'types/graphql';

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
  const api = getApiClient();

  return useQuery<Template>({
    queryKey: ['getTemplate'],
    queryFn: async () => {
      const { getTemplate } = await api.request<any>(getTemplateQuery);

      return getTemplate;
    },
  });
};
