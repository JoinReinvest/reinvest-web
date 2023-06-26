import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useFulfillBankAccount as useFulfillBankAccountQuery } from 'reinvest-app-common/src/services/queries/fulfillBankAccount';
import { FulfillBankAccountInput } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta, QueryMeta } from 'types/queries';

interface Params {
  createBankAccountMeta: MutationMeta;
  currentBankAccountMeta: QueryMeta;
  updateBankAccountMeta: MutationMeta;
}

interface Returns {
  fulfillBankAccount: (params: { input: FulfillBankAccountInput }) => Promise<void>;
  fulfillBankAccountMeta: MutationMeta;
}

export function useFulfillBankAccount({ createBankAccountMeta, currentBankAccountMeta, updateBankAccountMeta }: Params): Returns {
  const { mutateAsync, ...fulfillBankAccountMeta } = useFulfillBankAccountQuery(getApiClient);
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id ?? null;

  const fulfillBankAccount: Returns['fulfillBankAccount'] = async ({ input }) => {
    if (accountId) {
      await mutateAsync({ accountId, input });
      currentBankAccountMeta.refetch();
      createBankAccountMeta.reset();
      updateBankAccountMeta.reset();
    }
  };

  return { fulfillBankAccountMeta, fulfillBankAccount };
}
