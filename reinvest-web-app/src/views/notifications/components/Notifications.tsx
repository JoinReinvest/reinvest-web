import { IconSpinner } from 'assets/icons/IconSpinner';
import { useActiveAccountNotifications } from 'providers/ActiveAccountNotifications';

import { EmptyListMessage } from './EmptyListMessage';
import { NotificationsList } from './NotificationList';

export function Notifications() {
  const { notifications, notificationsMeta } = useActiveAccountNotifications();
  const hasItems = notifications.length > 0;

  if (notificationsMeta?.isLoading) {
    return (
      <div className="grid h-full place-items-center">
        <IconSpinner color="black" />
      </div>
    );
  }

  return <>{hasItems ? <NotificationsList notifications={notifications} /> : <EmptyListMessage />}</>;
}
