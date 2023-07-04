import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEvent } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const TITLE = 'Beneficiary name';
const BUTTON_LABEL = 'Update Beneficiary Name';

export const StepCurrentName: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CURRENT_NAME,

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useAccountManagement();

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      moveToNextStep();
    }

    const onButtonBackClick = () => {
      setCurrentFlowIdentifier(null);
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <ButtonBack onClick={onButtonBackClick} />
          <div className="flex flex-col gap-16">
            <Typography variant="paragraph-emphasized-regular">{TITLE}</Typography>
            <Typography
              variant="h6"
              className="flex flex-col"
            >
              {storeFields?.name?.firstName} {storeFields?.name?.lastName}
            </Typography>
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
