import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useCreateBankAccount as useCreateBankAccountQuery } from 'reinvest-app-common/src/services/queries/createBankAccount';
import { BankAccountLink } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

interface Returns {
  createBankAccount: () => Promise<void>;
  createBankAccountLink: BankAccountLink | null;
  createBankAccountMeta: MutationMeta;
}

export function useCreateBankAccount(): Returns {
  const { data, mutateAsync, ...createBankAccountMeta } = useCreateBankAccountQuery(getApiClient);
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id ?? null;

  async function createBankAccount() {
    if (accountId) {
      await mutateAsync({ accountId });
    }
  }

  return { createBankAccount, createBankAccountLink: data ?? null, createBankAccountMeta };
}
