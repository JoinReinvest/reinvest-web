import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { IndividualAccountInput, Mutation } from 'types/graphql';

import { EmployerFragment } from './fragments/employer';
import { NetRangeFragment } from './fragments/netRange';

const completeIndividualDraftAccountMutation = gql`
  ${EmployerFragment}
  ${NetRangeFragment}
  mutation completeIndividualDraftAccount($accountId: ID, $input: IndividualAccountInput) {
    completeIndividualDraftAccount(accountId: $accountId, input: $input) {
      id
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

export const useCompleteIndividualDraftAccount = (
  accountId: string,
  input: IndividualAccountInput,
): UseMutationResult<Mutation['completeIndividualDraftAccount']> => {
  const api = getApiClient();

  return useMutation({
    mutationFn: async () => {
      const { completeIndividualDraftAccount } = await api.request<Mutation>(completeIndividualDraftAccountMutation, { accountId, input });

      return completeIndividualDraftAccount;
    },
  });
};
