import { useMemo } from 'react';
import { Maybe, Notification } from 'reinvest-app-common/src/types/graphql';
import { formatDateForNotification } from 'reinvest-app-common/src/utilities/dates';
import { boldBracketedText } from 'utils/strings';

import { ACTIONABLE_NOTIFICATIONS } from '../constants';

interface Params {
  notification: Maybe<Notification>;
}

interface Returns {
  description: string;
  header: string;
  id: string;
  isActionable: boolean;
  timestamp: string;
}

export function useNotificationDetails({ notification }: Params): Returns {
  const id = useMemo(() => notification?.id ?? '', [notification]);
  const header = useMemo(() => notification?.header ?? '', [notification]);
  const description = useMemo(() => boldBracketedText(notification?.body || ''), [notification]);
  const timestamp = useMemo(() => formatDateForNotification(notification?.date || ''), [notification]);
  const isActionable = useMemo(
    () => (notification?.notificationType ? ACTIONABLE_NOTIFICATIONS.includes(notification.notificationType) : false),
    [notification],
  );

  return { id, header, description, timestamp, isActionable };
}
