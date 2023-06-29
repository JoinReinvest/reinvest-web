import { useCancelInvestment as useCancelInvestmentMutation } from 'reinvest-app-common/src/services/queries/cancel-investment';
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
