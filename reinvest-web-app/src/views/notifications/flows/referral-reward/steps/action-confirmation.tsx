import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InvestmentInformation } from 'components/InvestmentInformation';
import { Typography } from 'components/Typography';
import { useNotifications } from 'providers/Notifications';
import { FormEventHandler, useEffect } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';
import { useModalManagerContext } from 'views/notifications/providers/modal-manager';

import { DividendAction } from '../../interfaces';
import { useFlow } from '../flow';
import { FlowFields } from '../interfaces';
import { FlowStepIdentifiers } from '../step-identifiers';

const TITLE_REINVEST = 'Thank you for reinvesting.';
const TITLE_WITHDRAW = 'Reward withdrawal successful.';
const AMOUNT_LABEL = 'Reward Amount';
const INFORMATION_MESSAGE_WITHDRAW = 'Deposited to your account';
const INFORMATION_MESSAGE_REINVEST = 'Successfully reinvested.';
const BUTTON_LABEL = 'Dashboard';

export const StepActionConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.ACTION_CONFIRMATION,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._dividendId, fields._amount, fields._amountMasked, fields.action];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const { resetStoreFields, moveToFirstStep } = useFlow();
    const { markAsRead } = useNotifications();
    const { onModalOpenChange } = useModalManagerContext();
    const { updateCurrentFlow, notification } = useFlowsManagerContext();

    useEffect(() => {
      async function markNotificationAsRead() {
        if (notification?.id) {
          await markAsRead({ notificationId: notification.id });
        }
      }

      markNotificationAsRead();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const willReinvestFunds = storeFields.action === DividendAction.REINVEST_FUNDS;
    const title = willReinvestFunds ? TITLE_REINVEST : TITLE_WITHDRAW;
    const informationMessage = willReinvestFunds ? INFORMATION_MESSAGE_REINVEST : INFORMATION_MESSAGE_WITHDRAW;

    const amountMasked = storeFields._amountMasked;

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      updateCurrentFlow({ identifier: null });
      onModalOpenChange(false);

      await resetStoreFields();
      moveToFirstStep();
    };

    return (
      <Form
        onSubmit={onSubmit}
        className="pb-24"
      >
        <FormContent
          className="gap-40"
          willLeaveContentOnTop
        >
          <Typography
            variant="h5"
            className="text-center md:text-left"
          >
            {title}
          </Typography>

          {amountMasked !== undefined && (
            <InvestmentInformation
              amount={amountMasked}
              label={AMOUNT_LABEL}
              type="decrease"
            />
          )}

          <div className="flex items-center gap-8">
            <IconWarning className="stroke-gray-01" />
            <Typography
              variant="paragraph-large"
              className="grow text-gray-01"
            >
              {informationMessage}
            </Typography>
          </div>
        </FormContent>

        <ButtonStack useRowOnLgScreen>
          <Button
            label={BUTTON_LABEL}
            type="submit"
          />
        </ButtonStack>
      </Form>
    );
  },
};
