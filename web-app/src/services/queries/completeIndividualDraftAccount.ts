import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { IndividualAccountInput, IndividualDraftAccount } from 'types/graphql';

import { useApiClient } from '../useApiClient';
import { EmployerFragment } from './fragments/employer';
import { NetRangeFragment } from './fragments/netRange';

const completeIndividualDraftAccountMutation = gql`
  ${EmployerFragment}
  ${NetRangeFragment}
  mutation completeIndividualDraftAccount($accountId: ID, $input: IndividualAccountInput) {
    completeIndividualDraftAccount(accountId: $accountId, input: $input) {
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

export const useCompleteIndividualDraftAccount = (accountId: string, input: IndividualAccountInput): UseMutationResult<IndividualDraftAccount> => {
  const api = useApiClient();

  return useMutation({
    mutationFn: async () => {
      const { completeIndividualDraftAccount } = await api.request(completeIndividualDraftAccountMutation, { accountId, input });

      return completeIndividualDraftAccount;
    },
  });
};
