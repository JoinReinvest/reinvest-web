import { IconArrowRight } from 'assets/icons/IconArrowRight';
import cx from 'classnames';
import { Typography } from 'components/Typography';
import { forwardRef } from 'react';
import { Maybe, Notification } from 'reinvest-app-common/src/types/graphql';
import { formatDateForNotification } from 'reinvest-app-common/src/utilities/dates';
import { boldBracketedText } from 'utils/strings';

import { NOTIFICATION_TYPE_FLOWS } from '../constants';
import { useFlowsManagerContext } from '../providers/flows-manager';

interface Props {
  notification: Maybe<Notification>;
}

export const NotificationItem = forwardRef<HTMLLIElement, Props>(({ notification }, ref) => {
  const { updateCurrentFlow } = useFlowsManagerContext();

  const className = cx('flex items-center gap-16 py-16 -mx-24 md:-mx-44 px-24 md:px-44 border-b border-b-gray-04', {
    'bg-green-frost-01/30 hover:bg-green-frost-01/40': !notification?.isRead,
    'bg-white/30': !!notification?.isRead,
    'cursor-pointer': !notification?.isDismissible,
  });

  const description = boldBracketedText(notification?.body || '');
  const timestamp = formatDateForNotification(notification?.date || '');

  function onClick() {
    const flowIdentifier = notification?.notificationType ? NOTIFICATION_TYPE_FLOWS.get(notification.notificationType) : null;

    if (notification?.onObject && flowIdentifier) {
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

        {!notification?.isDismissible && (
          <div>
            <IconArrowRight />
          </div>
        )}
      </div>
    </li>
  );
});
