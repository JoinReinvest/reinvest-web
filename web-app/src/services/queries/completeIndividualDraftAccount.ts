import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { IndividualAccountInput, IndividualDraftAccount } from 'graphql/types';
import { gql } from 'graphql-request';

import { apiClient } from '../apiClient';

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
