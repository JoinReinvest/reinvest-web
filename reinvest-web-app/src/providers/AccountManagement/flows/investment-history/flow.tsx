import { ModalWhite } from 'components/ModalWhite';
import { ModalWhiteWatermarkSide } from 'components/ModalWhiteWatermarkSide';
import { useAccountManagement } from 'providers/AccountManagement';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowFields } from './interfaces';
import { InvestmentHistoryProvider } from './providers/InvestmentHistory';
import { STEPS } from './steps';

const [useFlow, FlowInvestmentHistoryProvider] = createFormFlow<FlowFields>({ steps: STEPS });

function InnerFlowInvestmentHistory() {
  const { isModalOpen, onModalOpenChange, modalTitle } = useAccountManagement();
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

export const FlowInvestmentHistory = () => {
  return (
    <InvestmentHistoryProvider>
      <FlowInvestmentHistoryProvider initialStoreFields={{}}>
        <InnerFlowInvestmentHistory />
      </FlowInvestmentHistoryProvider>
    </InvestmentHistoryProvider>
  );
};
