import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { IndividualAccountInput, IndividualDraftAccount } from 'types/graphql';

import { apiClient } from './apiClient';

const completeIndividualDraftAccountMutation = gql`
  mutation completeIndividualDraftAccount($accountId: ID, $input: IndividualAccountInput) {
    completeIndividualDraftAccount(accountId: $accountId, input: $input) {
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

export const useCompleteIndividualDraftAccount = (accountId: string, input: IndividualAccountInput): UseMutationResult<IndividualDraftAccount> => {
  const api = apiClient();

  return useMutation({
    mutationFn: async () => {
      const { completeIndividualDraftAccount } = await api.request(completeIndividualDraftAccountMutation, { accountId, input });

      return completeIndividualDraftAccount;
    },
  });
};
