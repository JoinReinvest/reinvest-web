import { AccountActivity, Maybe } from 'reinvest-app-common/src/types/graphql';

export interface FlowFields {
  _accauntActivities?: Maybe<AccountActivity>[];
  _selectedAccountId?: string;
}
