import { useEffect, useMemo, useRef, useState } from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { AccountOverview, AccountType, Maybe, Profile } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { QueryMeta } from 'types/queries';

interface Return {
  activeAccount: AccountOverview | null;
  allAccounts: Maybe<AccountOverview>[];
  previousAccount: AccountOverview | null;
  updateActiveAccount: (account: Maybe<AccountOverview>) => void;
  userProfile: Profile | null;
  userProfileMeta: QueryMeta;
}

export function useProfileAccounts(): Return {
  const { data: userProfile, ...userProfileMeta } = useGetUserProfile(getApiClient);
  const [activeAccount, setActiveAccount] = useState<AccountOverview | null>(null);
  const previousAccount = useRef<AccountOverview | null>(null);
  const allAccounts = useMemo(() => userProfile?.accounts || [], [userProfile]);

  useEffect(() => {
    function initializeActiveAccount() {
      const nonBeneficiaryAccounts = userProfile?.accounts?.filter(account => account?.type !== AccountType.Beneficiary);

      if (nonBeneficiaryAccounts?.length) {
        const firstAccount = nonBeneficiaryAccounts.at(0);

        setActiveAccount(firstAccount || null);
      }
    }

    initializeActiveAccount();
  }, [userProfile]);

  const updateActiveAccount = (account: Maybe<AccountOverview>) => {
    if (account) {
      previousAccount.current = activeAccount;
      setActiveAccount(account);
    }
  };

  return { allAccounts, activeAccount, updateActiveAccount, previousAccount: previousAccount.current, userProfile: userProfile ?? null, userProfileMeta };
}
