import { useReinvestDividends } from 'reinvest-app-common/src/services/queries/reinvestDividends';
import { useWithdrawDividends } from 'reinvest-app-common/src/services/queries/withdrawDividends';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

type MutationParams = { dividendIds: string[] };
type MutationFunction = (params: MutationParams) => Promise<boolean>;

interface Returns {
  metaReinvestDividends: MutationMeta;
  metaWithdrawDividends: MutationMeta;
  reinvestDividends: MutationFunction;
  withdrawDividends: MutationFunction;
}

export function useManageDividends(): Returns {
  const { mutateAsync: withdrawDividends, ...metaWithdrawDividends } = useWithdrawDividends(getApiClient);
  const { mutateAsync: reinvestDividends, ...metaReinvestDividends } = useReinvestDividends(getApiClient);

  return {
    metaReinvestDividends,
    metaWithdrawDividends,
    reinvestDividends,
    withdrawDividends,
  };
}
