import { useAccountManagement } from 'providers/AccountManagement';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useCallback, useEffect } from 'react';
import { useArchiveBeneficiaryAccount } from 'reinvest-app-common/src/services/queries/archiveBeneficiaryAccount';
import { AccountType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

import { useFlow } from '../flow';

interface Returns {
  removeBeneficiary: () => Promise<void>;
  removeBeneficiaryMeta: MutationMeta;
}

export function useRemoveBeneficiary(): Returns {
  const { activeAccount } = useActiveAccount();
  const { updateStoreFields, moveToNextValidStep } = useFlow();
  const { toggleShouldRefetchAccounts } = useAccountManagement();
  const { data, mutateAsync, ...removeBeneficiaryMeta } = useArchiveBeneficiaryAccount(getApiClient);

  const accountId = activeAccount?.id ?? '';
  const isAccountBeneficiary = activeAccount?.type === AccountType.Beneficiary;

  useEffect(() => {
    async function updateStoreFromData() {
      if (removeBeneficiaryMeta.isSuccess && data) {
        const parentAccountUpdatedValue = data?.parentAccountUpdatedValue?.formatted ?? undefined;

        await updateStoreFields({ _hasSucceded: !!data?.archived, parentAccountUpdatedValue });
        toggleShouldRefetchAccounts(true);
        moveToNextValidStep();
      }
    }

    updateStoreFromData();
  }, [data, removeBeneficiaryMeta.isSuccess, moveToNextValidStep, toggleShouldRefetchAccounts, updateStoreFields]);

  const removeBeneficiary = useCallback(async () => {
    if (isAccountBeneficiary && accountId) {
      await mutateAsync({ accountId });
    }
  }, [accountId, isAccountBeneficiary, mutateAsync]);

  return { removeBeneficiary, removeBeneficiaryMeta };
}
