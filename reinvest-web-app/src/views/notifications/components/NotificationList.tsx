import { Notification } from '../interfaces';
import { NotificationItem } from './NotificationItem';

interface Props {
  notifications: Notification[];
}

export const NotificationsList = ({ notifications }: Props) => (
  <ul className="flex flex-col">
    {notifications.map(notification => (
      <NotificationItem
        key={notification.id}
        notification={notification}
      />
    ))}
  </ul>
);
