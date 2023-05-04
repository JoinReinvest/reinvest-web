import { BlackModal } from 'components/BlackModal';
import { ModalWhiteFullscreen } from 'components/ModalWhiteFullscreen';
import { ModalWhiteWatermark } from 'components/ModalWhiteWatermark';
import { useActiveAccount } from 'providers/ActiveAccountProvider';

import { useInitialInvestmentFlow } from './form-flow';
import { Identifiers } from './form-flow/identifiers';
import { useInitializeFields } from './hooks/initialize-fields';

interface Props {
  isOpen: boolean;
  toggleIsOpen: (state: boolean) => void;
}

export const InitialInvestmentView = ({ isOpen, toggleIsOpen }: Props) => {
  const { activeAccount } = useActiveAccount();
  useInitializeFields();

  const {
    CurrentStepView,
    moveToPreviousValidStep,
    resetStoreFields,
    moveToFirstStep,
    meta: { currentStepIdentifier, isFirstStep },
  } = useInitialInvestmentFlow();

  const onModalLastStep = () => {
    toggleIsOpen(false);
    moveToFirstStep();
    resetStoreFields();
  };

  const onModalClickBack = () => {
    if (isFirstStep) {
      toggleIsOpen(false);
    } else {
      moveToPreviousValidStep();
    }
  };

  if (currentStepIdentifier === Identifiers.INVESTMENT_VERIFICATION) {
    return (
      <BlackModal isOpen={isOpen}>
        <CurrentStepView />
      </BlackModal>
    );
  }

  if (currentStepIdentifier === Identifiers.INVESTMENT_COMPLETED) {
    return (
      <ModalWhiteWatermark
        isOpen={isOpen}
        onOpenChange={onModalLastStep}
      >
        <CurrentStepView />
      </ModalWhiteWatermark>
    );
  }

  return (
    <ModalWhiteFullscreen
      isOpen={isOpen}
      onOpenChange={onModalClickBack}
      activeAccount={activeAccount}
    >
      <CurrentStepView />
    </ModalWhiteFullscreen>
  );
};
