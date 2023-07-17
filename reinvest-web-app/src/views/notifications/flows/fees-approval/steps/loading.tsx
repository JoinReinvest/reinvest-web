import { IconSpinner } from 'assets/icons/IconSpinner';
import { useApproveFees } from 'hooks/approve-fees';
import { useInvestmentSummary } from 'hooks/investment-summary';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.LOADING,

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { notification, updateCurrentFlow } = useFlowsManagerContext();
    const investmentId = notification?.onObject?.id ?? '';
    const { investment, investmentMeta } = useInvestmentSummary({ investmentId });
    const { approveFeesMeta } = useApproveFees({ investmentId });

    useEffect(() => {
      investmentMeta.remove();
      approveFeesMeta.reset();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      async function moveToNextStepOnSuccess() {
        if (investmentMeta.isSuccess) {
          if (investment) {
            await updateStoreFields({ investment });
            moveToNextStep();
          } else {
            updateCurrentFlow({ identifier: null });
            investmentMeta.remove();
          }
        }
      }

      moveToNextStepOnSuccess();

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [investmentMeta.isSuccess]);

    return (
      <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
        <IconSpinner />
      </div>
    );
  },
};
