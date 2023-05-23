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
  const { allAccounts, activeAccount, updateActiveAccount, refetchUserProfile, previousAccount } = useProfileAccounts();
  const { activeAccountStats, activeAccountStatsMeta } = useAccountStats({ activeAccount });
  const { isAbleToAddBeneficiaries } = useBeneficiaries({ allAccounts });
  const { availableAccounts, individualAccount } = useAvailableAccounts({ activeAccount, allAccounts });
  const [bankAccount, updateBankAccount] = useState<State['bankAccount']>(null);
  const [arrivesFromOnboarding, setArrivesFromOnboarding] = useSessionStorage(StorageKeys.HAS_BEEN_ONBOARDED, false);
  // const { data: verifyAccountData, mutateAsync: verifyAccountMutate } = useVerifyAccount(getApiClient);
  const { validateActiveAccountMeta, isAccountBanned } = useValidateActiveAccount({ activeAccount });
  // const [isAccountBanned, setIsAccountBanned] = useState(false);

  // useEffect(() => {
  //   async function verifyAccount() {
  //     if (activeAccount?.id) {
  //       await verifyAccountMutate({ accountId: activeAccount.id });
  //     }
  //   }
  //
  //   verifyAccount();
  // }, [activeAccount, verifyAccountMutate]);
  //
  // useEffect(() => {
  //   if (verifyAccountData) {
  //     const { requiredActions } = verifyAccountData;
  //     const hasBannedProfile = requiredActions?.map(requiredAction => requiredAction?.action).includes(ActionName.BanAccount);
  //     setIsAccountBanned(hasBannedProfile || false);
  //   }
  // }, [verifyAccountData]);

  return (
    <Context.Provider
      value={{
        activeAccount,
        previousAccount,
        activeAccountStats,
        activeAccountStatsMeta,
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
        isAccountBanned,
        validateActiveAccountMeta,
      }}
    >
      {children}
    </Context.Provider>
  );
};
