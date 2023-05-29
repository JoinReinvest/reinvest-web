import { PropsWithChildren, useState } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useAccountStats } from './hooks/account-stats';
import { useAvailableAccounts } from './hooks/available-accounts';
import { useBeneficiaries } from './hooks/beneficiaries';
import { useOnboardedAccount } from './hooks/onboarded-account';
import { useProfileAccounts } from './hooks/profile-account';
import { useValidateActiveAccount } from './hooks/validate-active-account';
import { State } from './interfaces';

export const useActiveAccount = createContextConsumer(Context, 'ActiveAccountProvider');

export const ActiveAccountProvider = ({ children }: PropsWithChildren) => {
  const { allAccounts, activeAccount, updateActiveAccount, previousAccount, userProfile, userProfileMeta } = useProfileAccounts();
  const accountStatsResult = useAccountStats({ activeAccount });
  const beneficiariesResult = useBeneficiaries({ allAccounts });
  const availableAccountResult = useAvailableAccounts({ activeAccount, allAccounts });
  const [bankAccount, updateBankAccount] = useState<State['bankAccount']>(null);
  const onboardedAccountResult = useOnboardedAccount({ activeAccount, allAccounts, updateActiveAccount });
  const validateActiveAccountResult = useValidateActiveAccount({ activeAccount });

  return (
    <Context.Provider
      value={{
        userProfile,
        activeAccount,
        previousAccount,
        ...accountStatsResult,
        userProfileMeta,
        allAccounts,
        updateActiveAccount,
        ...availableAccountResult,
        bankAccount,
        updateBankAccount,
        ...beneficiariesResult,
        ...onboardedAccountResult,
        ...validateActiveAccountResult,
      }}
    >
      {children}
    </Context.Provider>
  );
};
