import { ModalWhite } from 'components/ModalWhite';
import { ModalWhiteWatermarkSide } from 'components/ModalWhiteWatermarkSide';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { useFlowsManager } from '../../contexts/FlowsManager';
import { FlowFields } from './interfaces';
import { STEPS } from './steps';

const [useFlow, FlowInvestmentHistoryProvider] = createFormFlow<FlowFields>({ steps: STEPS });

function InnerFlowInvestmentHistory() {
  const { isModalOpen, onModalOpenChange, modalTitle } = useFlowsManager();
  const { CurrentStepView, meta } = useFlow();

  if (meta.isLastStep) {
    return (
      <ModalWhiteWatermarkSide
        isModalOpen={isModalOpen}
        onModalOpenChange={onModalOpenChange}
        hideSeparator
      >
        <CurrentStepView />
      </ModalWhiteWatermarkSide>
    );
  }

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

export const FlowInvestmentHistory = () => (
  <FlowInvestmentHistoryProvider
    initialStoreFields={{}}
    isResumable
  >
    <InnerFlowInvestmentHistory />
  </FlowInvestmentHistoryProvider>
);
