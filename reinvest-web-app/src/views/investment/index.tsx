import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { ModalWhiteFullscreen } from 'components/ModalWhiteFullscreen';
import { ModalWhiteWatermark } from 'components/ModalWhiteWatermark';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { InvestmentProvider } from 'providers/InvestmentProvider';
import { RecurringInvestmentProvider } from 'providers/RecurringInvestmentProvider';
import { useMemo } from 'react';
import { ModalProps } from 'types/modal';

import { FLOW_STEPS_WITH_BLACK_MODAL, INITIAL_STORE_FIELDS } from './constants';
import { InvestmentFlowProvider, useInvestmentFlow } from './form-flow';
import { Identifiers } from './form-flow/identifiers';
import { useInitializeFields } from './hooks/initialize-fields';
import { ModalHandlerProvider } from './providers/modal-handler';

interface Props extends ModalProps {
  forInitialInvestment?: boolean;
}

const InnerInvestmentView = ({ isModalOpen, onModalOpenChange, forInitialInvestment }: Props) => {
  const { activeAccount } = useActiveAccount();
  useInitializeFields({ forInitialInvestment });

  const {
    CurrentStepView,
    moveToPreviousValidStep,
    resetStoreFields,
    moveToFirstStep,
    meta: { currentStepIdentifier, isFirstStep },
  } = useInvestmentFlow();

  const shouldDisplayBlackModal = useMemo(() => currentStepIdentifier && FLOW_STEPS_WITH_BLACK_MODAL.includes(currentStepIdentifier), [currentStepIdentifier]);

  const onModalLastStep = () => {
    onModalOpenChange(false);
    moveToFirstStep();
    resetStoreFields();
  };

  const onModalClickBack = () => {
    if (isFirstStep) {
      onModalOpenChange(false);
    } else {
      moveToPreviousValidStep();
    }
  };

  if (shouldDisplayBlackModal) {
    return (
      <ModalBlackFullscreen
        isOpen={isModalOpen}
        onOpenChange={onModalClickBack}
      >
        <CurrentStepView />
      </ModalBlackFullscreen>
    );
  }

  if (currentStepIdentifier === Identifiers.INVESTMENT_COMPLETED) {
    return (
      <ModalHandlerProvider onModalLastStep={onModalLastStep}>
        <ModalWhiteWatermark
          isOpen={isModalOpen}
          onOpenChange={onModalLastStep}
        >
          <CurrentStepView />
        </ModalWhiteWatermark>
      </ModalHandlerProvider>
    );
  }

  return (
    <ModalWhiteFullscreen
      isOpen={isModalOpen}
      onOpenChange={onModalClickBack}
      activeAccount={activeAccount}
    >
      <CurrentStepView />
    </ModalWhiteFullscreen>
  );
};

export const InvestmentView = (props: Props) => (
  <InvestmentProvider>
    <RecurringInvestmentProvider>
      <InvestmentFlowProvider initialStoreFields={INITIAL_STORE_FIELDS}>
        <InnerInvestmentView {...props} />
      </InvestmentFlowProvider>
    </RecurringInvestmentProvider>
  </InvestmentProvider>
);
