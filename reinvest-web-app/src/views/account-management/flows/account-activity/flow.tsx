import { ModalWhite } from 'components/ModalWhite';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { useFlowsManager } from '../../contexts/FlowsManager';
import { FlowFields } from './interfaces';
import { AccountActivityProvider } from './providers/AccountActivity';
import { STEPS } from './steps';

const [useFlow, FlowInvestmentHistoryProvider] = createFormFlow<FlowFields>({ steps: STEPS });

function InnerFlowInvestmentHistory() {
  const { isModalOpen, onModalOpenChange, modalTitle } = useFlowsManager();
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
    <FlowInvestmentHistoryProvider
      initialStoreFields={{}}
      isResumable
    >
      <InnerFlowInvestmentHistory />
    </FlowInvestmentHistoryProvider>
  </AccountActivityProvider>
);
