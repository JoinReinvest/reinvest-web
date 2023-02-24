import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { IndividualAccountInput, IndividualDraftAccount } from 'types/graphql';

import { useApiClient } from '../apiClient';
import { EmployerFragment } from './fragments/employer';
import { FromToFragment } from './fragments/fromTo';

const completeIndividualDraftAccountMutation = gql`
  ${EmployerFragment}
  ${FromToFragment}
  mutation completeIndividualDraftAccount($accountId: ID, $input: IndividualAccountInput) {
    completeIndividualDraftAccount(accountId: $accountId, input: $input) {
      id
      experience
      employmentStatus
      employer {
        ...EmployerFragment
      }
      netWorth {
        ...FromToFragment
      }
      netIncome {
        ...FromToFragment
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
