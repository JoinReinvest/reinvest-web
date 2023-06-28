import { ModalWhite } from 'components/ModalWhite';
import { useAccountManagement } from 'providers/AccountManagement';
import { createFormFlow } from 'reinvest-app-common/src/services/form-flow';

import { FlowStepIdentifiers } from './interfaces';
import { STEPS } from './steps';

const [useFlow, FlowProvider] = createFormFlow({ steps: STEPS });

export { useFlow };

function InnerFlow() {
  const { modalTitle, isModalOpen, onModalOpenChange } = useAccountManagement();
  const { CurrentStepView, meta } = useFlow();

  const isCurrentBankAccountStep = meta.currentStepIdentifier === FlowStepIdentifiers.CURRENT_BANK_ACCOUNT;
  const isConfirmationStep = meta.currentStepIdentifier === FlowStepIdentifiers.CONFIRMATION;
  const isBankAccountSelectionStep = meta.currentStepIdentifier === FlowStepIdentifiers.BANK_ACCOUNT_SELECTION;
  const isDisclaimerStep = meta.currentStepIdentifier === FlowStepIdentifiers.DISCLAIMER;

  return (
    <ModalWhite
      hideTitle={!isCurrentBankAccountStep}
      title={modalTitle}
      isOpen={isModalOpen}
      className={isBankAccountSelectionStep ? '!gap-14' : ''}
      onOpenChange={onModalOpenChange}
      addPaddingBottom
      hideAvatarNextToTitle={isConfirmationStep || isBankAccountSelectionStep || isDisclaimerStep}
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
