import { Maybe, Notification } from 'reinvest-app-common/src/types/graphql';

import { EmptyListMessage } from './EmptyListMessage';
import { NotificationsList } from './NotificationList';

interface Props {
  notifications: Maybe<Notification>[];
}

export function Notifications({ notifications }: Props) {
  const hasItems = notifications.length > 0;

  return <>{hasItems ? <NotificationsList notifications={notifications} /> : <EmptyListMessage />}</>;
}
