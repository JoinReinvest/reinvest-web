import { useMemo } from 'react';
import { AccountOverview, AccountType, Maybe } from 'reinvest-app-common/src/types/graphql';

interface Params {
  activeAccount: AccountOverview | null;
  allAccounts: Maybe<AccountOverview>[];
}

interface Return {
  availableAccounts: Maybe<AccountOverview>[];
  individualAccount: AccountOverview | null;
}

export function useAvailableAccounts({ activeAccount, allAccounts }: Params): Return {
  const availableAccounts = useMemo(() => allAccounts.filter(account => account?.id !== activeAccount?.id), [activeAccount, allAccounts]);
  const individualAccount = useMemo(() => allAccounts.find(account => account?.type === AccountType.Individual) || null, [allAccounts]);

  return { availableAccounts, individualAccount };
}
