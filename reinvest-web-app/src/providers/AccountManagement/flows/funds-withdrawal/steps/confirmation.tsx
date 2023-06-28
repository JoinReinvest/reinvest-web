import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { InvestmentInformation } from 'components/InvestmentInformation';
import { Typography } from 'components/Typography';
import { useGoToDashboard } from 'hooks/go-to-dashboard';
import { useAccountManagement } from 'providers/AccountManagement';
import { FormEvent } from 'react';
import { StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields, FlowStepIdentifiers } from '../interfaces';
import { useFundsWithdrawalManager } from '../providers/FundsWithdrawal';

const TITLE = 'Funds requested for withdrawal';
const INVESTMENT_INFORMATION_LABEL = 'Amount';
const INFORMATION_MESSAGE = 'Above eligible funds requested to be withdrawn.';
const NOTICE_MESSAGE = 'REINVEST will approve or reject this request shortly. Average decision time is under 30 business days.';
const BUTTON_LABEL = 'Dashboard';

export const StepConfirmation: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.CONFIRMATION,

  Component: () => {
    const { setCurrentFlowIdentifier } = useAccountManagement();
    const { fundsWithdrawalRequest } = useFundsWithdrawalManager();
    const { maybeGoToDashboard } = useGoToDashboard();

    const amount = fundsWithdrawalRequest?.eligibleForWithdrawal?.formatted;

    function onSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setCurrentFlowIdentifier(null);
      maybeGoToDashboard();
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop>
          <div className="flex flex-col gap-32">
            <Typography
              variant="h4"
              className="text-center md:text-left"
            >
              {TITLE}
            </Typography>

            {amount && (
              <InvestmentInformation
                label={INVESTMENT_INFORMATION_LABEL}
                amount={amount}
                type="decrease"
              />
            )}

            <Typography variant="paragraph-emphasized">{NOTICE_MESSAGE}</Typography>
          </div>

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
