import { Maybe, Notification } from 'reinvest-app-common/src/types/graphql';

import { NotificationItem } from './NotificationItem';

interface Props {
  notifications: Maybe<Notification>[];
}

export const NotificationsList = ({ notifications }: Props) => (
  <ul className="flex flex-col">
    {notifications.map(notification => (
      <NotificationItem
        key={notification?.id}
        notification={notification}
      />
    ))}
  </ul>
);
