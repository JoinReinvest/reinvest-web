import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InvestmentInformation } from 'components/InvestmentInformation';
import { Typography } from 'components/Typography';
import { useActiveAccountNotifications } from 'providers/ActiveAccountNotifications';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';
import { useModalManagerContext } from 'views/notifications/providers/modal-manager';

import { useFlow } from '../flow';
import { DividendAction, FlowFields } from '../interfaces';
import { FlowStepIdentifiers } from '../step-identifiers';

const TITLE_REINVEST = 'Thank you for reinvesting.';
const TITLE_WITHDRAW = 'Reward withdrawing successful.';
const AMOUNT_LABEL = 'Reward Amount';
const INFORMATION_MESSAGE = 'Deposited to your account';
const BUTTON_LABEL = 'Dashboard';

export const StepActionConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.INVESTMENT_CONFIRMATION,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._dividendId, fields._amount, fields._amountMasked, fields.action];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const { resetStoreFields, moveToFirstStep } = useFlow();
    const { markAsRead } = useActiveAccountNotifications();
    const { onModalOpenChange } = useModalManagerContext();
    const { updateCurrentFlow, notification } = useFlowsManagerContext();
    const title = storeFields.action === DividendAction.REINVEST_FUNDS ? TITLE_REINVEST : TITLE_WITHDRAW;

    const amountMasked = storeFields._amountMasked;
    const notificationId = notification?.id;

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      if (notificationId) {
        await markAsRead({ notificationId });
      }

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
              type="one-time"
            />
          )}

          <div className="flex items-center gap-8">
            <IconWarning className="stroke-gray-01" />
            <Typography
              variant="paragraph-large"
              className="grow text-gray-01"
            >
              {INFORMATION_MESSAGE}
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
