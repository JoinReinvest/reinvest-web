import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Fragment } from 'react';
import { DateFormats } from 'reinvest-app-common/src/constants/date-formats';
import {
  RECURRING_INVESTMENT_INTERVAL_LABELS,
  RECURRING_INVESTMENT_INTERVALS_WITHIN_MONTH,
} from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { RecurringInvestment } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';
import { lowerCaseWithoutSpacesGenerator } from 'utils/optionValueGenerators';

enum Labels {
  BANK_ACCOUNT = 'From',
  FREQUENCY = 'Frequency',
  DATE = 'Starting On',
  AMOUNT = 'Amount',
}

interface Props {
  bankAccount: string;
  recurringInvestment: RecurringInvestment;
}

export function RecurringInvestmentDepositSchedule({ bankAccount, recurringInvestment }: Props) {
  const listItems = useMemo(() => {
    const frequencyLabel = getFrequencyLabel(recurringInvestment?.schedule);
    const investmentAmount = recurringInvestment?.amount?.formatted;
    const startingOnDate = formatDate(recurringInvestment?.nextInvestmentDate || '', 'INVESTMENT_RECURRENT', { currentFormat: 'API' });

    return [
      { label: Labels.BANK_ACCOUNT, value: bankAccount },
      { label: Labels.FREQUENCY, value: frequencyLabel },
      { label: Labels.DATE, value: startingOnDate },
      { label: Labels.AMOUNT, value: investmentAmount },
    ];
  }, [bankAccount, recurringInvestment]);

  return (
    <ul className="flex flex-col gap-16">
      {listItems.map(({ label, value }, index) => {
        const key = lowerCaseWithoutSpacesGenerator(label);
        const isLastItem = index === listItems.length - 1;

        return (
          <Fragment key={key}>
            <li className="flex justify-between gap-8">
              <Typography variant="paragraph-large">{label}</Typography>
              <Typography
                variant="paragraph-emphasized"
                className="text-black-02"
              >
                {value}
              </Typography>
            </li>

            {!isLastItem && <Separator />}
          </Fragment>
        );
      })}
    </ul>
  );
}

function getFrequencyLabel(schedule?: RecurringInvestment['schedule']) {
  if (schedule?.frequency && schedule?.startDate) {
    const label = RECURRING_INVESTMENT_INTERVAL_LABELS.get(schedule.frequency);
    const date = dayjs(schedule.startDate, DateFormats.API).toDate();
    const isFrequencyWithinMonth = RECURRING_INVESTMENT_INTERVALS_WITHIN_MONTH.includes(schedule.frequency);
    const dateDisplay = formatDate(date, !isFrequencyWithinMonth ? 'INVESTMENT_FREQUENCY_SHORT' : 'INVESTMENT_FREQUENCY_LONG');

    return `${label}: ${dateDisplay}`;
  }

  return '';
}
