import { IconCheckCircle } from 'assets/icons/IconCheckCircle';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { Typography } from 'components/Typography';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { FormEventHandler } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { allRequiredFieldsExists } from 'reinvest-app-common/src/services/form-flow';

import { BeneficiaryCreationFormFields } from '../form-fields';
import { Identifiers } from '../identifiers';
import { useModalHandler } from '../providers/modal-handler';

const BUTTON_LABEL = 'Invest';

export const StepConfirmation: StepParams<BeneficiaryCreationFormFields> = {
  identifier: Identifiers.INVESTING_PROMPT,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields.firstName, fields.lastName, fields.beneficiary];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }: StepComponentProps<BeneficiaryCreationFormFields>) => {
    const { updateActiveAccount } = useActiveAccount();
    const { toggleIsBeneficiaryFlowOpen, toggleIsInvestmentFlowOpen, toggleHasFinishedBeneficiaryCreationFlow } = useModalHandler();

    const beneficiary = storeFields.beneficiary;

    const onSubmit: FormEventHandler<HTMLFormElement> = event => {
      event.preventDefault();
      beneficiary && updateActiveAccount({ ...beneficiary, __typename: 'AccountOverview' });
      toggleIsInvestmentFlowOpen(true);
      toggleHasFinishedBeneficiaryCreationFlow(true);
      toggleIsBeneficiaryFlowOpen(false);
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent
          useFixedGap
          willLeaveContentOnTop
        >
          <div className="flex flex-col gap-36">
            <Typography variant="h5">
              Let&apos;s build generational wealth! <br /> Make your first investment to set up your beneficiary&apos;s account and get started. 💰💪
            </Typography>

            <div className="flex justify-center">
              <IconCheckCircle />
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
