import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { IndividualAccountInput, IndividualDraftAccount } from 'gql/types';
import { gql } from 'graphql-request';

import { GraphQLClient } from './GraphQLClient';

export const completeIndividualDraftAccountMutation = gql`
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
  const graphQLClient = GraphQLClient();

  return useMutation({
    mutationFn: async () => {
      const { completeIndividualDraftAccount } = await graphQLClient.request(completeIndividualDraftAccountMutation, { accountId, input });

      return completeIndividualDraftAccount;
    },
  });
};
