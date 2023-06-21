import { ModalWhite } from 'components/ModalWhite';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';
import { useFlowsManager } from 'views/account-management/contexts/FlowsManager';

import { FlowStepIdentifiers } from './interfaces';
import { STEPS } from './steps';

const [useFlow, FlowProvider] = createFormFlow({ steps: STEPS });

function InnerFlow() {
  const { modalTitle, isModalOpen, onModalOpenChange } = useFlowsManager();
  const { CurrentStepView, meta } = useFlow();

  const isCurrentBankAccountStep = meta.currentStepIdentifier === FlowStepIdentifiers.CURRENT_BANK_ACCOUNT;
  const isConfirmationStep = meta.currentStepIdentifier === FlowStepIdentifiers.CONFIRMATION;
  const isBankAccountSelectionStep = meta.currentStepIdentifier === FlowStepIdentifiers.BANK_ACCOUNT_SELECTION;

  return (
    <ModalWhite
      hideTitle={!isCurrentBankAccountStep}
      title={modalTitle}
      isOpen={isModalOpen}
      className={isBankAccountSelectionStep ? '!gap-14' : ''}
      onOpenChange={onModalOpenChange}
      addPaddingBottom
      hideAvatarNextToTitle={isConfirmationStep || isBankAccountSelectionStep}
      hideHeaderOnMobile={isBankAccountSelectionStep}
      hideLogoOnMobile={isBankAccountSelectionStep}
      hideSeparator={isBankAccountSelectionStep}
    >
      <CurrentStepView />
    </ModalWhite>
  );
}

export const Flow = () => (
  <FlowProvider initialStoreFields={{}}>
    <InnerFlow />
  </FlowProvider>
);
