import { ErrorResponse } from 'reinvest-app-common/src/services/queries/interfaces';
import { AccountConfiguration } from 'reinvest-app-common/src/types/graphql';

import { useAutomaticDividends } from './hooks/automatic-dividends';

export interface State extends AutomaticDividendsPrimitives {
  activeAccountConfiguration: AccountConfiguration | null;
}

export interface ConfigurationMeta {
  error: ErrorResponse | null;
  isLoading: boolean;
  isSuccess: boolean;
  reset: () => void;
}

type AutomaticDividendsPrimitives = ReturnType<typeof useAutomaticDividends>;
