import { ModalWhite } from 'components/ModalWhite';
import { ModalWhiteWatermarkSide } from 'components/ModalWhiteWatermarkSide';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';
import { useFlowsManager } from 'views/account-management/contexts/FlowsManager';

import { FlowStepIdentifiers } from './interfaces';
import { FundsWithdrawalManagerProvider } from './providers/FundsWithdrawal';
import { STEPS } from './steps';

const [useFlow, FlowProvider] = createFormFlow({ steps: STEPS });

function InnerFlow() {
  const { isModalOpen, onModalOpenChange, modalTitle } = useFlowsManager();
  const { CurrentStepView, meta } = useFlow();

  if (meta.currentStepIdentifier === FlowStepIdentifiers.CONFIRMATION) {
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
      className="modal-withdraw-funds"
    >
      <CurrentStepView />
    </ModalWhite>
  );
}

export const FlowFundsWithdrawal = () => (
  <FundsWithdrawalManagerProvider>
    <FlowProvider initialStoreFields={{}}>
      <InnerFlow />
    </FlowProvider>
  </FundsWithdrawalManagerProvider>
);
