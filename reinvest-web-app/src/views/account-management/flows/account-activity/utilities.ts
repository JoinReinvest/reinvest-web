import { AccountActivity, InvestmentStatus } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

const TRADE_PREFIX = 'Trade ID';

export function formatTradeId(tradeId: string): string {
  return [TRADE_PREFIX, tradeId].join(' ');
}

/** Use with Tailwind's `capitalize` class */
export function formatInvestmentStatus(status: InvestmentStatus) {
  return status.replace('_', ' ').toLowerCase();
}

export function getActivityDetails(investment: AccountActivity): { label: string; value: string }[] {
  const date = formatDate(investment.date, 'INVESTMENT_SUMMARY', { currentFormat: 'API' });

  return [
    {
      label: 'Transaction ID',
      value: '47584',
    },
    {
      label: 'Date',
      value: date,
    },
    {
      label: 'Time',
      value: '13:30',
    },
    {
      label: 'Origin',
      value: 'Lorem ipsum',
    },
    {
      label: 'User',
      value: 'Brandon Rule',
    },
  ];
}
