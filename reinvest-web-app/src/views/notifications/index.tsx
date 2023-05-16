import { ModalWhite } from 'components/ModalWhite';
import { ModalWhiteWatermarkSide } from 'components/ModalWhiteWatermarkSide';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { ModalProps } from 'types/modal';

import { Notifications } from './components/Notifications';
import { SAMPLE_NOTIFICATIONS } from './constants';
import { FlowsManagerProvider, useFlowsManagerContext } from './providers/flows-manager';
import { ModalManagerProvider, useModalManagerContext } from './providers/modal-manager';

const TITLE = 'Notifications';

export function InnerViewNotifications() {
  const { activeAccount } = useActiveAccount();
  const { currentFlowIdentifier, currentFlow, updateCurrentFlow } = useFlowsManagerContext();
  const { modalTitle, updateModalTitle, isModalOpen, onModalOpenChange, showModalWithWatermark } = useModalManagerContext();

  const onOpenChange = (state: boolean) => {
    if (!state) {
      updateCurrentFlow({ identifier: null });
      updateModalTitle(null);
    }

    onModalOpenChange(state);
  };

  if (showModalWithWatermark) {
    return (
      <ModalWhiteWatermarkSide
        title={modalTitle}
        isOpen={isModalOpen}
        onOpenChange={onOpenChange}
      >
        {currentFlowIdentifier ? currentFlow?.Component : <Notifications notifications={SAMPLE_NOTIFICATIONS} />}
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
      hideAvatarNextToTitle
    >
      {currentFlowIdentifier ? currentFlow?.Component : <Notifications notifications={SAMPLE_NOTIFICATIONS} />}
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
