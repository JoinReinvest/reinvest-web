import { DEFAULT_INFINITE_QUERY_META, DEFAULT_MUTATION_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  investmentsList: [],
  investmentsListMeta: DEFAULT_INFINITE_QUERY_META,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  cancelInvestment: () => Promise.resolve(false),
  cancelInvestmentMeta: DEFAULT_MUTATION_META,
});
