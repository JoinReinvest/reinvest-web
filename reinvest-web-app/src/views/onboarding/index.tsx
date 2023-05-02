import { BlackModal } from 'components/BlackModal';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { ActiveAccountProvider } from 'providers/ActiveAccountProvider';
import { useEffect, useState } from 'react';

import { useOnboardingFormFlow } from './form-flow';
import { useInitializeFieldsFromApi } from './hooks/initialize-fields-from-api';

export const OnboardingFlow = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
    progressPercentage,
    updateStoreFields,
    getStoreFields,
  } = useOnboardingFormFlow();

  useInitializeFieldsFromApi({ updateStoreFields });

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

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
      <BlackModal
        isOpen={isModalOpen}
        onOpenChange={onModalClickBack}
        progressBarValue={progressPercentage}
      >
        <CurrentStepView />
      </BlackModal>
    </ActiveAccountProvider>
  );
};
