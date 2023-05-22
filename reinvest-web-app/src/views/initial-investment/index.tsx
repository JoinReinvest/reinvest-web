import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { ModalWhiteFullscreen } from 'components/ModalWhiteFullscreen';
import { ModalWhiteWatermark } from 'components/ModalWhiteWatermark';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { RecurringInvestmentProvider } from 'providers/RecurringInvestmentProvider';

import { useInitialInvestmentFlow } from './form-flow';
import { Identifiers } from './form-flow/identifiers';
import { useInitializeFields } from './hooks/initialize-fields';
import { ModalHandlerProvider } from './providers/modal-handler';

interface Props {
  isOpen: boolean;
  toggleIsOpen: (state: boolean) => void;
}

const InnerInitialInvestmentView = ({ isOpen, toggleIsOpen }: Props) => {
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
      <ModalBlackFullscreen isOpen={isOpen}>
        <CurrentStepView />
      </ModalBlackFullscreen>
    );
  }

  if (currentStepIdentifier === Identifiers.INVESTMENT_COMPLETED) {
    return (
      <ModalHandlerProvider onModalLastStep={onModalLastStep}>
        <ModalWhiteWatermark
          isOpen={isOpen}
          onOpenChange={onModalLastStep}
        >
          <CurrentStepView />
        </ModalWhiteWatermark>
      </ModalHandlerProvider>
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

export const InitialInvestmentView = (props: Props) => (
  <RecurringInvestmentProvider>
    <InnerInitialInvestmentView {...props} />
  </RecurringInvestmentProvider>
);
