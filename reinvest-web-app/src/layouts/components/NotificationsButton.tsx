import { IconBell } from 'assets/icons/IconBell';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { useActiveAccountNotifications } from 'providers/ActiveAccountNotifications';

import { useModalNotificationsContext } from '../contexts/modal-notifications';

export function NotificationsButton() {
  const { notificationStats } = useActiveAccountNotifications();
  const { toggleIsModalNotificationsOpen } = useModalNotificationsContext();

  const hasUnreadNotifications = !!notificationStats?.unreadCount;
  const counterClassName = cx({ 'absolute -top-4 right-0': hasUnreadNotifications, hidden: !hasUnreadNotifications });

  return (
    <button
      onClick={toggleIsModalNotificationsOpen}
      className="relative"
    >
      <IconBell className="h-28 w-28 lg:h-44 lg:w-44" />

      <div className={counterClassName}>
        <div className="grid place-items-center rounded-full bg-tertiary-error-02 px-6 py-1">
          <Typography
            variant="notiications-counter"
            className="text-center text-white"
          >
            {notificationStats?.unreadCount}
          </Typography>
        </div>
      </div>
    </button>
  );
}
