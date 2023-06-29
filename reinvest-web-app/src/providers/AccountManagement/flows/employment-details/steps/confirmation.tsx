import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEvent } from 'react';
import { StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'Your employment details have been updated';
const BUTTON_LABEL = 'Dashboard';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  isAValidationView: true,

  Component: () => {
    const { setCurrentFlowIdentifier, onModalOpenChange } = useAccountManagement();

    function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setCurrentFlowIdentifier(null);
      onModalOpenChange(false);
    }

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
