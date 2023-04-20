import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';
import { MAXIMUM_NUMBER_OF_BENEFICIARIES } from 'reinvest-app-common/src/constants/account';
import { useGetIndividualAccount } from 'reinvest-app-common/src/services/queries/getIndividualAccount';
import { useGetUserProfile } from 'reinvest-app-common/src/services/queries/getProfile';
import { AccountOverview, Maybe } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';

interface ActiveAccountState {
  activeAccount: AccountOverview | null;
  allAccounts: Maybe<AccountOverview>[];
  /** Accounts that are available to be switched to. */
  availableAccounts: Maybe<AccountOverview>[];
  isAbleToAddBeneficiaries: boolean;
  updateActiveAccount: (account: Maybe<AccountOverview>) => void;
}

const Context = createContext<ActiveAccountState>({
  activeAccount: null,
  allAccounts: [],
  availableAccounts: [],
  isAbleToAddBeneficiaries: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateActiveAccount: () => {},
});

export const useActiveAccount = () => useContext(Context);

export const ActiveAccountProvider = ({ children }: PropsWithChildren) => {
  const [activeAccount, setActiveAccount] = useState<AccountOverview | null>(null);
  const { data: userProfile } = useGetUserProfile(getApiClient);
  const { data: individualAccount } = useGetIndividualAccount(getApiClient);
  const allAccounts = useMemo(() => userProfile?.accounts || [], [userProfile]);
  const availableAccounts = useMemo(() => allAccounts.filter(account => account?.id !== activeAccount?.id), [activeAccount, allAccounts]);
  const isAbleToAddBeneficiaries = 0 < MAXIMUM_NUMBER_OF_BENEFICIARIES;

  useEffect(() => {
    if (individualAccount) {
      setActiveAccount({
        id: individualAccount.id,
        label: individualAccount.label,
        type: 'INDIVIDUAL',
        avatar: {
          ...individualAccount.avatar,
        },
      });
    }
  }, [individualAccount]);

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
      }}
    >
      {children}
    </Context.Provider>
  );
};
