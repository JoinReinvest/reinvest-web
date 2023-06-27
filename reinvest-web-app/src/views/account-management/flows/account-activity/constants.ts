import { AccountActivity } from 'reinvest-app-common/src/types/graphql';
import { formatDate } from 'reinvest-app-common/src/utilities/dates';

// TO-DO: Deprecate once `Query.getAccountActivity` returns
// non-mocked activities
export const ACCOUNT_ACTIVITY_SUMMARY: AccountActivity = {
  __typename: 'AccountActivity',
  activityName: 'Profile created',
  date: formatDate(new Date(), 'API'),
};
