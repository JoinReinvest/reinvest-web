import { useEffect, useRef } from 'react';
import { useGetListAccountTypesUserCanOpen } from 'reinvest-app-common/src/services/queries/getListAccountTypesUserCanOpen';
import { useVerifyAccount } from 'reinvest-app-common/src/services/queries/verifyAccount';
import { AccountOverview, AccountType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

interface Params {
  activeAccount: AccountOverview | null;
}

interface Return {
  canOpenAccount: boolean;
  validateActiveAccountMeta: MutationMeta;
}

export function useValidateActiveAccount({ activeAccount }: Params): Return {
  const { mutateAsync: verifyAccountMutate, isSuccess, isLoading, reset, error } = useVerifyAccount(getApiClient);
  const canOpenAccount = useRef<boolean>();

  const {
    data: listAccountTypesUserCanOpen,
    isLoading: isListAccountTypesUserCanOpenLoading,
    isSuccess: isListAccountTypesUserCanOpenSuccess,
  } = useGetListAccountTypesUserCanOpen(getApiClient);
  const validateActiveAccountMeta: MutationMeta = { isLoading: isLoading || isListAccountTypesUserCanOpenLoading, isSuccess, error, reset };

  useEffect(() => {
    async function verifyAccount() {
      if (activeAccount?.id) {
        await verifyAccountMutate({ accountId: activeAccount.id });
      }
    }

    verifyAccount();
  }, [activeAccount, verifyAccountMutate]);

  useEffect(() => {
    if (isListAccountTypesUserCanOpenSuccess) {
      const possibleAccountsWithoutBeneficiary = listAccountTypesUserCanOpen?.filter(account => account !== AccountType.Beneficiary) as AccountType[];
      canOpenAccount.current = possibleAccountsWithoutBeneficiary?.length > 0 || false;
    }
  }, [isListAccountTypesUserCanOpenSuccess, listAccountTypesUserCanOpen]);

  return { validateActiveAccountMeta, canOpenAccount: canOpenAccount.current || false };
}
