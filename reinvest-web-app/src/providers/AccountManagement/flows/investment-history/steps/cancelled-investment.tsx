import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InvestmentInformation } from 'components/InvestmentInformation';
import { Typography } from 'components/Typography';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEvent } from 'react';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowStepIdentifiers } from '../enums';
import { FlowFields } from '../interfaces';
import { formatTradeId } from '../utilities';

const INVESTMENT_INFORMATION_LABEL = 'Amount';
const INFORMATION_MESSAGE = 'Please expect funds to be drawn from your bank account within 3 days.';
const BUTTON_LABEL = 'Dashboard';

export const StepCancelledInvestment: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CANCELLED_INVESTMENT,

  doesMeetConditionFields: fields => {
    const requiredFields = [!!fields._selectedInvesmentId, !!fields._willCancelInvestment];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields }: StepComponentProps<FlowFields>) => {
    const { setCurrentFlowIdentifier, onModalOpenChange } = useAccountManagement();

    const cancellationDetails = storeFields._cancelledInvestmentDetails;
    const tradeIdLabel = cancellationDetails?.tradeId && formatTradeId(cancellationDetails?.tradeId);
    const title = [tradeIdLabel, 'cancelled'].filter(Boolean).join(' ');

    function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setCurrentFlowIdentifier(null);
      onModalOpenChange(false);
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <header className="gap-70 flex flex-col md:gap-40">
            <Typography
              variant="h4"
              className="text-center md:text-left"
            >
              {title}
            </Typography>

            {cancellationDetails && (
              <InvestmentInformation
                label={INVESTMENT_INFORMATION_LABEL}
                amount={cancellationDetails.amountFormatted}
                type="decrease"
              />
            )}
          </header>

          <div className="flex gap-8">
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
            variant="default"
            label={BUTTON_LABEL}
          />
        </ButtonStack>
      </Form>
    );
  },
};
