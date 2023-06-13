import { InvestmentStatus, InvestmentSummary } from 'reinvest-app-common/src/types/graphql';
import { maskCurrency } from 'reinvest-app-common/src/utilities/currency';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

const TRADE_PREFIX = 'Trade ID';

export function formatTradeId(tradeId: string): string {
  return [TRADE_PREFIX, tradeId].join(' ');
}

/** Use with Tailwind's `capitalize` class */
export function formatInvestmentStatus(status: InvestmentStatus) {
  return status.replace('_', ' ').toLowerCase();
}

export function getInvestmentDetails(investment: InvestmentSummary): { label: string; value: string }[] {
  const date = formatDate(investment.createdAt, 'INVESTMENT_SUMMARY', { currentFormat: 'API' });

  return [
    {
      label: 'Date',
      value: date,
    },
    {
      label: 'Amount',
      value: investment.amount.formatted || maskCurrency(investment.amount.value, { addDecimalPoints: true, addDollarSign: true }),
    },
    {
      label: 'Status',
      value: formatInvestmentStatus(investment.status),
    },
    {
      label: 'Bank Account',
      // TO-DO: Replace with actual bank account number once API state is
      // aligned with DEV environment.
      value: '123456123456',
    },
  ];
}
