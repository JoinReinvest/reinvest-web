import { StorageKeys } from 'constants/session-storage';
import { useStaticState } from 'hooks/static-state';
import { useEffect, useMemo, useState } from 'react';
import { useGetAccountsOverview } from 'reinvest-app-common/src/services/queries/getAccountsOverview';
import { AccountOverview, AccountType, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';
import { useSessionStorage } from 'usehooks-ts';

interface Return {
  activeAccount: AccountOverview | null;
  allAccounts: Maybe<AccountOverview>[];
  allAccountsMeta: QueryMeta;
  previousAccount: AccountOverview | null;
  updateActiveAccount: (account: Maybe<AccountOverview>) => void;
}

export function useAccounts(): Return {
  const { data, ...allAccountsMeta } = useGetAccountsOverview(getApiClient);
  const [activeAccount, setActiveAccount] = useState<AccountOverview | null>(null);
  const [activeAccountId, setActiveAccountId] = useSessionStorage<string | null>(StorageKeys.ACTIVE_ACCOUNT_IDENTIFIER, null);
  const [previousAccount, setPreviousAccount] = useStaticState<AccountOverview | null>(null);
  const allAccounts = useMemo(() => data || [], [data]);

  useEffect(() => {
    function initializeActiveAccount() {
      const storedAccount = allAccounts.find(account => account?.id === activeAccountId);

      if (activeAccountId && storedAccount) {
        setActiveAccount(storedAccount);
      } else {
        const nonBeneficiaryAccounts = allAccounts.filter(account => account?.type !== AccountType.Beneficiary);

        if (nonBeneficiaryAccounts?.length) {
          const firstAccount = nonBeneficiaryAccounts.at(0);

          setActiveAccount(firstAccount || null);
          setActiveAccountId(firstAccount?.id || null);
        }
      }
    }

    initializeActiveAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAccounts]);

  const updateActiveAccount = (account: Maybe<AccountOverview>) => {
    if (account) {
      setPreviousAccount(activeAccount);
      setActiveAccount(account);
      setActiveAccountId(account?.id ?? null);
    }
  };

  return { allAccounts, allAccountsMeta, activeAccount, previousAccount, updateActiveAccount };
}
