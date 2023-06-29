import { IconSpinner } from 'assets/icons/IconSpinner';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { FormEvent } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { AccountValuePreview } from '../components/AccountValuePreview';
import { FundsBreakdownItem } from '../components/FundsBreakdownItem';
import { FlowFields, FlowStepIdentifiers } from '../interfaces';
import { useFundsWithdrawalManager } from '../providers/FundsWithdrawal';

enum FUNDS_BREAKDOWN_LABELS {
  ELEGIBLE = '$ Eligible Funds for Withdrawal',
  PENALTY = 'Penalties for early withdrawal ($ Withdrawal amount)',
}

const BUTTON_LABEL = 'Request Fund Withdrawal';

export const StepRequestFunds: StepParams<FlowFields> = {
  identifier: FlowStepIdentifiers.REQUEST_FUNDS,

  doesMeetConditionFields: fields => !!fields._canWithdrawFunds,

  Component: ({ moveToPreviousStep, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const { simulation, simulationMeta } = useFundsWithdrawalManager();

    if (simulationMeta?.isLoading) {
      return (
        <div className="flex h-full flex-col items-center gap-32 lg:justify-center">
          <IconSpinner />
        </div>
      );
    }

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

          <AccountValuePreview />

          <ul className="flex flex-col gap-16">
            {simulation?.eligibleForWithdrawal?.formatted && (
              <FundsBreakdownItem
                label={FUNDS_BREAKDOWN_LABELS.ELEGIBLE}
                value={simulation.eligibleForWithdrawal.formatted}
              />
            )}

            {simulation?.penaltiesFee?.formatted && (
              <FundsBreakdownItem
                label={FUNDS_BREAKDOWN_LABELS.PENALTY}
                value={simulation.penaltiesFee.formatted}
              />
            )}
          </ul>
        </FormContent>

        <ButtonStack>
          <Button
            variant="error"
            type="submit"
            label={BUTTON_LABEL}
          />
        </ButtonStack>
      </Form>
    );
  },
};
