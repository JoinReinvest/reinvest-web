import { BlackModal } from 'components/BlackModal';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useFormFlowContext } from 'services/form-flow';

export const ForgotPasswordFlow = () => {
  const router = useRouter();
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
      router.push(URL.login);
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
