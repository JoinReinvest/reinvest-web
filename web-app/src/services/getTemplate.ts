import { useQuery } from '@tanstack/react-query';
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

export const useGetTemplate = () => {
  const graphQLClient = GraphQLClient();

  return useQuery({
    queryKey: ['getTemplate'],
    queryFn: async () => {
      const { getTemplate } = await graphQLClient.request(getTemplateQuery);

      return getTemplate;
    },
  });
};
