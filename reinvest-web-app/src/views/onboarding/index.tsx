import { BlackModal } from 'components/BlackModal';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useOnboardingFormFlow } from './form-flow';

export const OnboardingFlow = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
    progressPercentage,
  } = useOnboardingFormFlow();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const onModalClickBack = () => {
    if (isFirstStep) {
      router.push(URL.index);
    } else {
      moveToPreviousValidStep();
    }
  };

  return (
    <BlackModal
      isOpen={isModalOpen}
      onOpenChange={onModalClickBack}
      progressBarValue={progressPercentage}
    >
      <CurrentStepView />
    </BlackModal>
  );
};
