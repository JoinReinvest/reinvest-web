import { useCallback } from 'react';
import { useMarkNotificationAsRead } from 'reinvest-app-common/src/services/queries/markNotificationAsRead';
import { Maybe, Notification } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { MutationMeta } from 'types/queries';

interface Params {
  unreadNotifications: Maybe<Notification>[];
}

interface Return {
  markAsRead: (params: { notificationId: string }) => Promise<boolean>;
  markAsReadMeta: MutationMeta;
  markUnreadNotificationsAsRead: () => Promise<void>;
}

export function useMarkAsRead({ unreadNotifications }: Params): Return {
  const { mutateAsync: markAsRead, ...markAsReadMeta } = useMarkNotificationAsRead(getApiClient);

  const markUnreadNotificationsAsRead = useCallback(async () => {
    const promises = unreadNotifications.map(notification => markAsRead({ notificationId: notification?.id || '' }));

    await Promise.all(promises);
  }, [unreadNotifications, markAsRead]);

  return { markAsRead, markAsReadMeta, markUnreadNotificationsAsRead };
}
