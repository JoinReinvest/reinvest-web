import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Template } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const getTemplateQuery = gql`
  query getTemplate() {
    getTemplate {
      templateName
      content
      fields
    }
  }
`;

export const useGetTemplate = (): UseQueryResult<Template> => {
  const graphQLClient = GraphQLClient();

  return useQuery<Template>({
    queryKey: ['getTemplate'],
    queryFn: async () => {
      const { getTemplate } = await graphQLClient.request(getTemplateQuery);

      return getTemplate;
    },
  });
};
