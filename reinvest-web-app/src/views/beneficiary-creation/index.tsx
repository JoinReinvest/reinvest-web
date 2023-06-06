import { ModalConfirmation } from 'components/ModalConfirmation';
import { ModalWhite } from 'components/ModalWhite';
import { useToggler } from 'hooks/toggler';
import { ModalProps } from 'types/modal';
import { InvestmentView } from 'views/investment';

import { BeneficiaryCreationFlowProvider, useBeneficiaryCreationFlow } from './flow';
import { ModalHandlerProvider, useModalHandler } from './providers/modal-handler';

const MODAL_CONFIRMATION_TITLE = 'Are you sure you want to return to dashboard?';
const MODAL_CONFIRMATION_DESCRIPTION = 'Any updates made will be lost.';
const MODAL_CLASSNAME = 'modal-create-beneficiary';

export function InnerViewBeneficiaryCreation() {
  const { CurrentStepView, getStoreFields, moveToFirstStep, resetStoreFields, meta } = useBeneficiaryCreationFlow();
  const [isConfirmationModalOpen, toggleIsConfirmationModalOpen] = useToggler(false);
  const {
    isBeneficiaryFlowOpen,
    toggleIsBeneficiaryFlowOpen,
    isInvestmentFlowOpen,
    toggleIsInvestmentFlowOpen,
    hasFinishedBeneficiaryCreationFlow,
    toggleHasFinishedBeneficiaryCreationFlow,
  } = useModalHandler();

  const handleOpenChange = async (state: boolean) => {
    const storeFields = getStoreFields();
    const hasFilledAnyFields = Object.values(storeFields || {}).some(value => value !== '');

    if (!state && hasFilledAnyFields && !meta.isLastStep) {
      toggleIsConfirmationModalOpen(true);

      return;
    }

    if (!state) {
      await resetStoreFields();
      moveToFirstStep();
      toggleHasFinishedBeneficiaryCreationFlow(false);
    }

    toggleIsBeneficiaryFlowOpen(state);
  };

  const onConfirmationAction = async () => {
    toggleIsConfirmationModalOpen(false);
    toggleIsBeneficiaryFlowOpen(false);
    await resetStoreFields();
    moveToFirstStep();
  };

  return (
    <>
      <ModalWhite
        isOpen={isBeneficiaryFlowOpen}
        onOpenChange={handleOpenChange}
        title="Add Beneficiary"
        className={MODAL_CLASSNAME}
      >
        <CurrentStepView />
      </ModalWhite>

      {hasFinishedBeneficiaryCreationFlow && (
        <InvestmentView
          isModalOpen={isInvestmentFlowOpen}
          onModalOpenChange={toggleIsInvestmentFlowOpen}
          withSideModal
        />
      )}

      <ModalConfirmation
        isOpen={isConfirmationModalOpen}
        onOpenChange={toggleIsConfirmationModalOpen}
        title={MODAL_CONFIRMATION_TITLE}
        description={MODAL_CONFIRMATION_DESCRIPTION}
        onAction={onConfirmationAction}
      />
    </>
  );
}

export const ViewBeneficiaryCreation = (props: ModalProps) => (
  <ModalHandlerProvider {...props}>
    <BeneficiaryCreationFlowProvider initialStoreFields={{}}>
      <InnerViewBeneficiaryCreation />
    </BeneficiaryCreationFlowProvider>
  </ModalHandlerProvider>
);
