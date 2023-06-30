import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { ModalWhite } from 'components/ModalWhite';
import { ModalWhiteFullscreen } from 'components/ModalWhiteFullscreen';
import { ModalWhiteWatermark } from 'components/ModalWhiteWatermark';
import { ModalWhiteWatermarkSide } from 'components/ModalWhiteWatermarkSide';
import { useActiveAccount } from 'providers/ActiveAccountProvider';
import { useRecurringInvestment } from 'providers/RecurringInvestmentProvider';
import { useCallback, useEffect, useMemo } from 'react';
import { ModalProps } from 'types/modal';

import { FLOW_STEPS_WITH_BLACK_MODAL, FLOW_STEPS_WITH_X_BUTTON } from './constants';
import { InvestmentFlowProvider, useInvestmentFlow } from './form-flow';
import { Identifiers } from './form-flow/identifiers';
import { useInitializeFields } from './hooks/initialize-fields';
import { ModalHandlerProvider } from './providers/modal-handler';
import { OneTimeInvestmentProvider } from './providers/OneTimeInvestment';

interface Props extends ModalProps {
  forInitialInvestment?: boolean;
  withSideModal?: boolean;
}

const MODAL_TITLE = 'Investing';

const InnerInvestmentView = ({ isModalOpen, onModalOpenChange, forInitialInvestment, withSideModal = false }: Props) => {
  const { activeAccount, deprecateLatestAccountOnboarded, setArrivesFromOnboarding, availableAccounts } = useActiveAccount();
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
    await resetStoreFields();

    onModalOpenChange(false);
    moveToFirstStep();
    deprecateLatestAccountOnboarded();
    setArrivesFromOnboarding(false);

    await updateStoreFields({ _hasMoreThanAnAccount: availableAccounts.length > 1 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [availableAccounts, onModalOpenChange, moveToFirstStep, resetStoreFields]);

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
      (storeFields?._willSetUpOneTimeInvestments === false && storeFields?._willSetUpRecurringInvestment === false) ||
      (storeFields?._willSetUpOneTimeInvestments === false && !storeFields?._shouldDisplayRecurringInvestment)
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
            title={MODAL_TITLE}
            isModalOpen={isModalOpen}
            onModalOpenChange={onModalLastStep}
            hideSeparator
          >
            <CurrentStepView />
          </ModalWhiteWatermarkSide>
        </ModalHandlerProvider>
      );
    } else {
      return (
        <ModalHandlerProvider onModalLastStep={onModalLastStep}>
          <ModalWhiteWatermark
            isModalOpen={isModalOpen}
            onModalOpenChange={onModalLastStep}
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
        className={currentStepIdentifier === Identifiers.BANK_ACCOUNT_SELECTION ? '!gap-14' : ''}
        title={MODAL_TITLE}
        addPaddingBottom
        hideAvatarNextToTitle={currentStepIdentifier === Identifiers.BANK_ACCOUNT_SELECTION}
        hideHeaderOnMobile={currentStepIdentifier === Identifiers.BANK_ACCOUNT_SELECTION}
        hideSeparator={currentStepIdentifier === Identifiers.BANK_ACCOUNT_SELECTION}
        hideLogoOnMobile={currentStepIdentifier === Identifiers.BANK_ACCOUNT_SELECTION}
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

export const InvestmentView = (props: Props) => {
  const { toggleEnableDraftQuery } = useRecurringInvestment();

  useEffect(() => {
    if (props.isModalOpen) {
      toggleEnableDraftQuery(true);
    }
  }, [props.isModalOpen, toggleEnableDraftQuery]);

  return (
    <OneTimeInvestmentProvider>
      <InvestmentFlowProvider initialStoreFields={{ _forInitialInvestment: !!props.forInitialInvestment }}>
        <InnerInvestmentView {...props} />
      </InvestmentFlowProvider>
    </OneTimeInvestmentProvider>
  );
};
