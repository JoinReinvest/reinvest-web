import { AccountActivity, Maybe } from 'reinvest-app-common/src/types/graphql';
import { InfiniteQueryMeta } from 'types/queries';

export interface State {
  accountActivities: Maybe<AccountActivity>[];
  accountActivityMeta: InfiniteQueryMeta;
}
