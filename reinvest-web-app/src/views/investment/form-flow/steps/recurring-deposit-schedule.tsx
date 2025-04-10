import { IconRecurrent } from 'assets/icons/IconRecurrent';
import { IconWarning } from 'assets/icons/IconWarning';
import { Button } from 'components/Button';
import { ButtonBack } from 'components/ButtonBack';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { RecurringInvestmentDepositSchedule } from 'components/RecurringInvestmentDepositSchedule';
import { Typography } from 'components/Typography';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { FormEventHandler } from 'react';
import { StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Recurring Deposit Schedule';
const MESSAGE_INFORMATION = 'This transaction should take 3-5 business days to complete.';

export const StepRecurringDepositSchedule: StepParams<FlowFields> = {
  identifier: Identifiers.RECURRING_DEPOSIT_SCHEDULE,

  willBePartOfTheFlow: fields => {
    return !!fields._willSetUpRecurringInvestment;
  },

  doesMeetConditionFields: fields => {
    const regularInvestmentFields =
      !!fields._willSetUpRecurringInvestment && !!fields.recurringInvestment && !!fields.recurringInvestmentInterval && !!fields.recurringInvestment?.date;

    return regularInvestmentFields || !!fields._onlyRecurringInvestment;
  },

  Component: ({ storeFields, moveToNextStep, moveToPreviousStep }: StepComponentProps<FlowFields>) => {
    const { recurringInvestment } = useRecurringInvestment();

    const bankAccount = storeFields._bankAccount ?? '';

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      moveToNextStep();
    };

    function onButtonBackClick() {
      moveToPreviousStep();
    }

    return (
      <Form onSubmit={onSubmit}>
        <FormContent willLeaveContentOnTop={!!storeFields._forInitialInvestment}>
          {!!storeFields._forInitialInvestment && (
            <ButtonBack
              hideOnMobile
              onClick={onButtonBackClick}
            />
          )}

          <div className="flex w-full justify-center">
            <IconRecurrent />
          </div>

          <ModalTitle title={TITLE} />

          {recurringInvestment && (
            <RecurringInvestmentDepositSchedule
              recurringInvestment={recurringInvestment}
              bankAccount={bankAccount}
            />
          )}

          <div className="flex gap-8">
            <IconWarning className="stroke-gray-01" />
            <Typography
              variant="paragraph"
              className="grow text-gray-01"
            >
              {MESSAGE_INFORMATION}
            </Typography>
          </div>
        </FormContent>

        <ButtonStack>
          <Button
            type="submit"
            label="Continue"
          />
        </ButtonStack>
      </Form>
    );
  },
};
