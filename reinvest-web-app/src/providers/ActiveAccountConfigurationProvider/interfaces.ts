import { AccountConfiguration } from 'reinvest-app-common/src/types/graphql';
import { QueryMeta } from 'types/queries';

import { useAutomaticDividends } from './hooks/automatic-dividends';

export interface State extends AutomaticDividendsPrimitives {
  activeAccountConfiguration: AccountConfiguration | null;
  activeAccountConfigurationMeta: QueryMeta;
}

type AutomaticDividendsPrimitives = ReturnType<typeof useAutomaticDividends>;
