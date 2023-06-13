import { InvestmentStatus } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

import { InvestmentOverview } from './interfaces';

export const INVESTMENT_STATUS_THAT_ALLOW_CANCELLATION = [InvestmentStatus.InProgress];

// TO-DO: Deprecate once GraphQL types are generated
// with the API state from the DEV environment - with
// `Query.listInvestments`.
export const INVESTMENT_HISTORY: InvestmentOverview[] = [
  {
    id: '1',
    tradeId: '47584',
    createdAt: formatDate(new Date(), 'API'),
    amount: {
      value: 1000,
      formatted: '-$1000.00',
    },
  },
  {
    id: '2',
    tradeId: '47585',
    createdAt: formatDate(new Date(), 'API'),
    amount: {
      value: 1210.24,
      formatted: '-$1210.24',
    },
  },
  {
    id: '3',
    tradeId: '47586',
    createdAt: formatDate(new Date(), 'API'),
    amount: {
      value: 500.93,
      formatted: '-$500.93',
    },
  },
  {
    id: '4',
    tradeId: '47587',
    createdAt: formatDate(new Date(), 'API'),
    amount: {
      value: 1000.5,
      formatted: '-$1000.50',
    },
  },
  {
    id: '5',
    tradeId: '47588',
    createdAt: formatDate(new Date(), 'API'),
    amount: {
      value: 1210.24,
      formatted: '-$1210.24',
    },
  },
  {
    id: '6',
    tradeId: '47589',
    createdAt: formatDate(new Date(), 'API'),
    amount: {
      value: 200.5,
      formatted: '-$200.50',
    },
  },
  {
    id: '7',
    tradeId: '47590',
    createdAt: formatDate(new Date(), 'API'),
    amount: {
      value: 1400.23,
      formatted: '-$1400.23',
    },
  },
];
