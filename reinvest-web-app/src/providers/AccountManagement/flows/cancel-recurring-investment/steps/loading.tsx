import { IconSpinner } from 'assets/icons/IconSpinner';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { activeRecurringInvestment, activeRecurringInvestmentMeta } = useRecurringInvestment();

    useEffect(() => {
      async function moveToNextStepOnSuccess() {
        if (activeRecurringInvestmentMeta.isSuccess && activeRecurringInvestment) {
          await updateStoreFields({ activeRecurringInvestment });
          moveToNextStep();
        }
      }

      moveToNextStepOnSuccess();
    }, [activeRecurringInvestment, activeRecurringInvestmentMeta.isSuccess, moveToNextStep, updateStoreFields]);

    return (
      <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
        <IconSpinner />
      </div>
    );
  },
};
