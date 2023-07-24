import { DEFAULT_MUTATION_META, DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  activeAccountConfiguration: null,
  activeAccountConfigurationMeta: DEFAULT_QUERY_META,
  hasAutomaticDividendsActive: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateHasAutomaticDividendsActive: async () => {},
  automaticDividendsMeta: DEFAULT_MUTATION_META,
});
