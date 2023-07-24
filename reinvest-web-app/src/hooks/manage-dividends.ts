import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useReinvestDividends } from 'reinvest-app-common/src/services/queries/reinvestDividends';
import { useWithdrawDividends } from 'reinvest-app-common/src/services/queries/withdrawDividends';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

type MutationParams = { dividendIds: string[] };
type MutationFunction = (params: MutationParams) => Promise<void>;

interface Returns {
  metaReinvestDividends: MutationMeta;
  metaWithdrawDividends: MutationMeta;
  reinvestDividends: MutationFunction;
  withdrawDividends: MutationFunction;
}

export function useManageDividends(): Returns {
  const { activeAccount } = useActiveAccount();
  const { mutateAsync: withdrawDividendsMutateAsync, ...metaWithdrawDividends } = useWithdrawDividends(getApiClient);
  const { mutateAsync: reinvestDividendsMutateAsync, ...metaReinvestDividends } = useReinvestDividends(getApiClient);

  async function reinvestDividends({ dividendIds }: MutationParams) {
    if (activeAccount?.id) {
      reinvestDividendsMutateAsync({ dividendIds, accountId: activeAccount.id });
    }
  }

  async function withdrawDividends({ dividendIds }: MutationParams) {
    if (activeAccount?.id) {
      withdrawDividendsMutateAsync({ dividendIds, accountId: activeAccount.id });
    }
  }

  return {
    metaReinvestDividends,
    metaWithdrawDividends,
    reinvestDividends,
    withdrawDividends,
  };
}
