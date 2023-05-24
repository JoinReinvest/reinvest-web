import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { ModalWhiteFullscreen } from 'components/ModalWhiteFullscreen';
import { ModalWhiteWatermark } from 'components/ModalWhiteWatermark';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { InvestmentProvider } from 'providers/InvestmentProvider';
import { RecurringInvestmentProvider } from 'providers/RecurringInvestmentProvider';
import { useMemo } from 'react';
import { ModalProps } from 'types/modal';

import { FLOW_STEPS_WITH_BLACK_MODAL, FLOW_STEPS_WITH_X_BUTTON } from './constants';
import { useInitialInvestmentFlow } from './form-flow';
import { Identifiers } from './form-flow/identifiers';
import { useInitializeFields } from './hooks/initialize-fields';
import { ModalHandlerProvider } from './providers/modal-handler';

interface Props extends ModalProps {
  forInitialInvestment?: boolean;
}

const InnerInitialInvestmentView = ({ isModalOpen, onModalOpenChange, forInitialInvestment }: Props) => {
  const { activeAccount } = useActiveAccount();
  useInitializeFields({ forInitialInvestment });

  const {
    CurrentStepView,
    moveToPreviousValidStep,
    resetStoreFields,
    moveToFirstStep,
    meta: { currentStepIdentifier, isFirstStep },
  } = useInitialInvestmentFlow();

  const shouldDisplayBlackModal = useMemo(() => currentStepIdentifier && FLOW_STEPS_WITH_BLACK_MODAL.includes(currentStepIdentifier), [currentStepIdentifier]);
  const shouldDisplayBackIcon = useMemo(() => currentStepIdentifier && FLOW_STEPS_WITH_X_BUTTON.includes(currentStepIdentifier), [currentStepIdentifier]);

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
      onOpenChange={!shouldDisplayBackIcon ? onModalClickBack : onModalLastStep}
      activeAccount={activeAccount}
      isBackButtonEnabled={!shouldDisplayBackIcon}
    >
      <CurrentStepView />
    </ModalWhiteFullscreen>
  );
};

export const InitialInvestmentView = (props: Props) => (
  <InvestmentProvider>
    <RecurringInvestmentProvider>
      <InnerInitialInvestmentView {...props} />
    </RecurringInvestmentProvider>
  </InvestmentProvider>
);
