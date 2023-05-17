import { IconArrowRight } from 'assets/icons/IconArrowRight';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { forwardRef } from 'react';
import { formatDateForNotification } from 'reinvest-app-common/src/utilities/dates';
import { highlightNotificationDescription } from 'reinvest-app-common/src/utilities/notifications';

import { Notification } from '../interfaces';

interface Props {
  notification: Notification;
}

export const NotificationItem = forwardRef<HTMLLIElement, Props>(({ notification }, ref) => {
  const className = cx('flex items-center gap-16 py-16 -mx-24 md:-mx-44 px-24 md:px-44 border-b border-b-gray-04', {
    'bg-green-frost-01/30 hover:bg-green-frost-01/40': !notification.hasBeenRead,
    'bg-white/30': !!notification.hasBeenRead,
  });

  const description = highlightNotificationDescription(notification.description);
  const timestamp = formatDateForNotification(notification.date);

  return (
    <li ref={ref}>
      <div
        role="button"
        className={className}
      >
        <div className="flex flex-col gap-12">
          <header className="flex flex-col gap-4">
            <Typography variant="h6">{notification.title}</Typography>
            <Typography variant="paragraph-emphasized-regular">
              <span dangerouslySetInnerHTML={{ __html: description }} />
            </Typography>
          </header>

          <Typography variant="paragraph">{timestamp}</Typography>
        </div>

        {!!notification.isActionable && (
          <div>
            <IconArrowRight />
          </div>
        )}
      </div>
    </li>
  );
});
