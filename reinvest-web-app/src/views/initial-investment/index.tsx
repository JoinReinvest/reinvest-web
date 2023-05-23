import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { ModalWhiteFullscreen } from 'components/ModalWhiteFullscreen';
import { ModalWhiteWatermark } from 'components/ModalWhiteWatermark';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { RecurringInvestmentProvider } from 'providers/RecurringInvestmentProvider';
import { useMemo } from 'react';
import { ModalProps } from 'types/modal';

import { FLOW_STEPS_WITH_BLACK_MODAL } from './constants';
import { useInitialInvestmentFlow } from './form-flow';
import { Identifiers } from './form-flow/identifiers';
import { useInitializeFields } from './hooks/initialize-fields';
import { ModalHandlerProvider } from './providers/modal-handler';

interface Props extends ModalProps {
  forInitialInvestment?: boolean;
}

const InnerInitialInvestmentView = ({ isModalOpen, onModalOpenChange }: Props) => {
  const { activeAccount } = useActiveAccount();
  useInitializeFields();

  const {
    CurrentStepView,
    moveToPreviousValidStep,
    resetStoreFields,
    moveToFirstStep,
    meta: { currentStepIdentifier, isFirstStep },
  } = useInitialInvestmentFlow();

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

export const InitialInvestmentView = (props: Props) => (
  <RecurringInvestmentProvider>
    <InnerInitialInvestmentView {...props} />
  </RecurringInvestmentProvider>
);
