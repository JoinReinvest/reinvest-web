import { BlackModal } from 'components/BlackModal';
import { URL } from 'constants/urls';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormFlowContext } from 'services/form-flow';

export const OnboardingFlow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useFormFlowContext();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const onModalClickBack = () => {
    if (isFirstStep) {
      redirect(URL.login);
    } else {
      moveToPreviousValidStep();
    }
  };

  return (
    <BlackModal
      isOpen={isModalOpen}
      onOpenChange={onModalClickBack}
    >
      <CurrentStepView />
    </BlackModal>
  );
};
