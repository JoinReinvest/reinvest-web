import { IconSpinner } from 'assets/icons/IconSpinner';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useGetDividend } from 'reinvest-app-common/src/services/queries/getDividend';
import { NotificationObjectType } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';

import { FlowFields } from '../interfaces';
import { FlowStepIdentifiers } from '../step-identifiers';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.MANAGE_DIVIDENDS,

  Component: ({ updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { notificationObject } = useFlowsManagerContext();

    const isDividend = notificationObject?.type === NotificationObjectType.Dividend;

    const { data, isSuccess } = useGetDividend(getApiClient, {
      dividendId: notificationObject?.id || '',
      config: { enabled: isDividend && !!notificationObject?.id },
    });

    useEffect(() => {
      async function initializeStoreFields() {
        if (isSuccess && data) {
          await updateStoreFields({
            _dividendId: data.id,
            _amount: data.amount?.value || undefined,
            _amountMasked: data?.amount?.formatted || undefined,
          });

          moveToNextStep();
        }
      }

      initializeStoreFields();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
