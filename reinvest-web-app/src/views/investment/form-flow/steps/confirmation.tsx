import { IconCheckCircleGray } from 'assets/icons/IconCheckCircleGray';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { FormEventHandler } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const PLACEHOLDER = '{}';

const TITLE_SUCCESS = `Your bank account ending in ${PLACEHOLDER} has been added.`;
const TITLE_FAILURE = 'We were unable to add your bank account.';
const BUTTON_LABEL = 'Continue';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: Identifiers.CONFIRMATION,

  doesMeetConditionFields: fields => {
    return !!fields.bankAccount && !fields._hasCompletedFlow;
  },

  Component: ({ storeFields, updateStoreFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const hasSucceded = !!storeFields.bankAccount;
    const title = hasSucceded ? TITLE_SUCCESS.replace(PLACEHOLDER, storeFields.bankAccount) : TITLE_FAILURE;
    const icon = hasSucceded ? <IconCheckCircleGray /> : null;

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      await updateStoreFields({ _hasCompletedFlow: true });

      moveToNextStep();
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent>
          <div className="flex flex-col items-center gap-32">
            {icon}

            <ModalTitle
              title={title}
              isTitleCenteredOnMobile
            />
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
