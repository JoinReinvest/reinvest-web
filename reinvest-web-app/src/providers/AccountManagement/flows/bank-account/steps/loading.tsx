import { IconSpinner } from 'assets/icons/IconSpinner';
import { useBankAccount } from 'providers/BankAccount';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { currentBankAccount, currentBankAccountMeta } = useBankAccount();

    useEffect(() => {
      async function updateAccountDetails() {
        if (currentBankAccountMeta.isSuccess || currentBankAccountMeta.isError) {
          const hasBankAccount = !!currentBankAccount;

          await updateStoreFields({ _hasBankAccount: hasBankAccount, _willUpdateBankAccount: hasBankAccount });
          moveToNextStep();
        }
      }

      updateAccountDetails();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentBankAccountMeta.isSuccess, currentBankAccountMeta.isError]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
