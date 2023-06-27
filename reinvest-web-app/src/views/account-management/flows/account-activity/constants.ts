import { AccountActivity, InvestmentStatus } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

export const INVESTMENT_STATUS_THAT_ALLOW_CANCELLATION = [InvestmentStatus.InProgress];

// TO-DO: Deprecate once `Query.listInvestments` returns
// non-mocked investments - this is needed for viewing the summary
// of a particular investment.
export const ACCOUNT_ACTIVITY_SUMMARY: AccountActivity = {
  __typename: 'AccountActivity',
  activityName: 'Profile created',
  date: formatDate(new Date(), 'API'),
};
