import { IconSpinner } from 'assets/icons/IconSpinner';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ updateStoreFields, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
    const { activeRecurringInvestment, activeRecurringInvestmentMeta } = useRecurringInvestment();

    useEffect(() => {
      activeRecurringInvestmentMeta.remove();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      async function moveToNextStepOnSuccess() {
        if (activeRecurringInvestmentMeta.isSuccess) {
          if (activeRecurringInvestment) {
            await updateStoreFields({ activeRecurringInvestment });
            moveToStepByIdentifier(FlowStepIdentifiers.CURRENT_RECURRING_INVESTMENT);
          } else {
            moveToStepByIdentifier(FlowStepIdentifiers.NO_RECURRING_INVESTMENT);
          }
        }
      }

      moveToNextStepOnSuccess();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeRecurringInvestment, activeRecurringInvestmentMeta.isSuccess, moveToStepByIdentifier, updateStoreFields]);

    return (
      <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
        <IconSpinner />
      </div>
    );
  },
};
