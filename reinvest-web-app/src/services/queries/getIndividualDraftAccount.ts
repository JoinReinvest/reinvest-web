import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { IndividualDraftAccount } from 'types/graphql';

import { EmployerFragment } from './fragments/employer';
import { NetRangeFragment } from './fragments/netRange';

const getIndividualDraftAccountQuery = gql`
  ${NetRangeFragment}
  ${EmployerFragment}
  query getIndividualDraftAccount($accountId: ID) {
    getIndividualDraftAccount(accountId: $accountId) {
      id
      experience
      employmentStatus
      employer {
        ...EmployerFragment
      }
      netWorth {
        ...NetRangeFragment
      }
      netIncome {
        ...NetRangeFragment
      }
    }
  }
`;

export const useGetIndividualDraftAccount = (accountId: string): UseQueryResult<IndividualDraftAccount> => {
  const api = getApiClient();

  return useQuery<IndividualDraftAccount>({
    queryKey: ['getIndividualDraftAccount', accountId],
    queryFn: async () => {
      const { getIndividualDraftAccount } = await api.request(getIndividualDraftAccountQuery, { accountId });

      return getIndividualDraftAccount;
    },
  });
};
