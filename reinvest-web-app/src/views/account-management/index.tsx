import { ModalWhite } from 'components/ModalWhite';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { ComponentProps } from 'react';

import { Menu } from './components/Menu';
import { MENU_GROUPS } from './constants/menu';
import { FlowsManagerProvider, useFlowsManager } from './contexts/flows-manager';

type FlowsManagerProviderProps = ComponentProps<typeof FlowsManagerProvider>;
type PrimitiveProps = Pick<FlowsManagerProviderProps, 'isModalOpen' | 'toggleIsModalOpen'>;
type Props = PrimitiveProps;

const AccountManagement = () => {
  const { activeAccount } = useActiveAccount();
  const { isModalOpen, toggleIsModalOpen } = useFlowsManager();

  return (
    <ModalWhite
      title="Manage Account"
      isOpen={isModalOpen}
      onOpenChange={toggleIsModalOpen}
      activeAccount={activeAccount}
    >
      <Menu groups={MENU_GROUPS} />
    </ModalWhite>
  );
};

export const ViewAccountManagement = (props: Props) => (
  <FlowsManagerProvider {...props}>
    <AccountManagement />
  </FlowsManagerProvider>
);
