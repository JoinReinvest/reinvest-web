import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { MAXIMUM_NUMBER_OF_BENEFICIARIES } from 'reinvest-app-common/src/constants/account';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { useSessionStorage } from 'usehooks-ts';

interface ActiveAccountState {
  activeAccount: AccountOverview | null;
  allAccounts: Maybe<AccountOverview>[];
  arrivesFromOnboarding: boolean;
  /** Accounts that are available to be switched to. */
  availableAccounts: Maybe<AccountOverview>[];
  isAbleToAddBeneficiaries: boolean;
  setArrivesFromOnboarding: (value: boolean) => void;
  updateActiveAccount: (account: Maybe<AccountOverview>) => void;
}

enum StorageKeys {
  HAS_BEEN_ONBOARDED = 'active-account-has-been-onboarded',
}

const Context = createContext<ActiveAccountState>({
  activeAccount: null,
  allAccounts: [],
  availableAccounts: [],
  isAbleToAddBeneficiaries: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateActiveAccount: () => {},
  arrivesFromOnboarding: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setArrivesFromOnboarding: () => {},
});

export const useActiveAccount = () => useContext(Context);

export const ActiveAccountProvider = ({ children }: PropsWithChildren) => {
  const [activeAccount, setActiveAccount] = useState<AccountOverview | null>(null);
  const { data: userProfile } = useGetUserProfile(getApiClient);
  const allAccounts = useMemo(() => userProfile?.accounts || [], [userProfile]);
  const availableAccounts = useMemo(() => allAccounts.filter(account => account?.id !== activeAccount?.id), [activeAccount, allAccounts]);
  const [arrivesFromOnboarding, setArrivesFromOnboarding] = useSessionStorage(StorageKeys.HAS_BEEN_ONBOARDED, false);

  const isAbleToAddBeneficiaries = 0 < MAXIMUM_NUMBER_OF_BENEFICIARIES;

  useEffect(() => {
    const firstAccount = userProfile?.accounts?.at(0);

    if (firstAccount) {
      setActiveAccount(firstAccount);
    }
  }, [userProfile]);

  const updateActiveAccount = (account: Maybe<AccountOverview>) => {
    if (account) {
      setActiveAccount(account);
    }
  };

  return (
    <Context.Provider
      value={{
        activeAccount,
        allAccounts,
        updateActiveAccount,
        availableAccounts,
        isAbleToAddBeneficiaries,
        arrivesFromOnboarding,
        setArrivesFromOnboarding,
      }}
    >
      {children}
    </Context.Provider>
  );
};
