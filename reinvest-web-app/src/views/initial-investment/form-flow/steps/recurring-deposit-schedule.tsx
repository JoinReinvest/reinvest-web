import { IconRecurrent } from 'assets/icons/IconRecurrent';
import { IconWarning } from 'assets/icons/IconWarning';
import cx from 'classnames';
import { Button } from 'components/Button';
import { ButtonStack } from 'components/FormElements/ButtonStack';
import { Form } from 'components/FormElements/Form';
import { FormContent } from 'components/FormElements/FormContent';
import { ModalTitle } from 'components/ModalElements/Title';
import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';
import { FormEventHandler } from 'react';
import {
  RECURRING_INVESTMENT_INTERVAL_LABELS,
  RECURRING_INVESTMENT_INTERVALS_WITHIN_MONTH,
} from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { allRequiredFieldsExists, StepComponentProps, StepParams } from 'reinvest-app-common/src/services/form-flow';
import { RecurringInvestmentFrequency } from 'reinvest-app-common/src/types/graphql';
import { maskCurrency } from 'reinvest-app-common/src/utilities/currency';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { FlowFields } from '../fields';
import { Identifiers } from '../identifiers';

const TITLE = 'Recurring Deposit Schedule';
const MESSAGE_INFORMATION = 'This transaction should take 3-5 business days to complete.';

export const StepRecurringDepositSchedule: StepParams<FlowFields> = {
  identifier: Identifiers.RECURRING_DEPOSIT_SCHEDULE,

  willBePartOfTheFlow: fields => {
    return !!fields._willSetUpRecurringInvestments;
  },

  doesMeetConditionFields: fields => {
    const requiredFields = [
      fields.oneTimeInvestment,
      fields._willSetUpRecurringInvestments,
      fields.recurringInvestment,
      fields.recurringInvestmentInterval,
      fields.recurringInvestment?.date,
    ];

    return allRequiredFieldsExists(requiredFields);
  },

  Component: ({ storeFields, moveToNextStep }: StepComponentProps<FlowFields>) => {
    const frequencyLabel = getFrequencyLabel(storeFields.recurringInvestmentInterval, storeFields.recurringInvestment?.date);
    const investmentAmount = storeFields.recurringInvestment?.amount || '';
    const investmentAmountForDisplay = maskCurrency(investmentAmount, { addDecimalPoints: true });
    const recurringInvestmentDate = storeFields.recurringInvestment?.date || new Date();
    const startingOnDate = formatDate(recurringInvestmentDate, 'INVESTMENT_RECURRENT');

    const onSubmit: FormEventHandler<HTMLFormElement> = async event => {
      event.preventDefault();
      moveToNextStep();
    };

    return (
      <Form onSubmit={onSubmit}>
        <FormContent>
          <div className="flex w-full justify-center">
            <IconRecurrent />
          </div>

          <ModalTitle title={TITLE} />

          <ul className="flex flex-col gap-16">
            {generateListItem('From', 'JPMORGAN CHASE BANK, NA ****1234', true)}
            <Separator />
            {generateListItem('Frequency', frequencyLabel)}
            <Separator />
            {generateListItem('Starting On', startingOnDate)}
            <Separator />
            {generateListItem('Amount', investmentAmountForDisplay)}
          </ul>

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

function generateListItem(label: string, value: string, uppercase?: boolean) {
  return (
    <li className="flex justify-between gap-8">
      <Typography variant="paragraph-large">{label}</Typography>
      <Typography
        variant="paragraph-emphasized"
        className={cx('text-black-02', { uppercase: !!uppercase })}
      >
        {value}
      </Typography>
    </li>
  );
}

function getFrequencyLabel(frequency: RecurringInvestmentFrequency | undefined, investmentDate: Date | undefined) {
  if (frequency && investmentDate) {
    const label = RECURRING_INVESTMENT_INTERVAL_LABELS.get(frequency);
    const date = new Date(investmentDate);
    const isFrequencyWithinMonth = RECURRING_INVESTMENT_INTERVALS_WITHIN_MONTH.includes(frequency);
    const dateDisplay = formatDate(date, isFrequencyWithinMonth ? 'INVESTMENT_FREQUENCY_LONG' : 'INVESTMENT_FREQUENCY_SHORT');

    return `${label}: ${dateDisplay}`;
  }

  return '';
}
