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
});

export const useActiveAccount = () => useContext(Context);

export const ActiveAccountProvider = ({ children }: PropsWithChildren) => {
  const { allAccounts, activeAccount, updateActiveAccount } = useProfileAccounts();
  const [bankAccount, updateBankAccount] = useState<ActiveAccountState['bankAccount']>(null);
  const { isAbleToAddBeneficiaries, beneficiaryAccounts } = useBeneficiaries({ allAccounts });
  const [arrivesFromOnboarding, setArrivesFromOnboarding] = useSessionStorage(StorageKeys.HAS_BEEN_ONBOARDED, false);
  const { availableAccounts, individualAccount } = useAvailableAccounts({ activeAccount, allAccounts, beneficiaryAccounts });

  return (
    <Context.Provider
      value={{
        activeAccount,
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
