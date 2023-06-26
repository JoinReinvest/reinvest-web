import { DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  portfolio: null,
  portfolioMeta: DEFAULT_QUERY_META,
  properties: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  getProperty: () => null,
});
