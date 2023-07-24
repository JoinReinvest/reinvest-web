import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { PlaidCollaborationHeader } from 'components/PlaidCollaborationHeader';
import { PlaidDisclaimer } from 'components/PlaidDisclaimer';
import { Typography } from 'components/Typography';
import { FormEvent } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'REINVEST uses Plaid to connect your account';
const BUTTON_LABEL = 'Continue';

export const StepDisclaimer: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.DISCLAIMER,

  Component: ({ moveToPreviousStep, moveToNextStep }: StepComponentProps<FlowFields>) => {
    function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      moveToNextStep();
    }

    function onButtonBackClick() {
      moveToPreviousStep();
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />

          <div className="flex flex-col gap-48">
            <PlaidCollaborationHeader />

            <div className="flex flex-col gap-40">
              <Typography variant="h5">{TITLE}</Typography>

              <PlaidDisclaimer />
            </div>
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
