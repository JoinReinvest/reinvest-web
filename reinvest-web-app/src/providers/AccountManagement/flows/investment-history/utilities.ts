import { InvestmentStatus, InvestmentSummary } from 'reinvest-app-common/src/types/graphql';
import { maskCurrency } from 'reinvest-app-common/src/utilities/currency';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

const TRADE_PREFIX = 'Trade ID';

export function formatTradeId(tradeId: string): string {
  return [TRADE_PREFIX, tradeId].join(' ');
}

export function formatInvestmentStatus(status: InvestmentStatus) {
  switch (status) {
    case InvestmentStatus.Failed:
      return 'Failed';
    case InvestmentStatus.Finished:
      return 'Finished';
    case InvestmentStatus.Funded:
      return 'Funded';
    case InvestmentStatus.InProgress:
      return 'In Progress';
    case InvestmentStatus.WaitingForFeesApproval:
      return 'Waiting for Fees Approval';
    case InvestmentStatus.WaitingForInvestmentStart:
      return 'Waiting for Investment Start';
    case InvestmentStatus.WaitingForSubscriptionAgreement:
      return 'Waiting for Subscription Agreement';
    default:
      return '';
  }
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
      value: investment?.bankAccount?.accountNumber ?? '',
    },
  ];
}
