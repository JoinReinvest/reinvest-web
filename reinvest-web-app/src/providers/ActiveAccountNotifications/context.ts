import { DEFAULT_MUTATION_META, DEFAULT_QUERY_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  notifications: [],
  notificationsMeta: DEFAULT_QUERY_META,
  markAsRead: async () => false,
  markAsReadMeta: DEFAULT_MUTATION_META,
});
