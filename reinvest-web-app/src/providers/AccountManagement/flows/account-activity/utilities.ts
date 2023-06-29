import { AccountActivity } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

const TRADE_PREFIX = 'Trade ID';

export function formatTradeId(tradeId: string): string {
  return [TRADE_PREFIX, tradeId].join(' ');
}

export function getActivityDetails(activity: AccountActivity): { label: string; value: string }[] {
  const date = formatDate(activity.date, 'INVESTMENT_SUMMARY', { currentFormat: 'API' });

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
