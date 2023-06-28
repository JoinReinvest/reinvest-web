import { PropsWithChildren } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';
import { ViewAccountManagement } from 'views/account-management';

import { Context } from './context';
import { useCurrentFlow } from './hooks/current-flow';
import { useModal } from './hooks/modal';
import { useQueryFlow } from './hooks/query-flow';

const PROVIDER_NAME = 'AccountManagementProvider';
export const useAccountManagement = createContextConsumer(Context, PROVIDER_NAME);

const MODAL_TITLE = 'Manage Account';

export function AccountManagementProvider({ children }: PropsWithChildren) {
  const { currentFlow, currentFlowIdentifier, setCurrentFlowIdentifier } = useCurrentFlow();
  const { isModalOpen, toggleShouldRefetchAccounts, onModalOpenChange } = useModal({ setCurrentFlowIdentifier });
  const { queryFlowIdentifier, deprecateQueryFlow } = useQueryFlow({ setCurrentFlowIdentifier, onModalOpenChange });

  return (
    <Context.Provider
      value={{
        modalTitle: MODAL_TITLE,
        isModalOpen,
        onModalOpenChange,
        toggleShouldRefetchAccounts,
        currentFlow,
        currentFlowIdentifier,
        setCurrentFlowIdentifier,
        queryFlowIdentifier,
        deprecateQueryFlow,
      }}
    >
      <>
        {children}

        <ViewAccountManagement />
      </>
    </Context.Provider>
  );
}
