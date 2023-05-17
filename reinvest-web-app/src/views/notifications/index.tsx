import { ModalWhite } from 'components/ModalWhite';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { ModalProps } from 'types/modal';

import { EmptyListMessage } from './components/EmptyListMessage';
import { NotificationsList } from './components/NotificationList';
import { SAMPLE_NOTIFICATIONS } from './constants';

type Props = ModalProps;

const TITLE = 'Notifications';

export function ViewNotifications({ isModalOpen, onModalOpenChange }: Props) {
  const { activeAccount } = useActiveAccount();
  const hasItems = SAMPLE_NOTIFICATIONS.length > 0;

  return (
    <ModalWhite
      title={TITLE}
      activeAccount={activeAccount}
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
      addPaddingBottom={false}
      hideAvatarNextToTitle
    >
      {hasItems ? <NotificationsList notifications={SAMPLE_NOTIFICATIONS} /> : <EmptyListMessage />}
    </ModalWhite>
  );
}
