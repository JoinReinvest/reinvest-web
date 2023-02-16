import { gql } from 'graphql-request';
import { useQuery } from 'react-query';

import { getGraphQLClient } from './getGraphQLClient';

export const accountDraftsQuery = gql`
  query {
    listAccountDrafts {
      id
      type
    }
  }
`;

export const useGetListAccount = (token: string) => {
  const graphQLClient = getGraphQLClient(token);

  return useQuery('getListAccount', async () => {
    const { listAccountDrafts } = await graphQLClient.request(accountDraftsQuery);

    return listAccountDrafts;
  });
};
