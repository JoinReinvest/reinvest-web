import { ModalWhite } from 'components/ModalWhite';
import { ModalWhiteWatermarkSide } from 'components/ModalWhiteWatermarkSide';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useNotifications } from 'providers/Notifications';
import { ModalProps } from 'types/modal';

import { Notifications } from './components/Notifications';
import { FlowsManagerProvider, useFlowsManagerContext } from './providers/flows-manager';
import { ModalManagerProvider, useModalManagerContext } from './providers/modal-manager';

const TITLE = 'Notifications';

export function InnerViewNotifications() {
  const { activeAccount } = useActiveAccount();
  const { currentFlowIdentifier, currentFlow, updateCurrentFlow } = useFlowsManagerContext();
  const { modalTitle, updateModalTitle, isModalOpen, onModalOpenChange, showModalWithWatermark, showProfilePicture } = useModalManagerContext();
  const { markUnreadNotificationsAsRead } = useNotifications();

  const onOpenChange = async (state: boolean) => {
    if (!state) {
      updateCurrentFlow({ identifier: null });
      updateModalTitle(null);
    }

    onModalOpenChange(state);
    await markUnreadNotificationsAsRead();
  };

  if (showModalWithWatermark) {
    return (
      <ModalWhiteWatermarkSide
        title={modalTitle}
        isOpen={isModalOpen}
        onOpenChange={onOpenChange}
      >
        {currentFlowIdentifier ? currentFlow?.Component : <Notifications />}
      </ModalWhiteWatermarkSide>
    );
  }

  return (
    <ModalWhite
      title={modalTitle}
      activeAccount={activeAccount}
      isOpen={isModalOpen}
      onOpenChange={onOpenChange}
      addPaddingBottom={false}
      hideAvatarNextToTitle={!showProfilePicture}
    >
      {currentFlowIdentifier ? currentFlow?.Component : <Notifications />}
    </ModalWhite>
  );
}

type Props = ModalProps;

export const ViewNotifications = (props: Props) => (
  <ModalManagerProvider
    {...props}
    initialModalTitle={TITLE}
  >
    <FlowsManagerProvider>
      <InnerViewNotifications />
    </FlowsManagerProvider>
  </ModalManagerProvider>
);
