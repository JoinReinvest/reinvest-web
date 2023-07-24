import { DEFAULT_INFINITE_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  accountActivities: [],
  accountActivityMeta: DEFAULT_INFINITE_QUERY_META,
});
