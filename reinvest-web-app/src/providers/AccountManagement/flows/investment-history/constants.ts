import { BankAccountStatus, InvestmentStatus, InvestmentSummary } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

export const INVESTMENT_STATUS_THAT_ALLOW_CANCELLATION = [InvestmentStatus.InProgress];

// TO-DO: Deprecate once `Query.listInvestments` returns
// non-mocked investments - this is needed for viewing the summary
// of a particular investment.
export const INVESTMENT_SUMMARY: InvestmentSummary = {
  __typename: 'InvestmentSummary',
  id: '1',
  tradeId: '47584',
  createdAt: formatDate(new Date(), 'API'),
  status: InvestmentStatus.InProgress,
  amount: {
    value: 1000,
    formatted: '-$1000.00',
  },
  investmentFees: {
    value: 0,
    formatted: '$0.00',
  },
  bankAccount: {
    accountNumber: '12348274172',
    accountType: 'Checking',
    bankName: 'Bank of America',
    bankAccountStatus: BankAccountStatus.Active,
  },
};
