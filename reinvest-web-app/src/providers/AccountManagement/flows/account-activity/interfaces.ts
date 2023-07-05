import { AccountActivity, Maybe } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  _accountActivities?: Maybe<AccountActivity>[];
  _selectedAccountId?: number;
}
