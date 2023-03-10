import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { getApiClient } from 'services/getApiClient';
import { Mutation } from 'types/graphql';

import { AvatarFragment } from './fragments/avatar';
import { EmployerFragment } from './fragments/employer';
import { NetRangeFragment } from './fragments/netRange';

const completeIndividualDraftAccountMutation = gql`
  ${EmployerFragment}
  ${NetRangeFragment}
  ${AvatarFragment}
  mutation completeIndividualDraftAccount($accountId: ID, $input: IndividualAccountInput) {
    completeIndividualDraftAccount(accountId: $accountId, input: $input) {
      id
      state
      avatar {
        ...AvatarFragment
      }
      isCompleted
      details {
        employer {
          ...EmployerFragment
        }
        netWorth {
          ...NetRangeFragment
        }
        netIncome {
          ...NetRangeFragment
        }
        employmentStatus {
          status
        }
      }
    }
  }
`;

export const useCompleteIndividualDraftAccount = (): UseMutationResult<Mutation['completeIndividualDraftAccount']> =>
  useMutation({
    mutationFn: async input => {
      const api = await getApiClient();

      if (!api) {
        return null;
      }

      const { completeIndividualDraftAccount } = await api.request<Mutation>(completeIndividualDraftAccountMutation, { input });

      return completeIndividualDraftAccount;
    },
  });
