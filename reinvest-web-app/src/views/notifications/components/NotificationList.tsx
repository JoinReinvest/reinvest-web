import { Maybe, Notification } from 'reinvest-app-common/src/types/graphql';

import { NotificationItem } from './NotificationItem';

interface Props {
  areThereMoreNotificationsToFetch: boolean;
  fetchMoreNotifications: () => void;
  notifications: Maybe<Notification>[];
}

export const NotificationsList = ({ notifications, fetchMoreNotifications, areThereMoreNotificationsToFetch }: Props) => (
  <ul className="flex flex-col">
    {notifications.map((notification, index) => (
      <NotificationItem
        key={notification?.id}
        notification={notification}
        isLastItem={index === notifications.length - 1}
        fetchMoreNotifications={fetchMoreNotifications}
        areThereMoreNotificationsToFetch={areThereMoreNotificationsToFetch}
      />
    ))}
  </ul>
);
