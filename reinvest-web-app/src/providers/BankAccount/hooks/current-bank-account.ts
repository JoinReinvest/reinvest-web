import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';
import { BankAccount } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Returns {
  bankAccountDisplay: string | null;
  currentBankAccount: BankAccount | null;
  currentBankAccountMeta: QueryMeta;
}

export function useCurrentBankAccount(): Returns {
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id || '';

  const { data, ...currentBankAccountMeta } = useReadBankAccount(getApiClient, {
    accountId,
    config: { queryKey: [accountId], enabled: !!accountId, retry: false },
  });
  const bankAccountDisplay = useMemo<string | null>(() => (data ? [data?.accountType, data?.accountNumber].filter(Boolean).join(' ') : null), [data]);

  return { bankAccountDisplay, currentBankAccount: data ?? null, currentBankAccountMeta };
}
