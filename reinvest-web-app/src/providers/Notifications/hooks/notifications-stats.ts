import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo } from 'react';
import { useGetNotifications } from 'reinvest-app-common/src/services/queries/getNotifications';
import { Maybe, Notification, NotificationFilter, NotificationsStats } from 'reinvest-app-common/src/types/graphql';
import { getApiClient } from 'services/getApiClient';
import { InfiniteQueryMeta } from 'types/queries';

interface Return {
  notificationStats: Pick<NotificationsStats, 'totalCount' | 'unreadCount'> | null;
  notifications: Maybe<Notification>[];
  notificationsMeta: InfiniteQueryMeta;
}

export function useNotificationsStats(): Return {
  const { activeAccount } = useActiveAccount();

  const { data, ...notificationsMeta } = useGetNotifications(getApiClient, {
    accountId: activeAccount?.id || '',
    filter: NotificationFilter.All,
    config: { enabled: !!activeAccount?.id },
  });

  const notificationStats = useMemo<Return['notificationStats']>(() => {
    const lastPage = data?.pages.slice(-1)?.at(0);

    if (lastPage) {
      return { totalCount: lastPage.totalCount, unreadCount: lastPage.unreadCount };
    }

    return null;
  }, [data]);

  const notifications = useMemo(() => data?.pages.map(page => page.getNotifications).flat() || [], [data]);

  return { notificationStats, notifications, notificationsMeta };
}
