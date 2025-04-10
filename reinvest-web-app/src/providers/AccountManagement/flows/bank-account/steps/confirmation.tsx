import { IconCheckCircleGray } from 'assets/icons/IconCheckCircleGray';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEvent } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';

const PLACEHOLDER = '{}';

const TITLE_SUCCESS = `Your bank account ending in ${PLACEHOLDER} has been added.`;
const TITLE_FAILURE = 'We were unable to add your bank account.';
const BUTTON_LABEL = 'Dashboard';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  isAValidationView: true,

  doesMeetConditionFields: fields => !!fields.hashedBankAccount,

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier } = useAccountManagement();

    const hasSucceded = !!storeFields.hashedBankAccount;
    const title = storeFields?.hashedBankAccount
      ? TITLE_SUCCESS.replace(PLACEHOLDER, storeFields.hashedBankAccount.replace(/ /g, '').slice(-8))
      : TITLE_FAILURE;
    const icon = hasSucceded ? <IconCheckCircleGray /> : null;

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setCurrentFlowIdentifier(null);
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <div className="flex flex-col items-center gap-32">
            {icon}

            <Typography
              variant="h5"
              className="text-center"
            >
              {title}
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
