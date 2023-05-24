import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { URL } from 'constants/urls';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useForgotPasswordFormFlow } from './form-flow';

export const ForgotPasswordFlow = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useForgotPasswordFormFlow();

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
    <ModalBlackFullscreen
      isOpen={isModalOpen}
      onOpenChange={onModalClickBack}
    >
      <CurrentStepView />
    </ModalBlackFullscreen>
  );
};
