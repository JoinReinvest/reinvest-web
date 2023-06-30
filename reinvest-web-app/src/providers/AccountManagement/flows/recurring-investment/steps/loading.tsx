import { IconSpinner } from 'assets/icons/IconSpinner';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';
import { useAddRecurringInvestmentModal } from '../providers/AddRecurringInvestmentModal';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ moveToNextStep, updateStoreFields }: StepComponentProps<FlowFields>) => {
    const { activeRecurringInvestment, activeRecurringInvestmentMeta } = useRecurringInvestment();
    const { onModalOpenChange } = useAddRecurringInvestmentModal();

    useEffect(() => {
      async function moveToNextStepOnSuccess() {
        if (activeRecurringInvestmentMeta.isSuccess) {
          if (activeRecurringInvestment) {
            await updateStoreFields({ activeRecurringInvestment });
            moveToNextStep();
          } else {
            onModalOpenChange(true);
            activeRecurringInvestmentMeta.remove();
          }
        }
      }

      moveToNextStepOnSuccess();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeRecurringInvestment, activeRecurringInvestmentMeta.isSuccess, moveToNextStep, updateStoreFields]);

    return (
      <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
        <IconSpinner />
      </div>
    );
  },
};
