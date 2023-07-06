import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { useAuth } from '../../../../AuthProvider';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const TITLE = 'Your email is updated';
const BUTTON_LABEL = 'Relogin';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._hasSucceded !== undefined];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: () => {
    const { setCurrentFlowIdentifier, onModalOpenChange } = useAccountManagement();
    const { actions } = useAuth();

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      setCurrentFlowIdentifier(null);
      onModalOpenChange(false);
      await actions.signOut();
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
