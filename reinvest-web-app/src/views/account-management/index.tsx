import { ModalWhite } from 'components/ModalWhite';
import { ComponentProps } from 'react';

import { Menu } from './components/Menu';
import { FlowsManagerProvider, useFlowsManager } from './contexts/FlowsManager';
import { useMenuGroups } from './hooks/useMenuGroups';

type FlowsManagerProviderProps = ComponentProps<typeof FlowsManagerProvider>;
type PrimitiveProps = Pick<FlowsManagerProviderProps, 'isModalOpen' | 'toggleIsModalOpen'>;
type Props = PrimitiveProps;

const AccountManagement = () => {
  const { modalTitle, isModalOpen, onModalOpenChange, currentFlow } = useFlowsManager();
  const { menuGroups } = useMenuGroups();

  if (currentFlow && currentFlow?.selfManagesModal) {
    return <>{currentFlow.flow}</>;
  }

  return (
    <ModalWhite
      title={modalTitle}
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      {currentFlow ? currentFlow.flow : <Menu groups={menuGroups} />}
    </ModalWhite>
  );
};

export const ViewAccountManagement = (props: Props) => (
  <FlowsManagerProvider {...props}>
    <AccountManagement />
  </FlowsManagerProvider>
);
