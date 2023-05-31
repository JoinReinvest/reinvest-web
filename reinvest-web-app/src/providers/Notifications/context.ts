import { DEFAULT_INFINITE_QUERY_META, DEFAULT_MUTATION_META } from 'constants/queries';
import { createContext } from 'react';

import { State } from './interfaces';

export const Context = createContext<State>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  markAsRead: () => new Promise(() => {}),
  markAsReadMeta: DEFAULT_MUTATION_META,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  markUnreadNotificationsAsRead: () => new Promise(() => {}),
  notifications: [],
  unreadNotifications: [],
  notificationStats: null,
  notificationsMeta: DEFAULT_INFINITE_QUERY_META,
});
