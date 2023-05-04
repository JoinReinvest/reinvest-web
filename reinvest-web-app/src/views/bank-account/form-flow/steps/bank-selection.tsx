import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { FormEventHandler } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Select your bank';
const BUTTON_LABEL = 'Continue';

export const StepBankSelection: StepParams<FlowFields> = {
  identifier: Identifiers.BANK_SELECTION,

  Component: ({ moveToNextStep }: StepComponentProps<FlowFields>) => {
    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();

      moveToNextStep();
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent>
          <Typography variant="h3">{TITLE}</Typography>
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
