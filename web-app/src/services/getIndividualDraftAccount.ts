import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { IndividualDraftAccount } from 'types/graphql';
import { gql } from 'graphql-request';

import { apiClient } from './apiClient';

const getIndividualDraftAccountQuery = gql`
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

export const useGetIndividualDraftAccount = (accountId: string): UseQueryResult<IndividualDraftAccount> => {
  const api = apiClient();

  return useQuery<IndividualDraftAccount>({
    queryKey: ['getIndividualDraftAccount', accountId],
    queryFn: async () => {
      const { getIndividualDraftAccount } = await api.request(getIndividualDraftAccountQuery, { accountId });

      return getIndividualDraftAccount;
    },
  });
};
