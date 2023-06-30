import { IconSpinner } from 'assets/icons/IconSpinner';
import { useNotifications } from 'providers/Notifications';

import { EmptyListMessage } from './EmptyListMessage';
import { NotificationsList } from './NotificationList';

export function Notifications() {
  const { notifications, notificationsMeta } = useNotifications();
  const areThereMoreNotificationsToFetch = !!notificationsMeta?.hasNextPage;
  const hasItems = notifications.length > 0;

  function fetchMoreNotifications() {
    if (notificationsMeta?.hasNextPage) {
      notificationsMeta.fetchNextPage();
    }
  }

  if (notificationsMeta?.isLoading) {
    return (
      <div className="grid h-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  }

  if (!hasItems) {
    return <EmptyListMessage />;
  }

  return (
    <NotificationsList
      notifications={notifications}
      fetchMoreNotifications={fetchMoreNotifications}
      areThereMoreNotificationsToFetch={areThereMoreNotificationsToFetch}
    />
  );
}
