import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { ModalWhiteSideResponsive } from 'components/ModalWhiteSideResponsive';
import { ModalWhiteWatermark } from 'components/ModalWhiteWatermark';
import { RecurringInvestmentProvider } from 'providers/RecurringInvestmentProvider';
import { AccountOverview } from 'reinvest-app-common/src/types/graphql';

import { useInvestmentFlow } from './form-flow';
import { Identifiers } from './form-flow/identifiers';
import { useInitializeFields } from './hooks/initialize-fields';
import { ModalHandlerProvider } from './providers/modal-handler';

interface Props {
  activeAccount: AccountOverview | null;
  isOpen: boolean;
  toggleIsOpen: (state: boolean) => void;
}

function InnerInvestmentView({ isOpen, toggleIsOpen, activeAccount }: Props) {
  useInitializeFields();

  const {
    CurrentStepView,
    moveToPreviousValidStep,
    resetStoreFields,
    moveToFirstStep,
    meta: { currentStepIdentifier, isFirstStep },
  } = useInvestmentFlow();

  const onModalLastStep = async () => {
    toggleIsOpen(false);
    moveToFirstStep();
    await resetStoreFields();
  };

  const onModalClickBack = async () => {
    if (isFirstStep) {
      toggleIsOpen(false);

      await resetStoreFields();
      moveToFirstStep();
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
    <ModalWhiteSideResponsive
      title="Invest"
      isOpen={isOpen}
      onOpenChange={onModalClickBack}
      activeAccount={activeAccount}
    >
      <CurrentStepView />
    </ModalWhiteSideResponsive>
  );
}

export const InvestmentView = (props: Props) => (
  <RecurringInvestmentProvider>
    <InnerInvestmentView {...props} />
  </RecurringInvestmentProvider>
);
