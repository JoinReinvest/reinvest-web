import { useQuery } from '@tanstack/react-query';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const getIndividualDraftAccountQuery = gql`
  query getIndividualDraftAccount($accountId: ID) {
    getIndividualDraftAccount(accountId: $accountId) {
      id
      experience
      employmentStatus
      employer {
        nameOfEmployer
        occupation
        industry
      }
      netWorth {
        from
        to
      }
      netIncome {
        from
        to
      }
    }
  }
`;

export const useGetIndividualDraftAccount = (accountId: string) => {
  const graphQLClient = GraphQLClient();

  return useQuery({
    queryKey: ['getIndividualDraftAccount', accountId],
    queryFn: async () => {
      const { getIndividualDraftAccount } = await graphQLClient.request(getIndividualDraftAccountQuery, { accountId });

      return getIndividualDraftAccount;
    },
  });
};
