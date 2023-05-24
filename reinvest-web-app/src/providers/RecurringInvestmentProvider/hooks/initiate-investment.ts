import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useInitiateRecurringInvestment } from 'reinvest-app-common/src/services/queries/initiateRecurringInvestment';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

interface Returns {
  initiateRecurringInvestment: () => Promise<void>;
  initiateRecurringInvestmentMeta: MutationMeta;
}

export function useInitiateInvestment(): Returns {
  const { activeAccount } = useActiveAccount();
  const { mutateAsync, ...initiateRecurringInvestmentMeta } = useInitiateRecurringInvestment(getApiClient);

  async function initiateRecurringInvestment() {
    if (activeAccount?.id) {
      const accountId = activeAccount.id;
      await mutateAsync({ accountId });
    }
  }

  return { initiateRecurringInvestment, initiateRecurringInvestmentMeta };
}
