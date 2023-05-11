import { useEffect, useMemo, useState } from 'react';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { AccountOverview, AccountType, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';

interface Return {
  activeAccount: AccountOverview | null;
  allAccounts: Maybe<AccountOverview>[];
  refetchUserProfile: () => void;
  updateActiveAccount: (account: Maybe<AccountOverview>) => void;
}

export function useProfileAccounts(): Return {
  const { data: userProfile, refetch: refetchUserProfile } = useGetUserProfile(getApiClient);
  const [activeAccount, setActiveAccount] = useState<AccountOverview | null>(null);
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
      setActiveAccount(account);
    }
  };

  return { allAccounts, activeAccount, updateActiveAccount, refetchUserProfile };
}
