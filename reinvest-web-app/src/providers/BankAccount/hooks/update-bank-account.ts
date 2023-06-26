import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useUpdateBankAccount as useUpdateBankAccountQuery } from 'reinvest-app-common/src/services/queries/updateBankAccount';
import { BankAccountLink } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

interface Returns {
  updateBankAccount: () => Promise<void>;
  updateBankAccountLink: BankAccountLink | null;
  updateBankAccountMeta: MutationMeta;
}

export function useUpdateBankAccount(): Returns {
  const { data, mutateAsync, ...updateBankAccountMeta } = useUpdateBankAccountQuery(getApiClient);
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id ?? null;

  async function updateBankAccount() {
    if (accountId) {
      await mutateAsync({ accountId });
    }
  }

  return { updateBankAccount, updateBankAccountLink: data ?? null, updateBankAccountMeta };
}
