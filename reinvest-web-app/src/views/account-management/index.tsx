import { ModalWhite } from 'components/ModalWhite';
import { useAccountManagement } from 'providers/AccountManagement';

import { Menu } from './components/Menu';
import { useMenuGroups } from './hooks/useMenuGroups';

export function ViewAccountManagement() {
  const { modalTitle, isModalOpen, onModalOpenChange, currentFlow } = useAccountManagement();
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
}
