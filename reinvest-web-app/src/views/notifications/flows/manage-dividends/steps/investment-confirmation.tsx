import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InvestmentInformation } from 'components/InvestmentInformation';
import { Typography } from 'components/Typography';
import { FormEventHandler } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { useFlowsManagerContext } from 'views/notifications/providers/flows-manager';
import { useModalManagerContext } from 'views/notifications/providers/modal-manager';

import { useFlow } from '../flow';
import { FlowFields } from '../interfaces';
import { FlowStepIdentifiers } from '../step-identifiers';

const TITLE = 'Thank you for reinvesting.';
const AMOUNT_LABEL = 'Reward Amount';
const INFORMATION_MESSAGE = 'Successfully reinvested.';
const BUTTON_LABEL = 'Dashboard';

export const StepInvestmentConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.INVESTMENT_CONFIRMATION,

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const { resetStoreFields, moveToFirstStep } = useFlow();
    const { onModalOpenChange } = useModalManagerContext();
    const { updateCurrentFlow } = useFlowsManagerContext();
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
          <Typography variant="h5">{TITLE}</Typography>

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
