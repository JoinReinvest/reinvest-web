import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';
import { RECURRING_INVESTMENT_INTERVAL_LABELS } from 'reinvest-app-common/src/constants/recurring-investment-intervals';
import { RecurringInvestment } from 'reinvest-app-common/src/types/graphql';

import { STATUS_LABELS } from '../constants';

interface Props {
  activeRecurringInvestment: RecurringInvestment | null;
}

enum Labels {
  FREQUENCY = 'Frequency',
  STATUS = 'Status',
  AMOUNT = 'Amount',
}

export const RecurringInvestmentDetails = ({ activeRecurringInvestment }: Props) => {
  const status = activeRecurringInvestment?.status;
  const statusLabel = status && STATUS_LABELS.get(status);

  const frequency = activeRecurringInvestment?.schedule.frequency;
  const frequencyLabel = frequency && RECURRING_INVESTMENT_INTERVAL_LABELS.get(frequency);

  const amount = activeRecurringInvestment?.amount.formatted;

  return (
    <div className="flex flex-col gap-16">
      <div className="flex justify-between">
        <Typography variant="paragraph-emphasized-regular">{Labels.FREQUENCY}</Typography>

        <Typography variant="paragraph-emphasized">{frequencyLabel}</Typography>
      </div>

      <Separator />

      <div className="flex justify-between">
        <Typography variant="paragraph-emphasized-regular">{Labels.AMOUNT}</Typography>

        <Typography variant="paragraph-emphasized">{amount}</Typography>
      </div>

      <Separator />

      <div className="flex justify-between">
        <Typography variant="paragraph-emphasized-regular">{Labels.STATUS}</Typography>

        <Typography
          variant="paragraph-emphasized"
          className="text-tertiary-success"
        >
          {statusLabel}
        </Typography>
      </div>
    </div>
  );
};
