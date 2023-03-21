import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Query } from 'types/graphql';

import { AvatarFragment } from './fragments/avatar';
import { EmployerFragment } from './fragments/employer';
import { NetRangeFragment } from './fragments/netRange';

const getAccountQuery = gql`
  ${AvatarFragment}
  ${EmployerFragment}
  ${NetRangeFragment}
  query getIndividualAccount($accountId: String) {
    getIndividualAccount(accountId: $accountId) {
      id
      avatar {
        ...AvatarFragment
      }
      positionTotal
      details {
        employmentStatus {
          status
        }
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
  }
`;

export const useGetAccount = (accountId: string): UseQueryResult<Query['getIndividualAccount']> =>
  useQuery<Query['getIndividualAccount']>({
    queryKey: ['getAccount', accountId],
    queryFn: async () => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { getIndividualAccount } = await api.request<Query>(getAccountQuery, { accountId });

      return getIndividualAccount;
    },
  });
