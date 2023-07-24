import { Typography } from 'components/Typography';
import { useMemo } from 'react';
import { InvestmentSummary } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

interface Props {
  investment: InvestmentSummary | null;
}

enum Labels {
  TRADE_ID = 'Trade ID',
  DATE = 'Date',
  AMOUNT = 'Amount',
}

export function InvestmentDetails({ investment }: Props) {
  const details = useMemo(() => {
    const tradeId = investment?.tradeId;
    const date = investment?.createdAt && formatDate(investment?.createdAt, 'INVESTMENT_FEES', { currentFormat: 'API_TZ' });
    const amount = investment?.investmentFees?.formatted;

    return [[Labels.TRADE_ID, tradeId].join(': '), [Labels.DATE, date].join(': '), [Labels.AMOUNT, amount].join(': ')];
  }, [investment]);

  return (
    <ul className="flex flex-col gap-4">
      {details.map((item, index) => (
        <li key={index}>
          <Typography variant="paragraph-large">{item}</Typography>
        </li>
      ))}
    </ul>
  );
}
