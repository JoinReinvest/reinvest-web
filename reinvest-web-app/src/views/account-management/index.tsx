import { ModalWhite } from 'components/ModalWhite';
import { ComponentProps } from 'react';
import { AccountType } from 'reinvest-app-common/src/types/graphql';

import { useActiveAccount } from '../../providers/ActiveAccountProvider';
import { Menu } from './components/Menu';
import { BENEFICIARY_MENU_GROUPS, MENU_GROUPS } from './constants/menu';
import { FlowsManagerProvider, useFlowsManager } from './contexts/FlowsManager';

type FlowsManagerProviderProps = ComponentProps<typeof FlowsManagerProvider>;
type PrimitiveProps = Pick<FlowsManagerProviderProps, 'isModalOpen' | 'toggleIsModalOpen'>;
type Props = PrimitiveProps;

const AccountManagement = () => {
  const { modalTitle, isModalOpen, onModalOpenChange, currentFlow } = useFlowsManager();
  const { activeAccount } = useActiveAccount();

  if (currentFlow && currentFlow?.selfManagesModal) {
    return <>{currentFlow.flow}</>;
  }

  const menuGroups = activeAccount?.type === AccountType.Beneficiary ? BENEFICIARY_MENU_GROUPS : MENU_GROUPS;

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
