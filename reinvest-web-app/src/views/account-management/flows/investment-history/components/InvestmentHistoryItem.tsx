import { IconArrowRight } from 'assets/icons/IconArrowRight';
import { Separator } from 'components/Separator';
import { Typography } from 'components/Typography';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { InvestmentOverview } from '../interfaces';
import { formatTradeId } from '../utilities';

interface Props {
  investment: InvestmentOverview;
  onClick: (investment: InvestmentOverview) => Promise<void>;
  isLastItem?: boolean;
}

export function InvestmentHistoryItem({ investment, isLastItem, onClick }: Props) {
  const tradeLabel = formatTradeId(investment.tradeId);
  const date = formatDate(investment.createdAt, 'INVESTMENT_SUMMARY', { currentFormat: 'API' });

  return (
    <>
      <li className="w-full">
        <button
          className="flex w-full items-center justify-between"
          onClick={() => onClick(investment)}
        >
          <div className="flex flex-col text-left">
            <Typography variant="bonus-heading-regular">{tradeLabel}</Typography>
            <Typography variant="paragraph">{date}</Typography>
          </div>

          <div className="flex items-center">
            <Typography variant="h6">{investment.amount.formatted}</Typography>

            <IconArrowRight />
          </div>
        </button>
      </li>

      {!isLastItem && <Separator />}
    </>
  );
}
