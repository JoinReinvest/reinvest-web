import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useAccountStats } from './hooks/account-stats';
import { useAccounts } from './hooks/accounts';
import { useAvailableAccounts } from './hooks/available-accounts';
import { useBeneficiaries } from './hooks/beneficiaries';
import { useOnboardedAccount } from './hooks/onboarded-account';
import { useUserProfile } from './hooks/user-profile';
import { useValidateActiveAccount } from './hooks/validate-active-account';

export const useActiveAccount = createContextConsumer(Context, 'ActiveAccountProvider');

export const ActiveAccountProvider = ({ children }: PropsWithChildren) => {
  const profileAccountsResult = useUserProfile();
  const { activeAccount, allAccounts, updateActiveAccount, ...accountsResult } = useAccounts();
  const accountStatsResult = useAccountStats({ activeAccount });
  const beneficiariesResult = useBeneficiaries({ allAccounts });
  const availableAccountResult = useAvailableAccounts({ activeAccount, allAccounts });
  const onboardedAccountResult = useOnboardedAccount({ activeAccount, allAccounts, updateActiveAccount });
  const validateActiveAccountResult = useValidateActiveAccount({ activeAccount });

  return (
    <Context.Provider
      value={{
        activeAccount,
        allAccounts,
        updateActiveAccount,
        ...accountsResult,
        ...profileAccountsResult,
        ...accountStatsResult,
        ...availableAccountResult,
        ...beneficiariesResult,
        ...onboardedAccountResult,
        ...validateActiveAccountResult,
      }}
    >
      {children}
    </Context.Provider>
  );
};
