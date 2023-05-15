import { IconBell } from 'assets/icons/IconBell';

import { useModalNotificationsContext } from '../contexts/modal-notifications';

export function NotificationsButton() {
  const { toggleIsModalNotificationsOpen } = useModalNotificationsContext();

  return (
    <button onClick={toggleIsModalNotificationsOpen}>
      <IconBell className="h-28 w-28 lg:h-44 lg:w-44" />
    </button>
  );
}
