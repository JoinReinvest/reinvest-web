import { ModalBlackFullscreen } from 'components/ModalBlackFullscreen';
import { useIsMounted } from 'hooks/is-mounted';
import { LoginLayout } from 'layouts/LoginLayout';

import { useLoginFormFlow } from './form-flow';

export const LoginView = () => {
  const isMounted = useIsMounted();

  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useLoginFormFlow();

  const shouldDisplayFirstStep = isMounted() && isFirstStep;
  const shouldDisplayRestOfSteps = isMounted() && !isFirstStep;

  return (
    <>
      {shouldDisplayFirstStep && (
        <LoginLayout>
          <CurrentStepView />
        </LoginLayout>
      )}

      {shouldDisplayRestOfSteps && (
        <ModalBlackFullscreen
          isOpen={!isFirstStep}
          onOpenChange={moveToPreviousValidStep}
        >
          <CurrentStepView />
        </ModalBlackFullscreen>
      )}
    </>
  );
};
