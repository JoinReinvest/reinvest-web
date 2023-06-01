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
  const { activeAccount, deprecateLatestAccountOnboarded } = useActiveAccount();
  useInitializeFields({ forInitialInvestment });

  const {
    CurrentStepView,
    moveToPreviousValidStep,
    resetStoreFields,
    moveToFirstStep,
    getStoreFields,
    updateStoreFields,
    meta: { currentStepIdentifier, isFirstStep },
  } = useInvestmentFlow();

  const shouldDisplayBlackModal = useMemo(() => currentStepIdentifier && FLOW_STEPS_WITH_BLACK_MODAL.includes(currentStepIdentifier), [currentStepIdentifier]);
  const shouldDisplayBackIcon = useMemo(() => currentStepIdentifier && FLOW_STEPS_WITH_X_BUTTON.includes(currentStepIdentifier), [currentStepIdentifier]);

  const onModalLastStep = useCallback(async () => {
    const storeFields = getStoreFields();
    await resetStoreFields();
    await updateStoreFields({ _forInitialInvestment: true, _hasMoreThanAnAccount: storeFields?._hasMoreThanAnAccount });
    onModalOpenChange(false);
    moveToFirstStep();
    setHadArrivedFromOnboarding && setHadArrivedFromOnboarding(false);
    deprecateLatestAccountOnboarded();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onModalOpenChange, moveToFirstStep, resetStoreFields]);

  const onModalClickBack = () => {
    if (isFirstStep || currentStepIdentifier === Identifiers.ACCOUNT_SELECTION) {
      onModalLastStep();
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
        displayReinvestLogo={!(currentStepIdentifier === Identifiers.BANK_ACCOUNT_SELECTION)}
        className={currentStepIdentifier === Identifiers.BANK_ACCOUNT_SELECTION ? 'gap-14' : ''}
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
    <RecurringInvestmentProvider enableQueries={!!props.isModalOpen}>
      <InvestmentFlowProvider initialStoreFields={{ ...INITIAL_STORE_FIELDS, _forInitialInvestment: !!props.forInitialInvestment }}>
        <InnerInvestmentView {...props} />
      </InvestmentFlowProvider>
    </RecurringInvestmentProvider>
  </InvestmentProvider>
);
