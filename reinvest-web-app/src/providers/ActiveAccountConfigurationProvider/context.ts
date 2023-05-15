import { createContext } from 'react';

import { ConfigurationMeta, State } from './interfaces';

const DEFAULT_CONFIGURATION_META: ConfigurationMeta = {
  error: null,
  isLoading: false,
  isSuccess: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  reset: () => {},
};

export const Context = createContext<State>({
  activeAccountConfiguration: null,
  hasAutomaticDividendsActive: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateHasAutomaticDividendsActive: async () => {},
  automaticDividendsMeta: DEFAULT_CONFIGURATION_META,
});
