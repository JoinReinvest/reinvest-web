import { IconSpinner } from 'assets/icons/IconSpinner';
import { useDividend } from 'hooks/dividend';
import { useEffect } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { DividendState, NotificationObjectType } from 'reinvest-app-common/src/types/graphql';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';

import { DividendAction } from '../../interfaces';
import { FlowFields } from '../interfaces';
import { FlowStepIdentifiers } from '../step-identifiers';

export const StepLoading: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.MANAGE_DIVIDENDS,

  Component: ({ updateStoreFields, moveToNextStep, moveToStepByIdentifier }: StepComponentProps<FlowFields>) => {
    const { notification, notificationObjectType } = useFlowsManagerContext();

    const isDividend = notificationObjectType === NotificationObjectType.Dividend;
    const dividendId = notification?.onObject?.id;

    const { dividend, dividendMeta } = useDividend({ dividendId: (isDividend && dividendId) || null });

    useEffect(() => {
      async function initializeStoreFields() {
        if (dividendMeta.isSuccess && dividend) {
          await updateStoreFields({
            _dividendId: dividend.id,
            _amount: dividend.amount?.value || undefined,
            _amountMasked: dividend?.amount?.formatted || undefined,
          });

          if (dividend.status !== DividendState.Pending) {
            await updateStoreFields({ action: dividend.status === DividendState.Reinvested ? DividendAction.REINVEST_FUNDS : DividendAction.WITHDRAW_FUNDS });
            moveToStepByIdentifier(FlowStepIdentifiers.ACTION_CONFIRMATION);

            return;
          }

          moveToNextStep();
        }
      }

      initializeStoreFields();

      return () => {
        dividendMeta.remove();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dividendMeta.isSuccess]);

    return (
      <div className="grid h-full w-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  },
};
