import { useToggler } from 'hooks/toggler';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useMemo, useState } from 'react';
import { createContextConsumer } from 'reinvest-app-common/src/utilities/contexts';

import { FLOWS } from '../../flows';
import { Context } from './context';
import { ProviderProps, State } from './interfaces';

const MODAL_TITLE = 'Manage Account';

export const useFlowsManager = createContextConsumer(Context, 'FlowsManagerProvider');

export const FlowsManagerProvider = ({ isModalOpen, toggleIsModalOpen, children }: ProviderProps) => {
  const { allAccountsMeta } = useActiveAccount();
  const [currentFlowIdentifier, setCurrentFlowIdentifier] = useState<State['currentFlowIdentifier']>(null);
  const [shouldRefetchAccounts, toggleShouldRefetchAccounts] = useToggler(false);

  const currentFlow: State['currentFlow'] = useMemo(() => {
    if (currentFlowIdentifier) {
      const flow = FLOWS.get(currentFlowIdentifier);

      return flow || null;
    }

    return null;
  }, [currentFlowIdentifier]);

  const onModalOpenChange = (willBeOpen: boolean) => {
    if (!willBeOpen) {
      setCurrentFlowIdentifier(null);
    }

    toggleIsModalOpen(willBeOpen);

    if (shouldRefetchAccounts) {
      allAccountsMeta.refetch();
      toggleShouldRefetchAccounts(false);
    }
  };

  return (
    <Context.Provider
      value={{
        modalTitle: MODAL_TITLE,
        currentFlow,
        currentFlowIdentifier,
        setCurrentFlowIdentifier,
        isModalOpen,
        onModalOpenChange,
        shouldRefetchAccounts,
        toggleShouldRefetchAccounts,
      }}
    >
      {children}
    </Context.Provider>
  );
};
