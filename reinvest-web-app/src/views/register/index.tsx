import { BlackModal } from 'components/BlackModal';
import { useIsMounted } from 'hooks/is-mounted';
import { LoginLayout } from 'layouts/LoginLayout';

import { useRegisterFormFlow } from './form-flow';

export const RegistrationView = () => {
  const isMounted = useIsMounted();

  const {
    CurrentStepView,
    meta: { isFirstStep },
    moveToPreviousValidStep,
  } = useRegisterFormFlow();

  const shouldDisplayFirstStep = isMounted() && isFirstStep;
  const shouldDisplayRestOfSteps = isMounted() && !isFirstStep;

  return (
    <>
      {shouldDisplayFirstStep && (
        <LoginLayout className="lg:!gap-128">
          <CurrentStepView />
        </LoginLayout>
      )}

      {shouldDisplayRestOfSteps && (
        <BlackModal
          isOpen={!isFirstStep}
          onOpenChange={moveToPreviousValidStep}
        >
          <CurrentStepView />
        </BlackModal>
      )}
    </>
  );
};
