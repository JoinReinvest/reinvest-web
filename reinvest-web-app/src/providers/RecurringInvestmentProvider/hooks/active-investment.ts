import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useGetActiveRecurringInvestment } from 'reinvest-app-common/src/services/queries/getActiveRecurringInvestment';
import { RecurringInvestment } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Returns {
  activeRecurringInvestment: RecurringInvestment | null;
  activeRecurringInvestmentMeta: QueryMeta;
}

export function useActiveInvestment(): Returns {
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id ?? '';

  const { data, ...activeRecurringInvestmentMeta } = useGetActiveRecurringInvestment(getApiClient, { accountId, config: { enabled: !!accountId } });

  return { activeRecurringInvestment: data ?? null, activeRecurringInvestmentMeta };
}
