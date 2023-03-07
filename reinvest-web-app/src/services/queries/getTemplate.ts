import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

const getTemplateQuery = gql`
  query getTemplate() {
    getTemplate {
      templateName
      content
      fields
    }
  }
`;

export const useGetTemplate = (): UseQueryResult<Query['getTemplate']> => {
  const api = getApiClient;

  return useQuery<Query['getTemplate']>({
    queryKey: ['getTemplate'],
    queryFn: async () => {
      const { getTemplate } = await api.request<Query>(getTemplateQuery);

      return getTemplate;
    },
  });
};
