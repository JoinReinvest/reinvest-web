import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { useFlowsManager } from '../../../contexts/FlowsManager';
import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE_CANCEL = 'Your recurring investments are canceled';
const TITLE_REINSTATE = 'Your transaction is reinstated';
const BUTTON_LABEL = 'Dashboard';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._action !== undefined];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const { onModalOpenChange } = useFlowsManager();

    const action = storeFields?._action;
    const hadCancelledRecurringInvestment = action === 'cancel';
    const title = hadCancelledRecurringInvestment ? TITLE_CANCEL : TITLE_REINSTATE;

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      onModalOpenChange(false);
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <div className="flex flex-col items-center gap-24">
            <IconCheckCircle />

            <Typography variant="h5">{title}</Typography>
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label={BUTTON_LABEL}
          />
        </ButtonStack>
      </Form>
    );
  },
};
