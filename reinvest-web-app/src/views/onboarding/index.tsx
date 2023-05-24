import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { ActiveAccountProvider } from 'providers/ActiveAccountProvider';
import { useEffect, useState } from 'react';

import { useOnboardingFormFlow } from './form-flow';
import { Identifiers } from './form-flow/identifiers';
import { useInitializeFieldsFromApi } from './hooks/initialize-fields-from-api';

export const OnboardingFlow = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    CurrentStepView,
    meta: { isFirstStep, currentStepIdentifier },
    moveToPreviousValidStep,
    progressPercentage,
    updateStoreFields,
    getStoreFields,
  } = useOnboardingFormFlow();

  useInitializeFieldsFromApi({ updateStoreFields });

  const shouldDisplayXButton = currentStepIdentifier === Identifiers.ACCOUNT_COMPLETION;

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const goToDashboard = () => {
    router.push(URL.index);
  };

  const onModalClickBack = () => {
    if (isFirstStep) {
      const getStoreFieldsResult = getStoreFields();

      router.push(getStoreFieldsResult?.isCompletedProfile ? URL.index : URL.logout);
    } else {
      moveToPreviousValidStep();
    }
  };

  return (
    <ActiveAccountProvider>
      <ModalBlackFullscreen
        isOpen={isModalOpen}
        onOpenChange={!shouldDisplayXButton ? onModalClickBack : goToDashboard}
        progressBarValue={progressPercentage}
        isBackButtonEnabled={!shouldDisplayXButton}
      >
        <CurrentStepView />
      </ModalBlackFullscreen>
    </ActiveAccountProvider>
  );
};
