import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useMarkAsRead } from './hooks/mark-as-read';
import { useNotifications } from './hooks/notifications';

export const useActiveAccountNotifications = createContextConsumer(Context, 'ActiveAccountNotificationsProvider');

export const ActiveAccountNotificationsProvider = ({ children }: PropsWithChildren) => {
  const notificationsResult = useNotifications();
  const markAsReadResult = useMarkAsRead();

  return <Context.Provider value={{ ...notificationsResult, ...markAsReadResult }}>{children}</Context.Provider>;
};
