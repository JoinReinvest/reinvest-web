import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { ModalWhite } from 'components/ModalWhite';
import { ModalWhiteFullscreen } from 'components/ModalWhiteFullscreen';
import { ModalWhiteWatermark } from 'components/ModalWhiteWatermark';
import { ModalWhiteWatermarkSide } from 'components/ModalWhiteWatermarkSide';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { InvestmentProvider } from 'providers/InvestmentProvider';
import { RecurringInvestmentProvider } from 'providers/RecurringInvestmentProvider';
import { useCallback, useEffect, useMemo } from 'react';
import { ModalProps } from 'types/modal';

import { FLOW_STEPS_WITH_BLACK_MODAL, FLOW_STEPS_WITH_X_BUTTON, INITIAL_STORE_FIELDS } from './constants';
import { InvestmentFlowProvider, useInvestmentFlow } from './form-flow';
import { Identifiers } from './form-flow/identifiers';
import { useInitializeFields } from './hooks/initialize-fields';
import { ModalHandlerProvider } from './providers/modal-handler';

interface Props extends ModalProps {
  forInitialInvestment?: boolean;
  setHadArrivedFromOnboarding?: (value: boolean) => void;
  withSideModal?: boolean;
}

const InnerInvestmentView = ({ isModalOpen, onModalOpenChange, forInitialInvestment, setHadArrivedFromOnboarding, withSideModal = false }: Props) => {
  const { activeAccount } = useActiveAccount();
  useInitializeFields({ forInitialInvestment });

  const {
    CurrentStepView,
    moveToPreviousValidStep,
    resetStoreFields,
    moveToFirstStep,
    getStoreFields,
    meta: { currentStepIdentifier, isFirstStep },
  } = useInvestmentFlow();

  const shouldDisplayBlackModal = useMemo(() => currentStepIdentifier && FLOW_STEPS_WITH_BLACK_MODAL.includes(currentStepIdentifier), [currentStepIdentifier]);
  const shouldDisplayBackIcon = useMemo(() => currentStepIdentifier && FLOW_STEPS_WITH_X_BUTTON.includes(currentStepIdentifier), [currentStepIdentifier]);

  const onModalLastStep = useCallback(() => {
    onModalOpenChange(false);
    moveToFirstStep();
    resetStoreFields();
    setHadArrivedFromOnboarding && setHadArrivedFromOnboarding(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onModalOpenChange, moveToFirstStep, resetStoreFields]);

  const onModalClickBack = () => {
    if (isFirstStep || Identifiers.ACCOUNT_SELECTION) {
      onModalOpenChange(false);
    } else {
      moveToPreviousValidStep();
    }
  };

  useEffect(() => {
    const storeFields = getStoreFields();

    if (
      !storeFields?._willSetUpOneTimeInvestments &&
      !storeFields?._willSetUpRecurringInvestment &&
      storeFields?._willSetUpOneTimeInvestments !== undefined &&
      storeFields?._willSetUpRecurringInvestment !== undefined
    ) {
      onModalLastStep();
    }
  }, [getStoreFields, onModalLastStep]);

  if (shouldDisplayBlackModal) {
    return (
      <ModalHandlerProvider onModalLastStep={onModalLastStep}>
        <ModalBlackFullscreen
          isOpen={isModalOpen}
          onOpenChange={onModalClickBack}
        >
          <CurrentStepView />
        </ModalBlackFullscreen>
      </ModalHandlerProvider>
    );
  }

  if (currentStepIdentifier === Identifiers.INVESTMENT_COMPLETED) {
    if (withSideModal) {
      return (
        <ModalHandlerProvider onModalLastStep={onModalLastStep}>
          <ModalWhiteWatermarkSide
            title="Investing"
            isOpen={isModalOpen}
            onOpenChange={onModalLastStep}
          >
            <CurrentStepView />
          </ModalWhiteWatermarkSide>
        </ModalHandlerProvider>
      );
    } else {
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
  }

  if (withSideModal) {
    return (
      <ModalWhite
        isOpen={isModalOpen}
        onOpenChange={!shouldDisplayBackIcon ? onModalClickBack : onModalLastStep}
        activeAccount={activeAccount}
        title="Investing"
      >
        <CurrentStepView />
      </ModalWhite>
    );
  } else {
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
  }
};

export const InvestmentView = (props: Props) => (
  <InvestmentProvider>
    <RecurringInvestmentProvider>
      <InvestmentFlowProvider initialStoreFields={{ ...INITIAL_STORE_FIELDS, _forInitialInvestment: !!props.forInitialInvestment }}>
        <InnerInvestmentView {...props} />
      </InvestmentFlowProvider>
    </RecurringInvestmentProvider>
  </InvestmentProvider>
);
