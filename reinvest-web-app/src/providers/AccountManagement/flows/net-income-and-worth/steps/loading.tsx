import { IconSpinner } from 'assets/icons/IconSpinner';
import { useIndividualAccount } from 'hooks/individual-account';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { individualAccount, updateIndividualAccountMeta } = useIndividualAccount();

    useEffect(() => {
      async function updateAccountDetails() {
        if (individualAccount) {
          const details = individualAccount.details;

          await updateStoreFields({
            netIncome: details?.netIncome?.range ?? undefined,
            netWorth: details?.netWorth?.range ?? undefined,
          });

          moveToNextStep();
        }
      }

      updateAccountDetails();

      return () => {
        updateIndividualAccountMeta.reset();
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [individualAccount]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
