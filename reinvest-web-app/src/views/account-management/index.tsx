import { ModalWhite } from 'components/ModalWhite';
import { ComponentProps } from 'react';

import { Menu } from './components/Menu';
import { MENU_GROUPS } from './constants/menu';
import { FlowsManagerProvider, useFlowsManager } from './contexts/FlowsManager';

type FlowsManagerProviderProps = ComponentProps<typeof FlowsManagerProvider>;
type PrimitiveProps = Pick<FlowsManagerProviderProps, 'isModalOpen' | 'toggleIsModalOpen'>;
type Props = PrimitiveProps;

const AccountManagement = () => {
  const { modalTitle, isModalOpen, onModalOpenChange, currentFlow } = useFlowsManager();

  if (currentFlow && currentFlow?.selfManagesModal) {
    return <>{currentFlow.flow}</>;
  }

  return (
    <ModalWhite
      title={modalTitle}
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      {currentFlow ? currentFlow.flow : <Menu groups={MENU_GROUPS} />}
    </ModalWhite>
  );
};

export const ViewAccountManagement = (props: Props) => (
  <FlowsManagerProvider {...props}>
    <AccountManagement />
  </FlowsManagerProvider>
);
