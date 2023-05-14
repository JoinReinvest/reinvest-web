import { PropsWithChildren, useContext, useState } from 'react';
import { useSessionStorage } from 'usehooks-ts';

import { Context } from './context';
import { StorageKeys } from './enums';
import { useAvailableAccounts } from './hooks/available-accounts';
import { useBeneficiaries } from './hooks/beneficiaries';
import { useProfileAccounts } from './hooks/profile-account';
import { State } from './interfaces';

export const useActiveAccount = () => useContext(Context);

export const ActiveAccountProvider = ({ children }: PropsWithChildren) => {
  const { allAccounts, activeAccount, updateActiveAccount, refetchUserProfile } = useProfileAccounts();
  const { isAbleToAddBeneficiaries } = useBeneficiaries({ allAccounts });
  const { availableAccounts, individualAccount } = useAvailableAccounts({ activeAccount, allAccounts });
  const [bankAccount, updateBankAccount] = useState<State['bankAccount']>(null);
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
