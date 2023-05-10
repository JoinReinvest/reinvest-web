import { createContext, PropsWithChildren, useContext, useState } from 'react';
import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';
import { useSessionStorage } from 'usehooks-ts';

import { useAvailableAccounts } from './hooks/available-accounts';
import { useBeneficiaries } from './hooks/beneficiaries';
import { useProfileAccounts } from './hooks/profile-account';

interface ActiveAccountState {
  activeAccount: AccountOverview | null;
  allAccounts: Maybe<AccountOverview>[];
  arrivesFromOnboarding: boolean;
  /** Accounts that are available to be switched to. */
  availableAccounts: Maybe<AccountOverview>[];
  /** The masked bank account of the profile */
  bankAccount: string | null;
  individualAccount: AccountOverview | null;
  isAbleToAddBeneficiaries: boolean;
  refetchUserProfile: () => void;
  setArrivesFromOnboarding: (value: boolean) => void;
  updateActiveAccount: (account: Maybe<AccountOverview>) => void;
  updateBankAccount: (bankAccount: string) => void;
}

enum StorageKeys {
  HAS_BEEN_ONBOARDED = 'active-account-has-been-onboarded',
}

const Context = createContext<ActiveAccountState>({
  activeAccount: null,
  individualAccount: null,
  bankAccount: null,
  allAccounts: [],
  availableAccounts: [],
  isAbleToAddBeneficiaries: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateActiveAccount: () => {},
  arrivesFromOnboarding: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setArrivesFromOnboarding: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateBankAccount: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  refetchUserProfile: () => {},
});

export const useActiveAccount = () => useContext(Context);

export const ActiveAccountProvider = ({ children }: PropsWithChildren) => {
  const { allAccounts, activeAccount, updateActiveAccount, refetchUserProfile } = useProfileAccounts();
  const { isAbleToAddBeneficiaries } = useBeneficiaries({ allAccounts });
  const { availableAccounts, individualAccount } = useAvailableAccounts({ activeAccount, allAccounts });
  const [bankAccount, updateBankAccount] = useState<ActiveAccountState['bankAccount']>(null);
  const [arrivesFromOnboarding, setArrivesFromOnboarding] = useSessionStorage(StorageKeys.HAS_BEEN_ONBOARDED, false);

  return (
    <Context.Provider
      value={{
        activeAccount,
        refetchUserProfile,
        individualAccount,
        allAccounts,
        updateActiveAccount,
        availableAccounts,
        bankAccount,
        updateBankAccount,
        isAbleToAddBeneficiaries,
        arrivesFromOnboarding,
        setArrivesFromOnboarding,
      }}
    >
      {children}
    </Context.Provider>
  );
};
