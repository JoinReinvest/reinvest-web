import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useSimulateFundsWithdrawal } from 'reinvest-app-common/src/services/queries/simulateFundsWithdrawal';
import { FundsWithdrawalSimulation } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Returns {
  simulation: FundsWithdrawalSimulation | null;
  simulationMeta: QueryMeta;
}

export function useSimulation(): Returns {
  const { activeAccount } = useActiveAccount();
  const { data, ...simulationMeta } = useSimulateFundsWithdrawal(getApiClient, {
    accountId: activeAccount?.id ?? '',
    config: { enabled: !!activeAccount?.id },
  });

  return { simulation: data ?? null, simulationMeta };
}
