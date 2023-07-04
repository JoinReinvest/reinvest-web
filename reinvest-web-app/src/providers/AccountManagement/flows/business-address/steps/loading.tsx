import { IconSpinner } from 'assets/icons/IconSpinner';
import { useCorporateAccount } from 'hooks/corporate-account';
import { useIsCorporateAccount } from 'hooks/is-corporate-account';
import { useTrustAccount } from 'hooks/trust-account';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { activeAccount } = useActiveAccount();
    const accountId = activeAccount?.id ?? '';
    const isCorporateAccount = useIsCorporateAccount();
    const { trustAccount, trustAccountMeta } = useTrustAccount({ accountId, enabled: !isCorporateAccount });
    const { corporateAccount, corporateAccountMeta } = useCorporateAccount({ accountId, enabled: isCorporateAccount });

    useEffect(() => {
      async function initializeFields() {
        if (isCorporateAccount && corporateAccountMeta.isSuccess) {
          const address = corporateAccount?.details?.address;

          if (address) {
            await updateStoreFields({ _currentAddress: address });
            moveToNextStep();
          }
        }

        if (!isCorporateAccount && trustAccountMeta.isSuccess) {
          const address = trustAccount?.details?.address;

          if (address) {
            await updateStoreFields({ _currentAddress: address });
            moveToNextStep();
          }
        }
      }

      initializeFields();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCorporateAccount, trustAccountMeta.isSuccess, trustAccountMeta.isError, corporateAccountMeta.isSuccess, corporateAccountMeta.isError]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner />
      </div>
    );
  },
};
