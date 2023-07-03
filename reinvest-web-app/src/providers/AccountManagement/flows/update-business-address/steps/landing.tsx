import { IconSpinner } from 'assets/icons/IconSpinner';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { AccountType, Address } from 'reinvest-app-common/src/types/graphql';

import { useCorporateAccount } from '../../../../../hooks/corporate-account';
import { useTrustAccount } from '../../../../../hooks/trust-account';
import { useActiveAccount } from '../../../../../providers/ActiveAccountProvider';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

export const StepLanding: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const { corporateAccount, corporateAccountMeta } = useCorporateAccount({
      accountId: activeAccount?.id ?? '',
      enabled: !!activeAccount?.id && activeAccount.type === AccountType.Corporate,
    });
    const { trustAccount, trustAccountMeta } = useTrustAccount({
      accountId: activeAccount?.id ?? '',
      enabled: !!activeAccount?.id && activeAccount.type === AccountType.Trust,
    });

    const hasLoadedCorporateAccount = corporateAccountMeta?.isSuccess;
    const hasLoadedTrustAccount = trustAccountMeta?.isSuccess;
    async function initializeCurrentAddress(address: Address) {
      await updateStoreFields({ _currentAddress: address });
      moveToNextStep();
    }

    useEffect(() => {
      const corporateAddress = corporateAccount?.details?.address;

      if (hasLoadedCorporateAccount && corporateAddress) {
        initializeCurrentAddress(corporateAddress);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasLoadedCorporateAccount]);

    useEffect(() => {
      const trustAddress = trustAccount?.details?.address;

      if (hasLoadedTrustAccount && trustAddress) {
        initializeCurrentAddress(trustAddress);
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [hasLoadedCorporateAccount]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
