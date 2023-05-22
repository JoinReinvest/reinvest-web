import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useGetDraftRecurringInvestment } from 'reinvest-app-common/src/services/queries/getDraftRecurringInvestment';
import { RecurringInvestment } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Returns {
  recurringInvestment: RecurringInvestment | null;
  recurringInvestmentMeta: QueryMeta;
}

export function useDraftInvestment(): Returns {
  const { activeAccount } = useActiveAccount();
  const { data, ...recurringInvestmentMeta } = useGetDraftRecurringInvestment(getApiClient, {
    accountId: activeAccount?.id ?? '',
    config: { enabled: !!activeAccount?.id },
  });

  return { recurringInvestment: data ?? null, recurringInvestmentMeta };
}
