import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { useFlowsManager } from '../../../contexts/FlowsManager';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const TITLE = 'Your phone number is updated';
const BUTTON_LABEL = 'Dashboard';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._hasSucceded !== undefined];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: () => {
    const { setCurrentFlowIdentifier, onModalOpenChange } = useFlowsManager();

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      setCurrentFlowIdentifier(null);
      onModalOpenChange(false);
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <div className="flex flex-col items-center gap-24">
            <IconCheckCircle />

            <Typography variant="h5">{TITLE}</Typography>
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
