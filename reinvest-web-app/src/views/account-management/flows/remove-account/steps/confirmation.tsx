import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InvestmentInformation } from 'components/InvestmentInformation';
import { Typography } from 'components/Typography';
import { useGoToDashboard } from 'hooks/go-to-dashboard';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { FormEventHandler } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { useFlowsManager } from '../../../contexts/FlowsManager';
import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';

const TITLE = 'Beneficiary Account Removed';
const BUTTON_LABEL = 'Dashboard';
const INVESTMENT_INFORMATION_LABEL = 'Account Value';
const INFORMATION_MESSAGE = 'Updated Individual Account Value.';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  isAValidationView: true,

  doesMeetConditionFields: fields => {
    const requiredFields = [fields._hasSucceded !== undefined, fields.parentAccountUpdatedValue];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const { individualAccount, updateActiveAccount } = useActiveAccount();
    const { onModalOpenChange } = useFlowsManager();
    const { maybeGoToDashboard } = useGoToDashboard();

    const accountValueUpdate = storeFields?.parentAccountUpdatedValue;

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      onModalOpenChange(false);
      updateActiveAccount(individualAccount);
      maybeGoToDashboard();
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <div className="flex flex-col items-center gap-40">
            <Typography
              variant="h3"
              className="text-center md:text-left"
            >
              {TITLE}
            </Typography>

            {accountValueUpdate && (
              <InvestmentInformation
                label={INVESTMENT_INFORMATION_LABEL}
                amount={accountValueUpdate}
                type="one-time"
              />
            )}
          </div>
          <div className="mt-32 flex gap-8">
            <IconWarning className="stroke-gray-01" />
            <Typography
              variant="paragraph"
              className="grow text-gray-01"
            >
              {INFORMATION_MESSAGE}
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
