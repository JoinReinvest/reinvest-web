import { AccountActivity } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

const TRADE_PREFIX = 'Trade ID';

export function formatTradeId(tradeId: string): string {
  return [TRADE_PREFIX, tradeId].join(' ');
}

export function getActivityDetails(activity: AccountActivity): { label: string; value: string }[] {
  const [date, time] = formatDate(activity.date, 'ACCOUNT_ACTIVITY', { currentFormat: 'API' }).split(' | ');

  return [
    {
      label: 'Transaction ID',
      value: '47584',
    },
    {
      label: 'Date',
      value: date as string,
    },
    {
      label: 'Time',
      value: time as string,
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
