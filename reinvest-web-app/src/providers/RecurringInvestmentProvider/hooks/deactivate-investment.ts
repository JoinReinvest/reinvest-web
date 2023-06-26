import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useDeactivateRecurringInvestment } from 'reinvest-app-common/src/services/queries/deactivateRecurringInvestment';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Params {
  activeRecurringInvestmentMeta: QueryMeta;
}

interface Returns {
  deactivateRecurringInvestment: () => Promise<void>;
  deactivateRecurringInvestmentMeta: MutationMeta;
  deactivateRecurringInvestmentResult: boolean | null;
}

export function useDeactivateInvestment({ activeRecurringInvestmentMeta }: Params): Returns {
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id ?? '';

  const { data: deactivateData, mutateAsync: deactivateMutate, ...deactivateRecurringInvestmentMeta } = useDeactivateRecurringInvestment(getApiClient);

  async function deactivateRecurringInvestment() {
    if (accountId) {
      await deactivateMutate({ accountId });
      activeRecurringInvestmentMeta?.refetch();
    }
  }

  return { deactivateRecurringInvestment, deactivateRecurringInvestmentMeta, deactivateRecurringInvestmentResult: deactivateData ?? null };
}
