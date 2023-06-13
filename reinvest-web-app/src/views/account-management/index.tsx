import { ModalWhite } from 'components/ModalWhite';
import { ComponentProps } from 'react';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { useActiveAccount } from '../../providers/ActiveAccountProvider';
import { Menu } from './components/Menu';
import { BENEFICIARY_MENU_GROUPS, MENU_GROUPS } from './constants/menu';
import { FlowsManagerProvider, useFlowsManager } from './contexts/flows-manager';

type FlowsManagerProviderProps = ComponentProps<typeof FlowsManagerProvider>;
type PrimitiveProps = Pick<FlowsManagerProviderProps, 'isModalOpen' | 'toggleIsModalOpen'>;
type Props = PrimitiveProps;

const MODAL_TITLE = 'Manage Account';

const AccountManagement = () => {
  const { isModalOpen, toggleIsModalOpen, currentFlow, setCurrentFlowIdentifier } = useFlowsManager();
  const { activeAccount } = useActiveAccount();

  const onOpenChange = (willBeOpen: boolean) => {
    if (!willBeOpen) {
      setCurrentFlowIdentifier(null);
    }

    toggleIsModalOpen(willBeOpen);
  };

  const menuGroups = activeAccount?.type === AccountType.Beneficiary ? BENEFICIARY_MENU_GROUPS : MENU_GROUPS;

  return (
    <ModalWhite
      title={MODAL_TITLE}
      isOpen={isModalOpen}
      onOpenChange={onOpenChange}
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
