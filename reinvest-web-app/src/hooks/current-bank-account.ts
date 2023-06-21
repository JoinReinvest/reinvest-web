import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useReadBankAccount } from 'reinvest-app-common/src/services/queries/readBankAccount';
import { BankAccount } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Returns {
  bankAccountDisplay: string;
  currentBankAccount: BankAccount | null;
  currentBankAccountMeta: QueryMeta;
}

export function useCurrentBankAccount(): Returns {
  const { activeAccount } = useActiveAccount();
  const accountId = activeAccount?.id || '';

  const { data, ...currentBankAccountMeta } = useReadBankAccount(getApiClient, {
    accountId,
    config: {
      enabled: !!accountId,
    },
  });

  const bankAccountDisplay = useMemo<string>(() => (data ? [data?.accountType, data?.accountNumber].filter(Boolean).join(' ') : ''), [data]);

  return { bankAccountDisplay, currentBankAccount: data ?? null, currentBankAccountMeta };
}
