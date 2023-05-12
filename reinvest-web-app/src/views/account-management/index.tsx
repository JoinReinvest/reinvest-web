import { ModalWhite } from 'components/ModalWhite';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { ComponentProps } from 'react';

import { Menu } from './components/Menu';
import { MENU_GROUPS } from './constants/menu';
import { FlowsManagerProvider, useFlowsManager } from './contexts/flows-manager';

type FlowsManagerProviderProps = ComponentProps<typeof FlowsManagerProvider>;
type PrimitiveProps = Pick<FlowsManagerProviderProps, 'isModalOpen' | 'toggleIsModalOpen'>;
type Props = PrimitiveProps;

const MODAL_TITLE = 'Manage Account';

const AccountManagement = () => {
  const { activeAccount } = useActiveAccount();
  const { isModalOpen, toggleIsModalOpen, currentFlow, setCurrentFlowIdentifier } = useFlowsManager();

  const onOpenChange = (willBeOpen: boolean) => {
    if (!willBeOpen) {
      setCurrentFlowIdentifier(null);
    }

    toggleIsModalOpen(willBeOpen);
  };

  return (
    <ModalWhite
      title={MODAL_TITLE}
      isOpen={isModalOpen}
      onOpenChange={onOpenChange}
      activeAccount={activeAccount}
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
