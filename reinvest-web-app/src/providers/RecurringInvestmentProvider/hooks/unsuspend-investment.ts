import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useUnsuspendRecurringInvestment } from 'reinvest-app-common/src/services/queries/unsuspendRecurringInvestment';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Params {
  activeRecurringInvestmentMeta: QueryMeta;
}

interface Returns {
  unsuspendRecurringInvestment: () => Promise<void>;
  unsuspendRecurringInvestmentMeta: MutationMeta;
  unsuspendRecurringInvestmentResult: boolean | null;
}

export function useUnsuspendInvestment({ activeRecurringInvestmentMeta }: Params): Returns {
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id ?? '';

  const { data: unsuspendData, mutateAsync: unsuspendMutate, ...unsuspendRecurringInvestmentMeta } = useUnsuspendRecurringInvestment(getApiClient);

  async function unsuspendRecurringInvestment() {
    if (accountId) {
      await unsuspendMutate({ accountId });
      activeRecurringInvestmentMeta?.refetch();
    }
  }

  return { unsuspendRecurringInvestment, unsuspendRecurringInvestmentMeta, unsuspendRecurringInvestmentResult: unsuspendData ?? null };
}
