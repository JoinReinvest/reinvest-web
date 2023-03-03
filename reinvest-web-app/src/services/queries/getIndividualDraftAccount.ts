import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

import { EmployerFragment } from './fragments/employer';
import { NetRangeFragment } from './fragments/netRange';

const getIndividualDraftAccountQuery = gql`
  ${NetRangeFragment}
  ${EmployerFragment}
  query getIndividualDraftAccount($accountId: ID) {
    getIndividualDraftAccount(accountId: $accountId) {
      id
    }
  }
`;

export const useGetIndividualDraftAccount = (accountId: string): UseQueryResult<Query['getIndividualDraftAccount']> => {
  const api = getApiClient();

  return useQuery<Query['getIndividualDraftAccount']>({
    queryKey: ['getIndividualDraftAccount', accountId],
    queryFn: async () => {
      const { getIndividualDraftAccount } = await api.request<Query>(getIndividualDraftAccountQuery, { accountId });

      return getIndividualDraftAccount;
    },
  });
};
