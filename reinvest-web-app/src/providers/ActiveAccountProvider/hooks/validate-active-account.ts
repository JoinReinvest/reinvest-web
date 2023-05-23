import { useEffect, useState } from 'react';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { AccountOverview, ActionName } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

interface Params {
  activeAccount: AccountOverview | null;
}

interface Return {
  isAccountBanned: boolean;
  validateActiveAccountMeta: MutationMeta;
}

export function useValidateActiveAccount({ activeAccount }: Params): Return {
  const { data: verifyAccountData, mutateAsync: verifyAccountMutate, isSuccess, isLoading, reset, error } = useVerifyAccount(getApiClient);
  const [isAccountBanned, setIsAccountBanned] = useState(false);
  const validateActiveAccountMeta: MutationMeta = { isLoading, isSuccess, error, reset };

  useEffect(() => {
    async function verifyAccount() {
      if (activeAccount?.id) {
        await verifyAccountMutate({ accountId: activeAccount.id });
      }
    }

    verifyAccount();
  }, [activeAccount, verifyAccountMutate]);

  useEffect(() => {
    if (verifyAccountData) {
      const { requiredActions } = verifyAccountData;
      const hasBannedProfile = requiredActions?.map(requiredAction => requiredAction?.action).includes(ActionName.BanAccount);
      setIsAccountBanned(hasBannedProfile || false);
    }
  }, [verifyAccountData]);

  return { isAccountBanned, validateActiveAccountMeta };
}
