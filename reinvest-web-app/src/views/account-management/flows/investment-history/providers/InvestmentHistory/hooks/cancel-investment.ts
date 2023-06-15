import { MutationCancelInvestmentArgs } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { InfiniteQueryMeta, MutationMeta } from 'types/queries';

interface Params {
  investmentsListMeta: InfiniteQueryMeta;
}

interface Returns {
  cancelInvestment: (parameters: MutationCancelInvestmentArgs) => Promise<boolean>;
  cancelInvestmentMeta: MutationMeta;
}

export function useCancelInvestment({ investmentsListMeta }: Params): Returns {
  const { mutateAsync, ...cancelInvestmentMeta } = useCancelInvestmentMutation(getApiClient);

  async function cancelInvestment(parameters: MutationCancelInvestmentArgs) {
    const result = await mutateAsync(parameters);

    if (result) {
      investmentsListMeta.refetch();
    }

    return result;
  }

  return { cancelInvestment, cancelInvestmentMeta };
}

// TO-DO: Deprecate once common repository is updated

import { useMutation } from '@tanstack/react-query';
import { gql } from 'graphql-request';
import { UseApiMutationWithParams } from 'reinvest-app-common/src/services/queries/interfaces';
import { Mutation } from 'reinvest-app-common/src/types/graphql';

type Hook = UseApiMutationWithParams<'cancelInvestment', MutationCancelInvestmentArgs>;

const cancelInvestmentMutation = gql`
  mutation cancelInvestment($investmentId: ID!) {
    cancelInvestment(investmentId: $investmentId)
  }
`;

export const useCancelInvestmentMutation: Hook = getApiClient =>
  useMutation({
    mutationFn: async input => {
      const api = await getApiClient();

      if (!api) {
        return false;
      }

      const { cancelInvestment } = await api.request<Mutation>(cancelInvestmentMutation, { ...input });

      return cancelInvestment;
    },
  });
