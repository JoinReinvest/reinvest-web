import { PropsWithChildren, useState } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';
import { useSessionStorage } from 'usehooks-ts';

import { Context } from './context';
import { StorageKeys } from './enums';
import { useAccountStats } from './hooks/account-stats';
import { useAvailableAccounts } from './hooks/available-accounts';
import { useBeneficiaries } from './hooks/beneficiaries';
import { useProfileAccounts } from './hooks/profile-account';
import { useValidateActiveAccount } from './hooks/validate-active-account';
import { State } from './interfaces';

export const useActiveAccount = createContextConsumer(Context, 'ActiveAccountProvider');

export const ActiveAccountProvider = ({ children }: PropsWithChildren) => {
  const { allAccounts, activeAccount, updateActiveAccount, previousAccount, userProfile, userProfileMeta } = useProfileAccounts();
  const { activeAccountStats, activeAccountStatsMeta } = useAccountStats({ activeAccount });
  const { isAbleToAddBeneficiaries } = useBeneficiaries({ allAccounts });
  const { availableAccounts, individualAccount } = useAvailableAccounts({ activeAccount, allAccounts });
  const [bankAccount, updateBankAccount] = useState<State['bankAccount']>(null);
  const [arrivesFromOnboarding, setArrivesFromOnboarding] = useSessionStorage(StorageKeys.HAS_BEEN_ONBOARDED, false);
  const { validateActiveAccountMeta, isAccountBanned, canOpenAccount } = useValidateActiveAccount({ activeAccount });

  return (
    <Context.Provider
      value={{
        userProfile,
        activeAccount,
        previousAccount,
        activeAccountStats,
        activeAccountStatsMeta,
        userProfileMeta,
        individualAccount,
        allAccounts,
        updateActiveAccount,
        availableAccounts,
        bankAccount,
        updateBankAccount,
        isAbleToAddBeneficiaries,
        arrivesFromOnboarding,
        setArrivesFromOnboarding,
        isAccountBanned,
        validateActiveAccountMeta,
        canOpenAccount,
      }}
    >
      {children}
    </Context.Provider>
  );
};
