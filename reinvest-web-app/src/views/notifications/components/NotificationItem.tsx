import { IconArrowRight } from 'assets/icons/IconArrowRight';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { useNotifications } from 'providers/Notifications';
import { useRef } from 'react';
import { Maybe, Notification } from 'reinvest-app-common/src/types/graphql';
import { formatDateForNotification } from 'reinvest-app-common/src/utilities/dates';
import { boldBracketedText } from 'utils/strings';

import { ACTIONABLE_NOTIFICATIONS, NOTIFICATION_TYPE_FLOWS } from '../constants';
import { useNotificationItemObserver } from '../hooks/notification-item-observer';
import { useFlowsManagerContext } from '../providers/flows-manager';

interface Props {
  areThereMoreNotificationsToFetch: boolean;
  fetchMoreNotifications: () => void;
  isLastItem: boolean;
  notification: Maybe<Notification>;
}

export function NotificationItem({ notification, isLastItem, fetchMoreNotifications, areThereMoreNotificationsToFetch }: Props) {
  const { markAsRead } = useNotifications();
  const { updateCurrentFlow } = useFlowsManagerContext();
  const ref = useRef<HTMLLIElement>(null);

  useNotificationItemObserver({ ref, isLastItem, fetchMoreNotifications, areThereMoreNotificationsToFetch });

  const className = cx('flex items-center gap-16 py-16 -mx-24 md:-mx-44 px-24 md:px-44 border-b border-b-gray-04', {
    'bg-green-frost-01/30 hover:bg-green-frost-01/40': !notification?.isRead,
    'bg-white/30': !!notification?.isRead,
    'cursor-pointer': !notification?.isDismissible,
  });

  const notificationId = notification?.id || '';
  const description = boldBracketedText(notification?.body || '');
  const timestamp = formatDateForNotification(notification?.date || '');
  const isActionable = notification?.notificationType ? ACTIONABLE_NOTIFICATIONS.includes(notification.notificationType) : false;

  async function onClick() {
    const flowIdentifier = notification?.notificationType ? NOTIFICATION_TYPE_FLOWS.get(notification.notificationType) : null;
    const willTriggerFlow = isActionable && flowIdentifier && !notification?.isRead;

    if (!willTriggerFlow && !notification?.isRead) {
      await markAsRead({ notificationId });
    }

    if (willTriggerFlow) {
      updateCurrentFlow({ identifier: flowIdentifier, notification });
    }
  }

  return (
    <li ref={ref}>
      <div
        className={className}
        role="button"
        onClick={onClick}
        tabIndex={0}
        onKeyDown={onClick}
      >
        <div className="flex flex-col gap-12">
          <header className="flex flex-col gap-4">
            <Typography variant="h6">{notification?.header}</Typography>
            <Typography variant="paragraph-emphasized-regular">
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </Typography>
          </header>

          <Typography variant="paragraph">{timestamp}</Typography>
        </div>

        {isActionable && (
          <div>
            <IconArrowRight />
          </div>
        )}
      </div>
    </li>
  );
}
