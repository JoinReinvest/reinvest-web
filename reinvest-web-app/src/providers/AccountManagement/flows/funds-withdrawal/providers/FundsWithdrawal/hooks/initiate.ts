import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useRequestFundsWithdrawal } from 'reinvest-app-common/src/services/queries/requestFundsWithdrawal';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Params {
  currentRequestMeta: QueryMeta;
}

interface Returns {
  initiateFundsWithdrawal: () => Promise<void>;
  initiateFundsWithdrawalMeta: MutationMeta;
}

export function useInitiate({ currentRequestMeta }: Params): Returns {
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id ?? '';
  const { mutateAsync, ...initiateFundsWithdrawalMeta } = useRequestFundsWithdrawal(getApiClient);

  async function initiateFundsWithdrawal() {
    if (accountId) {
      await mutateAsync({ accountId });
      currentRequestMeta.refetch();
    }
  }

  return { initiateFundsWithdrawal, initiateFundsWithdrawalMeta };
}
