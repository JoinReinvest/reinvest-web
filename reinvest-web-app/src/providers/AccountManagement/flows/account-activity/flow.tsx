import { ModalWhite } from 'components/ModalWhite';
import { useAccountManagement } from 'providers/AccountManagement';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './interfaces';
import { AccountActivityProvider } from './providers/AccountActivity';
import { STEPS } from './steps';

const [useFlow, FlowAccountActivitiesProvider] = createFormFlow<FlowFields>({ steps: STEPS });

function InnerFlowAccountActivities() {
  const { isModalOpen, onModalOpenChange, modalTitle } = useAccountManagement();
  const { CurrentStepView } = useFlow();

  return (
    <ModalWhite
      title={modalTitle}
      isOpen={isModalOpen}
      onOpenChange={onModalOpenChange}
    >
      <CurrentStepView />
    </ModalWhite>
  );
}

export const FlowAccountActivity = () => (
  <AccountActivityProvider>
    <FlowAccountActivitiesProvider
      initialStoreFields={{}}
      isResumable
    >
      <InnerFlowAccountActivities />
    </FlowAccountActivitiesProvider>
  </AccountActivityProvider>
);
