import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { Context } from './context';
import { useMarkAsRead } from './hooks/mark-as-read';
import { useNotificationsStats } from './hooks/notifications-stats';

export const useNotifications = createContextConsumer(Context, 'NotificationsProvider');

export const NotificationsProvider = ({ children }: PropsWithChildren) => {
  const notificationsResult = useNotificationsStats();
  const markAsReadResult = useMarkAsRead();

  return <Context.Provider value={{ ...notificationsResult, ...markAsReadResult }}>{children}</Context.Provider>;
};
